import { SIMPLE_COMBOS } from "../data/simple-combos";
import type { PersonalityMode, SimpleCombo, SuggestRequest, SuggestResponse } from "./types";
import { hasAll, INGREDIENT_GROUPS, isDirectlyEdibleSingle, pickFromGroup } from "./ingredient-utils";
import { fallbackSuggestion } from "./fallback-rules";

function scoreCombo(combo: SimpleCombo, req: SuggestRequest): number {
  let score = 0;

  // Hard constraints first
  if (req.cookingWillingness === "no" && !combo.noCook) return -Infinity;
  if (req.timeMinutes === 5 && combo.maxTimeMinutes > 5) return -Infinity;

  // Prioritize no-cook when needed
  if (req.cookingWillingness === "no") score += combo.noCook ? 50 : 0;
  if (req.cookingWillingness === "minimal") score += combo.noCook ? 25 : 0;

  // Prioritize low effort when tired
  if (req.energyLevel === "low") score += combo.effort === "low" ? 30 : 0;
  if (req.energyLevel === "medium") score += combo.effort === "low" ? 10 : 0;

  // Prefer faster combos for short time
  if (req.timeMinutes === 5) score += combo.maxTimeMinutes === 5 ? 20 : 0;
  if (req.timeMinutes === 10) score += combo.maxTimeMinutes <= 10 ? 8 : 0;
  if (req.timeMinutes === 20) score += 2;

  // If cooking is allowed, still slightly favor no-cook
  if (req.cookingWillingness === "yes") score += combo.noCook ? 6 : 0;

  // Tie-breaker: fewer required ingredients = simpler
  score += Math.max(0, 6 - combo.requiredIngredients.length);

  return score;
}

function joinNice(items: string[]): string {
  if (items.length <= 1) return items[0] ?? "";
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}

function decideReason(req: SuggestRequest, kind: "no_cook" | "cooked" | "generic") {
  if (kind === "no_cook" || req.cookingWillingness === "no") return "no_cook_combo" as const;
  if (kind === "cooked") return "cooking_allowed_simple" as const;
  if (req.energyLevel === "low" || req.timeMinutes === 5) return "low_energy_fast" as const;
  return "cooking_allowed_simple" as const;
}

function comboTypeForSimpleCombo(combo: SimpleCombo): SuggestResponse["comboType"] {
  if (combo.requiredIngredients.includes("yogurt")) return "yogurt_fruit";
  if (combo.requiredIngredients.includes("bread")) return "bread_combo";
  if (!combo.noCook) return "cooked_simple";
  if (
    combo.requiredIngredients.some((i) => i === "apple" || i === "banana" || i === "orange")
  ) {
    return "fruit_combo";
  }
  return "bread_combo";
}

type Candidate = {
  out: SuggestResponse;
  baseScore: number;
  personalityWeight: number;
  finalScore: number;
  // Internal only: helps deterministic ties.
  stableKey: string;
};

function personalityWeightFor(
  mode: PersonalityMode,
  comboType: SuggestResponse["comboType"],
  stableKey: string
): number {
  // Combo-type weights (kept simple, deterministic).
  const byMode: Record<PersonalityMode, Record<SuggestResponse["comboType"], number>> = {
    fast: {
      fruit_combo: 30,
      yogurt_fruit: 28,
      single_fallback: 18,
      bread_combo: 10,
      cooked_simple: 2,
      salad: 0,
      no_valid_option: -100
    },
    healthy: {
      salad: 30,
      yogurt_fruit: 24,
      fruit_combo: 20,
      cooked_simple: 10,
      bread_combo: 0,
      single_fallback: -10,
      no_valid_option: -100
    },
    comfort: {
      bread_combo: 30,
      cooked_simple: 22,
      yogurt_fruit: 8,
      fruit_combo: 6,
      salad: 0,
      single_fallback: 12,
      no_valid_option: -100
    }
  };

  let w = byMode[mode][comboType];

  // Extra nuance only for single-item fallbacks:
  // comfort prefers bread/cheese over fruit/yogurt when both exist.
  if (comboType === "single_fallback") {
    if (mode === "comfort") {
      // Comfort should be able to pick "bread" over yogurt+fruit when both are valid,
      // but still prefer real bread-based combos (e.g. bread+cheese) over bread alone.
      if (stableKey.includes("single:bread")) w += 48;
      if (stableKey.includes("single:cheese")) w += 14;
      if (stableKey.includes("single:yogurt")) w -= 6;
      if (stableKey.includes("single:banana")) w -= 4;
    }
    if (mode === "healthy") {
      if (stableKey.includes("single:fruit:")) w += 6;
      if (stableKey.includes("single:yogurt")) w += 4;
      if (stableKey.includes("single:bread")) w -= 8;
      if (stableKey.includes("single:cheese")) w -= 6;
    }
  }

  return w;
}

