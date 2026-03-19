import { NextResponse } from "next/server";
import type {
  CookingWillingness,
  EnergyLevel,
  PersonalityMode,
  SuggestRequest,
  TimeMinutes
} from "../../../lib/types";
import { normalizeIngredient, uniq } from "../../../lib/ingredient-utils";
import { suggestOne } from "../../../lib/decision-engine";

const TIME_ALLOWED = new Set<TimeMinutes>([5, 10, 20]);
const ENERGY_ALLOWED = new Set<EnergyLevel>(["low", "medium", "ok"]);
const COOK_ALLOWED = new Set<CookingWillingness>(["no", "minimal", "yes"]);
const MODE_ALLOWED = new Set<PersonalityMode>(["fast", "healthy", "comfort"]);

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}

export async function POST(req: Request) {
  try {
    const body: unknown = await req.json();
    if (!isRecord(body)) {
      return NextResponse.json(
        { error: "Body must be a JSON object." },
        { status: 400 }
      );
    }

    const ingredientsRaw = body.ingredients;
    const timeMinutesRaw = body.timeMinutes;
    const energyLevelRaw = body.energyLevel;
    const cookingWillingnessRaw = body.cookingWillingness;
    const personalityModeRaw = body.personalityMode;

    if (!Array.isArray(ingredientsRaw)) {
      return NextResponse.json(
        { error: "ingredients must be an array of strings." },
        { status: 400 }
      );
    }

    const normalizedIngredients = uniq(
      ingredientsRaw
        .map((x) => (typeof x === "string" ? normalizeIngredient(x) : ""))
        .filter(Boolean)
    );

    if (normalizedIngredients.length === 0) {
      return NextResponse.json(
        { error: "ingredients must not be empty." },
        { status: 400 }
      );
    }

    if (typeof timeMinutesRaw !== "number" || !TIME_ALLOWED.has(timeMinutesRaw as TimeMinutes)) {
      return NextResponse.json(
        { error: "timeMinutes must be one of 5, 10, 20." },
        { status: 400 }
      );
    }

    if (typeof energyLevelRaw !== "string" || !ENERGY_ALLOWED.has(energyLevelRaw as EnergyLevel)) {
      return NextResponse.json(
        { error: 'energyLevel must be one of "low", "medium", "ok".' },
        { status: 400 }
      );
    }

    if (
      typeof cookingWillingnessRaw !== "string" ||
      !COOK_ALLOWED.has(cookingWillingnessRaw as CookingWillingness)
    ) {
      return NextResponse.json(
        { error: 'cookingWillingness must be one of "no", "minimal", "yes".' },
        { status: 400 }
      );
    }

    const personalityMode: PersonalityMode =
      typeof personalityModeRaw === "string" && MODE_ALLOWED.has(personalityModeRaw as PersonalityMode)
        ? (personalityModeRaw as PersonalityMode)
        : "fast";

    const input: SuggestRequest = {
      ingredients: normalizedIngredients,
      timeMinutes: timeMinutesRaw as TimeMinutes,
      energyLevel: energyLevelRaw as EnergyLevel,
      cookingWillingness: cookingWillingnessRaw as CookingWillingness,
      personalityMode
    };

    const out = suggestOne(input);
    return NextResponse.json(out, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON or server error." },
      { status: 400 }
    );
  }
}

