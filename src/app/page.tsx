"use client";

import { useMemo, useState } from "react";
import type {
  CookingWillingness,
  EnergyLevel,
  PersonalityMode,
  SuggestResponse,
  TimeMinutes
} from "../lib/types";
import { parseIngredientsText, uniq } from "../lib/ingredient-utils";

type FormState = {
  ingredientsText: string;
  timeMinutes: TimeMinutes;
  energyLevel: EnergyLevel;
  cookingWillingness: CookingWillingness;
  personalityMode: PersonalityMode;
};

export default function Page() {
  const [form, setForm] = useState<FormState>({
    ingredientsText: "",
    timeMinutes: 5,
    energyLevel: "low",
    cookingWillingness: "no",
    personalityMode: "fast"
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SuggestResponse | null>(null);

  const ingredientsPreview = useMemo(() => {
    const parsed = uniq(parseIngredientsText(form.ingredientsText));
    return parsed;
  }, [form.ingredientsText]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setResult(null);

    const ingredients = ingredientsPreview;
    if (ingredients.length === 0) {
      setError("Please enter at least one ingredient.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/suggest", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ingredients,
          timeMinutes: form.timeMinutes,
          energyLevel: form.energyLevel,
          cookingWillingness: form.cookingWillingness,
          personalityMode: form.personalityMode
        })
      });

      const data = (await res.json()) as unknown;
      if (!res.ok) {
        const msg =
          typeof data === "object" &&
          data !== null &&
          "error" in data &&
          typeof (data as { error?: unknown }).error === "string"
            ? (data as { error: string }).error
            : "Request failed.";
        setError(msg);
        return;
      }

      setResult(data as SuggestResponse);
    } catch {
      setError("Network error.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="container">
      <header className="header">
        <h1 className="title">Stop thinking. Eat this.</h1>
        <p className="subtitle">
          Enter what you have. Get <strong>one</strong> clear suggestion.
        </p>
      </header>

      <div className="grid">
        <section className="card">
          <h2 className="cardTitle">Inputs</h2>
          <form onSubmit={onSubmit}>
            <div>
              <label htmlFor="ingredients">Ingredients</label>
              <input
                id="ingredients"
                type="text"
                placeholder="eggs, bread, cheese"
                value={form.ingredientsText}
                onChange={(e) =>
                  setForm((f) => ({ ...f, ingredientsText: e.target.value }))
                }
              />
              <p className="hint">
                Comma-separated. Parsed:{" "}
                {ingredientsPreview.length ? ingredientsPreview.join(", ") : "—"}
              </p>
            </div>

            <div className="row">
              <div>
                <label htmlFor="time">Time</label>
                <select
                  id="time"
                  value={form.timeMinutes}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, timeMinutes: Number(e.target.value) as TimeMinutes }))
                  }
                >
                  <option value={5}>5 min</option>
                  <option value={10}>10 min</option>
                  <option value={20}>20 min</option>
                </select>
              </div>

              <div>
                <label htmlFor="energy">Energy level</label>
                <select
                  id="energy"
                  value={form.energyLevel}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      energyLevel: e.target.value as EnergyLevel
                    }))
                  }
                >
                  <option value="low">low</option>
                  <option value="medium">medium</option>
                  <option value="ok">ok</option>
                </select>
              </div>

              <div>
                <label htmlFor="cook">Cooking willingness</label>
                <select
                  id="cook"
                  value={form.cookingWillingness}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      cookingWillingness: e.target.value as CookingWillingness
                    }))
                  }
                >
                  <option value="no">no</option>
                  <option value="minimal">minimal</option>
                  <option value="yes">yes</option>
                </select>
              </div>

              <div>
                <label htmlFor="mode">Personality mode</label>
                <select
                  id="mode"
                  value={form.personalityMode}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      personalityMode: e.target.value as PersonalityMode
                    }))
                  }
                >
                  <option value="fast">fast</option>
                  <option value="healthy">healthy</option>
                  <option value="comfort">comfort</option>
                </select>
              </div>
            </div>

            <div className="actions">
              <button type="submit" disabled={loading}>
                {loading ? "Thinking…" : "Suggest"}
              </button>
            </div>

            {error ? <p className="error">{error}</p> : null}
          </form>
        </section>

        <section className="card">
          <h2 className="cardTitle">Result</h2>
          {result ? (
            <>
              <p className="resultLine">
                <strong>{result.suggestion}</strong>
              </p>
              {result.fallback ? (
                <p className="resultLine" style={{ marginTop: 10 }}>
                  Fallback: {result.fallback}
                </p>
              ) : null}
              <p className="reasoning">{result.reasoning}</p>
            </>
          ) : (
            <p className="hint">Submit the form to get one suggestion.</p>
          )}
        </section>
      </div>
    </main>
  );
}