function pickBestCandidate(candidates: Candidate[]): Candidate {
  let best: Candidate | null = null;
  for (const c of candidates) {
    if (!best) {
      best = c;
      continue;
    }

    if (c.finalScore !== best.finalScore) {
      if (c.finalScore > best.finalScore) best = c;
      continue;
    }

    // Prefer non-fallback if scores tie.
    if (c.out.usedFallback !== best.out.usedFallback) {
      if (c.out.usedFallback === false) best = c;
      continue;
    }

    if (c.baseScore !== best.baseScore) {
      if (c.baseScore > best.baseScore) best = c;
      continue;
    }

    // Stable tie-breaker (alphabetical key).
    if (c.stableKey < best.stableKey) best = c;
  }

  return best ?? candidates[0];
}

function baseScoreForComboType(comboType: SuggestResponse["comboType"]): number {
  switch (comboType) {
    case "yogurt_fruit":
      return 60;
    case "fruit_combo":
      return 55;
    case "bread_combo":
      return 50;
    case "salad":
      return 52;
    case "cooked_simple":
      return 42;
    case "single_fallback":
      return 25;
    case "no_valid_option":
      return 0;
  }
}

function listReasonableSingleCandidates(available: Set<string>) {
  const singles: { ingredient: string; tier: 1 | 2 | 3; stableKey: string; baseScore: number }[] =
    [];

  // Tier 1: yogurt, milk, fruits
  const tier1: string[] = ["yogurt", "milk"];
  for (const fruit of INGREDIENT_GROUPS.fruits) tier1.push(fruit);

  for (const item of tier1) {
    if (!available.has(item)) continue;
    if (!isDirectlyEdibleSingle(item)) continue;
    const isFruit = INGREDIENT_GROUPS.fruits.has(item);
    const stableKey = isFruit ? `single:fruit:${item}` : `single:${item}`;
    const baseScore = 25 + (isFruit ? 4 : 0) + (item === "yogurt" ? 3 : 0);
    singles.push({ ingredient: item, tier: 1, stableKey, baseScore });
  }

  // Tier 2: cheese, bread, nuts, tuna
  const tier2 = ["cheese", "bread", "nuts", "tuna"];
  for (const item of tier2) {
    if (!available.has(item)) continue;
    if (!isDirectlyEdibleSingle(item)) continue;
    const baseScore = 18 + (item === "bread" ? 2 : 0) + (item === "cheese" ? 1 : 0);
    singles.push({ ingredient: item, tier: 2, stableKey: `single:${item}`, baseScore });
  }

  // Tier 3: salad vegetables (raw ingredients)
  for (const item of INGREDIENT_GROUPS.saladVegetables) {
    if (!available.has(item)) continue;
    if (!isDirectlyEdibleSingle(item)) continue;
    singles.push({ ingredient: item, tier: 3, stableKey: `single:veg:${item}`, baseScore: 10 });
  }

  return singles;
}

