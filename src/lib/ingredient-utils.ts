const CANONICAL: Record<string, string> = {
  veggie: "vegetables",
  veggies: "vegetables",
  vegetable: "vegetables",
  veg: "vegetables",
  egg: "eggs",
  yoghurt: "yogurt",
  nut: "nuts",
  bananas: "banana",
  apples: "apple",
  oranges: "orange",
  grapes: "grapes",
  strawberries: "strawberries",
  tomatoes: "tomato",
  cucumbers: "cucumber",
  carrots: "carrot",
  lettuces: "lettuce"
};

export function normalizeIngredient(raw: string): string {
  const cleaned = raw
    .toLowerCase()
    .trim()
    .replace(/[()]/g, " ")
    .replace(/[^a-z\s-]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  if (!cleaned) return "";
  return CANONICAL[cleaned] ?? cleaned;
}

export const INGREDIENT_GROUPS = {
  fruits: new Set([
    "apple",
    "banana",
    "orange",
    "grapes",
    "strawberries",
    "berries",
    "pear",
    "peach",
    "melon"
  ]),
  saladVegetables: new Set([
    "tomato",
    "cucumber",
    "carrot",
    "lettuce",
    "spinach",
    "arugula",
    "pepper",
    "onion"
  ]),
  dairy: new Set(["yogurt", "cheese", "butter", "cream"]),
  bread: new Set(["bread", "tortilla", "wrap", "pita"]),
  eggs: new Set(["eggs"]),
  unsafeSingleItems: new Set([
    "salt",
    "pepper",
    "oil",
    "vinegar",
    "flour",
    "sugar",
    "honey",
    "raw meat",
    "chicken",
    "beef",
    "pork",
    "fish",
    "rice"
  ])
} as const;

export type IngredientGroup =
  | "fruits"
  | "saladVegetables"
  | "dairy"
  | "bread"
  | "eggs"
  | "unsafeSingleItems";

export function groupOf(ingredient: string): IngredientGroup | null {
  for (const [group, set] of Object.entries(INGREDIENT_GROUPS) as Array<
    [IngredientGroup, Set<string>]
  >) {
    if (set.has(ingredient)) return group;
  }
  return null;
}

export function pickFromGroup(
  available: Set<string>,
  group: IngredientGroup
): string[] {
  const out: string[] = [];
  for (const item of INGREDIENT_GROUPS[group]) {
    if (available.has(item)) out.push(item);
  }
  return out;
}

export function isUnsafeSingleItem(ingredient: string): boolean {
  return INGREDIENT_GROUPS.unsafeSingleItems.has(ingredient);
}

export function isDirectlyEdibleSingle(ingredient: string): boolean {
  if (!ingredient) return false;
  if (isUnsafeSingleItem(ingredient)) return false;

  // Ready-to-eat groups
  if (INGREDIENT_GROUPS.fruits.has(ingredient)) return true;
  if (INGREDIENT_GROUPS.saladVegetables.has(ingredient)) return true;

  // Common ready-to-eat items (short list, deterministic)
  if (ingredient === "yogurt") return true;
  if (ingredient === "milk") return true;
  if (ingredient === "cheese") return true;
  if (ingredient === "bread") return true;
  if (ingredient === "nuts") return true;
  if (ingredient === "tuna") return true; // assume canned tuna

  return false;
}

export type SingleFallbackTier = 1 | 2 | 3;

export function pickBestSingleFallback(
  available: Set<string>
): { ingredient: string; tier: SingleFallbackTier } | null {
  // Tier 1: ready-to-consume foods (yogurt, milk, fruit)
  if (available.has("yogurt") && isDirectlyEdibleSingle("yogurt")) {
    return { ingredient: "yogurt", tier: 1 };
  }

  const fruitPreference = [
    "apple",
    "banana",
    "orange",
    "grapes",
    "strawberries",
    "berries",
    "pear",
    "peach",
    "melon"
  ];
  for (const fruit of fruitPreference) {
    if (available.has(fruit) && isDirectlyEdibleSingle(fruit)) {
      return { ingredient: fruit, tier: 1 };
    }
  }

  if (available.has("milk") && isDirectlyEdibleSingle("milk")) {
    return { ingredient: "milk", tier: 1 };
  }

  // Tier 2: simple snack items (cheese, bread)
  const tier2Preference = ["cheese", "bread", "nuts", "tuna"];
  for (const item of tier2Preference) {
    if (available.has(item) && isDirectlyEdibleSingle(item)) {
      return { ingredient: item, tier: 2 };
    }
  }

  // Tier 3: raw ingredients (tomato, carrot, cucumber, etc.)
  const tier3Preference = [
    "cucumber",
    "carrot",
    "tomato",
    "lettuce",
    "spinach",
    "arugula",
    "pepper",
    "onion"
  ];
  for (const veg of tier3Preference) {
    if (available.has(veg) && isDirectlyEdibleSingle(veg)) {
      return { ingredient: veg, tier: 3 };
    }
  }

  return null;
}

export function parseIngredientsText(input: string): string[] {
  return input
    .split(/[,\n]/g)
    .map((s) => normalizeIngredient(s))
    .filter(Boolean);
}

export function uniq(items: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const item of items) {
    if (seen.has(item)) continue;
    seen.add(item);
    out.push(item);
  }
  return out;
}

export function hasAll(available: Set<string>, required: string[]): boolean {
  for (const req of required) {
    if (!available.has(req)) return false;
  }
  return true;
}

