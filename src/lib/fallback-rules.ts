import type {
  CookingWillingness,
  EnergyLevel,
  PersonalityMode,
  SuggestResponse,
  TimeMinutes
} from "./types";
import { pickBestSingleFallback } from "./ingredient-utils";

type FallbackContext = {
  available: Set<string>;
  timeMinutes: TimeMinutes;
  energyLevel: EnergyLevel;
  cookingWillingness: CookingWillingness;
  personalityMode: PersonalityMode;
};

function has(available: Set<string>, ...items: string[]) {
  return items.every((i) => available.has(i));
}

export function fallbackSuggestion(ctx: FallbackContext): SuggestResponse | null {
  const { available, timeMinutes, energyLevel, cookingWillingness, personalityMode } = ctx;

  // If the user refuses cooking, never propose cooking in fallback.
  if (cookingWillingness === "no") {
    if (has(available, "yogurt", "apple")) {
      return {
        suggestion: "Mix yogurt with apple and eat.",
        reasoning: "No cooking.",
        personalityMode,
        comboType: "yogurt_fruit",
        decisionReason: "no_cook_combo",
        usedFallback: true
      };
    }
    if (has(available, "bread", "cheese")) {
      return {
        suggestion: "Have bread and cheese now.",
        reasoning: "No cooking.",
        personalityMode,
        comboType: "bread_combo",
        decisionReason: "no_cook_combo",
        usedFallback: true
      };
    }
    if (has(available, "tuna", "bread")) {
      return {
        suggestion: "Put tuna on bread and eat.",
        reasoning: "No cooking.",
        personalityMode,
        comboType: "bread_combo",
        decisionReason: "no_cook_combo",
        usedFallback: true
      };
    }
  }

  // Very low effort fallbacks
  if (has(available, "yogurt") && (has(available, "apple") || has(available, "banana"))) {
    const fruit = available.has("apple") ? "apple" : "banana";
    return {
      suggestion: `Mix yogurt with ${fruit} and eat.`,
      reasoning: "Fast and low effort.",
      personalityMode,
      comboType: "yogurt_fruit",
      decisionReason: "low_energy_fast",
      usedFallback: true
    };
  }

  if (has(available, "bread", "cheese")) {
    return {
      suggestion: "Have bread and cheese now.",
      reasoning: "Fast and low effort.",
      personalityMode,
      comboType: "bread_combo",
      decisionReason: "low_energy_fast",
      usedFallback: true
    };
  }

  const pick = pickBestSingleFallback(available);
  if (pick) {
    const effortReason =
      energyLevel === "low" || timeMinutes === 5 ? "Minimal effort." : "Simple and available.";
    const single = pick.ingredient;
    const suggestion =
      single === "yogurt"
        ? "Have some yogurt."
        : single === "milk"
          ? "Have a glass of milk."
        : single === "nuts"
          ? "Have some nuts."
          : single === "tuna"
            ? "Have some tuna."
          : `Eat the ${single}.`;
    return {
      suggestion,
      reasoning: effortReason,
      personalityMode,
      comboType: "single_fallback",
      decisionReason: "safe_single_item",
      usedFallback: true
    };
  }

  // No safe fallback if we don't recognize any ingredient as immediately edible.
  return null;
}