export function suggestOne(req: SuggestRequest): SuggestResponse {
  const available = new Set(req.ingredients);
  const candidates: Candidate[] = [];

  // Candidate generation uses existing combo types / fallback categories only.
  const fruits = pickFromGroup(available, "fruits");
  const saladVeg = pickFromGroup(available, "saladVegetables");

  // fruit + yogurt
  if (available.has("yogurt") && fruits.length >= 1) {
    const comboType: SuggestResponse["comboType"] = "yogurt_fruit";
    const stableKey = `combo:${comboType}`;
    const baseScore = baseScoreForComboType(comboType) + (req.timeMinutes === 5 ? 4 : 0);
    const personalityWeight = personalityWeightFor(req.personalityMode, comboType, stableKey);
    candidates.push({
      out: {
        suggestion: `Mix yogurt with ${fruits[0]} and eat.`,
        reasoning: req.cookingWillingness === "no" ? "No cooking." : "Simple.",
        personalityMode: req.personalityMode,
        comboType,
        decisionReason: decideReason(req, "no_cook"),
        usedFallback: false
      },
      baseScore,
      personalityWeight,
      finalScore: baseScore + personalityWeight,
      stableKey
    });
  }

  // bread + cheese
  if (available.has("bread") && available.has("cheese")) {
    const comboType: SuggestResponse["comboType"] = "bread_combo";
    const stableKey = `combo:${comboType}:bread+cheese`;
    const baseScore = baseScoreForComboType(comboType) + (req.timeMinutes === 5 ? 4 : 0);
    const personalityWeight = personalityWeightFor(req.personalityMode, comboType, stableKey);
    candidates.push({
      out: {
        suggestion: "Have bread and cheese now.",
        reasoning: req.cookingWillingness === "no" ? "No cooking." : "Fast and easy.",
        personalityMode: req.personalityMode,
        comboType,
        decisionReason: decideReason(req, "no_cook"),
        usedFallback: false
      },
      baseScore,
      personalityWeight,
      finalScore: baseScore + personalityWeight,
      stableKey
    });
  }

  // simple salad (2+ salad vegetables, no cooking)
  if (req.cookingWillingness === "no" && saladVeg.length >= 2) {
    const chosen = saladVeg.slice(0, 3);
    const comboType: SuggestResponse["comboType"] = "salad";
    const stableKey = `combo:${comboType}:${chosen.join("+")}`;
    const baseScore = baseScoreForComboType(comboType) + chosen.length;
    const personalityWeight = personalityWeightFor(req.personalityMode, comboType, stableKey);
    candidates.push({
      out: {
        suggestion: `Make a quick salad with ${joinNice(chosen)} and eat.`,
        reasoning: "No cooking.",
        personalityMode: req.personalityMode,
        comboType,
        decisionReason: "no_cook_combo",
        usedFallback: false
      },
      baseScore,
      personalityWeight,
      finalScore: baseScore + personalityWeight,
      stableKey
    });
  }

  // 2+ fruits
  if (fruits.length >= 2) {
    const chosen = fruits.slice(0, 3);
    const comboType: SuggestResponse["comboType"] = "fruit_combo";
    const stableKey = `combo:${comboType}:${chosen.join("+")}`;
    const baseScore = baseScoreForComboType(comboType) + chosen.length + (req.timeMinutes === 5 ? 3 : 0);
    const personalityWeight = personalityWeightFor(req.personalityMode, comboType, stableKey);
    candidates.push({
      out: {
        suggestion: `Eat the ${joinNice(chosen)}.`,
        reasoning: "Fast and ready to eat.",
        personalityMode: req.personalityMode,
        comboType,
        decisionReason: "low_energy_fast",
        usedFallback: false
      },
      baseScore,
      personalityWeight,
      finalScore: baseScore + personalityWeight,
      stableKey
    });
  }

  // eggs + bread + cooking allowed
  if (available.has("eggs") && available.has("bread") && req.cookingWillingness !== "no") {
    // Keep it realistic: 10+ minutes for cooking eggs
    if (req.timeMinutes !== 5) {
      const comboType: SuggestResponse["comboType"] = "cooked_simple";
      const stableKey = `combo:${comboType}:eggs+bread`;
      const baseScore =
        baseScoreForComboType(comboType) +
        (req.energyLevel === "low" ? 2 : 0) +
        (req.timeMinutes === 10 ? 1 : 0);
      const personalityWeight = personalityWeightFor(req.personalityMode, comboType, stableKey);
      candidates.push({
        out: {
          suggestion: "Cook the eggs and eat with bread.",
          reasoning: req.energyLevel === "low" ? "Simple and filling." : "Quick and doable.",
          personalityMode: req.personalityMode,
          comboType,
          decisionReason: "cooking_allowed_simple",
          usedFallback: false
        },
        baseScore,
        personalityWeight,
        finalScore: baseScore + personalityWeight,
        stableKey
      });
    }
  }

  const usable = SIMPLE_COMBOS.filter((c) => hasAll(available, c.requiredIngredients));

  let bestCombo: SimpleCombo | null = null;
  let bestComboScore = -Infinity;

  for (const combo of usable) {
    const s = scoreCombo(combo, req);
    if (s > bestComboScore) {
      bestComboScore = s;
      bestCombo = combo;
    }
  }

  if (bestCombo) {
    const reasoningParts: string[] = [];
    if (req.cookingWillingness === "no") reasoningParts.push("No cooking.");
    if (req.energyLevel === "low") reasoningParts.push("Low effort.");
    if (req.timeMinutes === 5) reasoningParts.push("Fast.");

    if (reasoningParts.length === 0) {
      if (bestCombo.noCook) reasoningParts.push("Simple.");
      else reasoningParts.push("Simple and doable.");
    }

    const comboType = comboTypeForSimpleCombo(bestCombo);
    const stableKey = `simple:${bestCombo.id}`;
    const baseScore = bestComboScore;
    const personalityWeight = personalityWeightFor(req.personalityMode, comboType, stableKey);
    candidates.push({
      out: {
        suggestion: bestCombo.suggestion,
        reasoning: reasoningParts.join(" "),
        personalityMode: req.personalityMode,
        comboType,
        decisionReason: decideReason(req, bestCombo.noCook ? "no_cook" : "cooked"),
        usedFallback: false
      },
      baseScore,
      personalityWeight,
      finalScore: baseScore + personalityWeight,
      stableKey
    });
  }

  const fallback = fallbackSuggestion({
    available,
    timeMinutes: req.timeMinutes,
    energyLevel: req.energyLevel,
    cookingWillingness: req.cookingWillingness,
    personalityMode: req.personalityMode
  });
  if (fallback) {
    const alreadyHaveSame = candidates.some(
      (c) => c.out.comboType === fallback.comboType && c.out.suggestion === fallback.suggestion
    );
    if (!alreadyHaveSame) {
    const stableKey = `fallback:${fallback.comboType}`;
    const baseScore = baseScoreForComboType(fallback.comboType) - 5;
      const personalityWeight = personalityWeightFor(
        req.personalityMode,
        fallback.comboType,
        stableKey
      );
      candidates.push({
        out: fallback,
        baseScore,
        personalityWeight,
        finalScore: baseScore + personalityWeight,
        stableKey
      });
    }
  }

  // Single-item candidates are always available as a reasonable option,
  // but only if directly edible (no unsafe items).
  for (const s of listReasonableSingleCandidates(available)) {
    const comboType: SuggestResponse["comboType"] = "single_fallback";
    const stableKey = s.stableKey;
    const personalityWeight = personalityWeightFor(req.personalityMode, comboType, stableKey);
    const baseScore = s.baseScore;
    const ingredient = s.ingredient;
    const suggestion =
      ingredient === "yogurt"
        ? "Have some yogurt."
        : ingredient === "milk"
          ? "Have a glass of milk."
          : ingredient === "nuts"
            ? "Have some nuts."
            : ingredient === "tuna"
              ? "Have some tuna."
              : `Eat the ${ingredient}.`;
    candidates.push({
      out: {
        suggestion,
        reasoning: "Ready to eat.",
        personalityMode: req.personalityMode,
        comboType,
        decisionReason: "safe_single_item",
        usedFallback: true
      },
      baseScore,
      personalityWeight,
      finalScore: baseScore + personalityWeight,
      stableKey
    });
  }

  if (candidates.length === 0) {
    return {
      suggestion: "Not enough ready-to-eat ingredients.",
      reasoning: "No safe option found.",
      personalityMode: req.personalityMode,
      comboType: "no_valid_option",
      decisionReason: "not_enough_ready_to_eat",
      usedFallback: true
    };
  }

  // Final selection: highest finalScore wins.
  const bestCandidate = pickBestCandidate(candidates);
  return {
    ...bestCandidate.out,
    debugCandidates: candidates
      .map((c) => ({
        suggestion: c.out.suggestion,
        comboType: c.out.comboType,
        baseScore: c.baseScore,
        personalityWeight: c.personalityWeight,
        finalScore: c.finalScore
      }))
      .sort((a, b) => b.finalScore - a.finalScore)
  };
}

