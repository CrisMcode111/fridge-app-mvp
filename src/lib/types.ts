export type TimeMinutes = 5 | 10 | 20;
export type EnergyLevel = "low" | "medium" | "ok";
export type CookingWillingness = "no" | "minimal" | "yes";
export type PersonalityMode = "fast" | "healthy" | "comfort";

export type SuggestRequest = {
  ingredients: string[];
  timeMinutes: TimeMinutes;
  energyLevel: EnergyLevel;
  cookingWillingness: CookingWillingness;
  personalityMode: PersonalityMode;
};

export type SuggestResponse = {
  suggestion: string;
  fallback?: string;
  reasoning: string;
  personalityMode: PersonalityMode;
  debugCandidates?: Array<{
    suggestion: string;
    comboType: SuggestResponse["comboType"];
    baseScore: number;
    personalityWeight: number;
    finalScore: number;
  }>;
  comboType:
    | "salad"
    | "fruit_combo"
    | "yogurt_fruit"
    | "bread_combo"
    | "cooked_simple"
    | "single_fallback"
    | "no_valid_option";
  decisionReason:
    | "no_cook_combo"
    | "low_energy_fast"
    | "cooking_allowed_simple"
    | "safe_single_item"
    | "not_enough_ready_to_eat";
  usedFallback: boolean;
};

export type SimpleCombo = {
  id: string;
  requiredIngredients: string[];
  maxTimeMinutes: TimeMinutes;
  noCook: boolean;
  effort: "low" | "medium";
  suggestion: string;
};

