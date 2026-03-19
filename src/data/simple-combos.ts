import type { SimpleCombo } from "../lib/types";

export const SIMPLE_COMBOS: SimpleCombo[] = [
  {
    id: "yogurt-apple",
    requiredIngredients: ["yogurt", "apple"],
    maxTimeMinutes: 5,
    noCook: true,
    effort: "low",
    suggestion: "Mix yogurt with apple and eat."
  },
  {
    id: "bread-cheese-plate",
    requiredIngredients: ["bread", "cheese"],
    maxTimeMinutes: 5,
    noCook: true,
    effort: "low",
    suggestion: "Have bread and cheese now."
  },
  {
    id: "egg-cheese-scramble",
    requiredIngredients: ["eggs", "cheese"],
    maxTimeMinutes: 10,
    noCook: false,
    effort: "medium",
    suggestion: "Scramble the eggs with cheese."
  },
  {
    id: "egg-toast",
    requiredIngredients: ["eggs", "bread"],
    maxTimeMinutes: 10,
    noCook: false,
    effort: "medium",
    suggestion: "Cook the eggs and eat with bread."
  },
  {
    id: "rice-veg-bowl",
    requiredIngredients: ["rice", "vegetables"],
    maxTimeMinutes: 20,
    noCook: false,
    effort: "medium",
    suggestion: "Cook rice with vegetables."
  },
  {
    id: "tuna-bread",
    requiredIngredients: ["tuna", "bread"],
    maxTimeMinutes: 5,
    noCook: true,
    effort: "low",
    suggestion: "Put tuna on bread and eat."
  },
  {
    id: "nuts-fruit",
    requiredIngredients: ["nuts", "apple"],
    maxTimeMinutes: 5,
    noCook: true,
    effort: "low",
    suggestion: "Have an apple with nuts."
  }
];

