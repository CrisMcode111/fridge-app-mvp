<<<<<<< HEAD
# PRODUCT_PLAN_v2.md

## 1. Product Definition

### 1.1 Core Idea

This product is not a recipe generator.

It is a **decision engine that translates available ingredients into an appropriate food action**, based on:

* user context (time, energy, willingness)
* internal state (light, grounding, detox, indulgent)
* available ingredients (text or image-derived)

**Core question:**

> “What do I need right now, based on what I have?”

---

### 1.2 Product Layers

The system is composed of 3 distinct layers:

1. **Input Layer**

   * ingredients (text OR image → extracted ingredients)
   * time
   * energy level
   * cooking willingness
   * mode (state-based)

2. **Decision Engine**

   * generates valid candidates
   * scores candidates
   * applies mode-specific weighting
   * selects exactly one deterministic output

3. **Output Layer**

   * instant suggestion OR mini recipe
   * concise, actionable, realistic

---

## 2. Personality Modes (State-Based)

Replace generic modes with **state-driven modes**.

### 2.1 Modes

* `light`
* `grounding`
* `indulgent`
* `detox`

(Future extension: `cycle_support`)

---

### 2.2 Mode Intent Definitions

#### light

* easy digestion
* low effort
* fresh combinations
* minimal heaviness

#### grounding

* stable, filling, comforting
* bread, warm-feeling foods, density
* reduces decision fatigue

#### indulgent

* pleasure-oriented
* richer combinations
* taste priority over simplicity

#### detox

* simple, clean, plant-forward
* avoids heavy combinations
* emphasizes raw/simple foods

---

### 2.3 Mode Behavior (Technical)

Each mode:

* does NOT introduce new rules
* modifies **candidate ranking via weights**

Example:

```text
finalScore = baseScore + personalityWeight
```

Modes influence:

* combo preference
* fallback preference
* complexity tolerance

---

## 3. Output Strategy

### 3.1 Dual Output Types

The system supports two output types:

#### A. Instant Suggestion

Used when:

* very low energy
* no cooking willingness
* minimal time

Format:

* one sentence
* immediate action

Example:

> “Eat the apple and yogurt.”

---

#### B. Mini Recipe (Core Upgrade)

Used when:

* multiple ingredients available
* user has minimal capacity to act (but not zero)

Format:

* Title
* 2–4 steps max
* no fluff
* only available ingredients (optional additions clearly marked)

Example:

**Quick egg and tomato toast**

1. Toast the bread.
2. Cook the eggs quickly.
3. Add sliced tomato on top.
4. Finish with cheese if available.

---

### 3.2 Selection Logic

Output type is determined by:

* energy level
* cooking willingness
* number of usable ingredients

---

## 4. Ingredient Input Evolution

### 4.1 Current (v1)

* text input (comma-separated)

### 4.2 v2 Extension

* same structure, improved grouping

### 4.3 Future (v3)

#### Image Input

User flow:

* user takes photo of fridge
* system extracts ingredients
* normalized ingredient list passed to engine

Important:

* image layer is **separate from decision engine**
* decision engine remains unchanged

---

## 5. Decision Engine Evolution

### 5.1 Current State (v1)

* combo rules
* fallback logic
* deterministic selection

### 5.2 v2 Improvements

#### A. Candidate Generation

* generate ALL valid candidates
* include:

  * combos
  * simple meals
  * multiple fallback options

#### B. Scoring System

Each candidate includes:

* suggestion
* comboType
* baseScore
* personalityWeight
* finalScore

#### C. Selection

* pick highest finalScore
* deterministic tie-breaking

---

## 6. Output Quality Principles

All outputs must be:

* realistic (based on actual fridge content)
* immediate (no complex prep)
* minimal (no unnecessary text)
* safe (no invalid combinations)
* actionable (clear next step)

---

## 7. Product Differentiation

This product is NOT:

* a recipe database
* a meal planner
* a calorie calculator

It IS:

> a context-aware food decision system

Key differentiation:

* integrates internal state
* adapts to real constraints
* outputs one clear action

---

## 8. Future Extensions

### 8.1 Cycle-Aware Mode (Advanced)

Introduce:

* `cycle_support`

Later mapped to:

* energy
* cravings
* digestion
* warmth / cooling

---

### 8.2 Digestive Profiles

Examples:

* anti-candida
* low irritation
* high energy

---

### 8.3 Personalization Layer

* user history
* preferred foods
* avoided foods

---

## 9. Roadmap

### v2 (current target)

* new modes (light / grounding / indulgent / detox)
* dual output (instant + mini recipe)
* improved scoring system

### v3

* image input (fridge recognition)
* ingredient normalization pipeline

### v4

* cycle-aware logic
* deeper personalization

---

## 10. Guiding Principle

Always optimize for:

> clarity over variety

The system must:

* return ONE suggestion
* be predictable
* feel aligned with user state

Not:

* overwhelm
* generate multiple options
* behave randomly

---

## Final Definition

This is not a cooking tool.

This is:

> a system that reduces friction between “what I have” and “what I need”.
=======
# PRODUCT_PLAN_v2.md

## 1. Product Definition

### 1.1 Core Idea

This product is not a recipe generator.

It is a **decision engine that translates available ingredients into an appropriate food action**, based on:

* user context (time, energy, willingness)
* internal state (light, grounding, detox, indulgent)
* available ingredients (text or image-derived)

**Core question:**

> “What do I need right now, based on what I have?”

---

### 1.2 Product Layers

The system is composed of 3 distinct layers:

1. **Input Layer**

   * ingredients (text OR image → extracted ingredients)
   * time
   * energy level
   * cooking willingness
   * mode (state-based)

2. **Decision Engine**

   * generates valid candidates
   * scores candidates
   * applies mode-specific weighting
   * selects exactly one deterministic output

3. **Output Layer**

   * instant suggestion OR mini recipe
   * concise, actionable, realistic

---

## 2. Personality Modes (State-Based)

Replace generic modes with **state-driven modes**.

### 2.1 Modes

* `light`
* `grounding`
* `indulgent`
* `detox`

(Future extension: `cycle_support`)

---

### 2.2 Mode Intent Definitions

#### light

* easy digestion
* low effort
* fresh combinations
* minimal heaviness

#### grounding

* stable, filling, comforting
* bread, warm-feeling foods, density
* reduces decision fatigue

#### indulgent

* pleasure-oriented
* richer combinations
* taste priority over simplicity

#### detox

* simple, clean, plant-forward
* avoids heavy combinations
* emphasizes raw/simple foods

---

### 2.3 Mode Behavior (Technical)

Each mode:

* does NOT introduce new rules
* modifies **candidate ranking via weights**

Example:

```text
finalScore = baseScore + personalityWeight
```

Modes influence:

* combo preference
* fallback preference
* complexity tolerance

---

## 3. Output Strategy

### 3.1 Dual Output Types

The system supports two output types:

#### A. Instant Suggestion

Used when:

* very low energy
* no cooking willingness
* minimal time

Format:

* one sentence
* immediate action

Example:

> “Eat the apple and yogurt.”

---

#### B. Mini Recipe (Core Upgrade)

Used when:

* multiple ingredients available
* user has minimal capacity to act (but not zero)

Format:

* Title
* 2–4 steps max
* no fluff
* only available ingredients (optional additions clearly marked)

Example:

**Quick egg and tomato toast**

1. Toast the bread.
2. Cook the eggs quickly.
3. Add sliced tomato on top.
4. Finish with cheese if available.

---

### 3.2 Selection Logic

Output type is determined by:

* energy level
* cooking willingness
* number of usable ingredients

---

## 4. Ingredient Input Evolution

### 4.1 Current (v1)

* text input (comma-separated)

### 4.2 v2 Extension

* same structure, improved grouping

### 4.3 Future (v3)

#### Image Input

User flow:

* user takes photo of fridge
* system extracts ingredients
* normalized ingredient list passed to engine

Important:

* image layer is **separate from decision engine**
* decision engine remains unchanged

---

## 5. Decision Engine Evolution

### 5.1 Current State (v1)

* combo rules
* fallback logic
* deterministic selection

### 5.2 v2 Improvements

#### A. Candidate Generation

* generate ALL valid candidates
* include:

  * combos
  * simple meals
  * multiple fallback options

#### B. Scoring System

Each candidate includes:

* suggestion
* comboType
* baseScore
* personalityWeight
* finalScore

#### C. Selection

* pick highest finalScore
* deterministic tie-breaking

---

## 6. Output Quality Principles

All outputs must be:

* realistic (based on actual fridge content)
* immediate (no complex prep)
* minimal (no unnecessary text)
* safe (no invalid combinations)
* actionable (clear next step)

---

## 7. Product Differentiation

This product is NOT:

* a recipe database
* a meal planner
* a calorie calculator

It IS:

> a context-aware food decision system

Key differentiation:

* integrates internal state
* adapts to real constraints
* outputs one clear action

---

## 8. Future Extensions

### 8.1 Cycle-Aware Mode (Advanced)

Introduce:

* `cycle_support`

Later mapped to:

* energy
* cravings
* digestion
* warmth / cooling

---

### 8.2 Digestive Profiles

Examples:

* anti-candida
* low irritation
* high energy

---

### 8.3 Personalization Layer

* user history
* preferred foods
* avoided foods

---

## 9. Roadmap

### v2 (current target)

* new modes (light / grounding / indulgent / detox)
* dual output (instant + mini recipe)
* improved scoring system

### v3

* image input (fridge recognition)
* ingredient normalization pipeline

### v4

* cycle-aware logic
* deeper personalization

---

## 10. Guiding Principle

Always optimize for:

> clarity over variety

The system must:

* return ONE suggestion
* be predictable
* feel aligned with user state

Not:

* overwhelm
* generate multiple options
* behave randomly

---

## Final Definition

This is not a cooking tool.

This is:

> a system that reduces friction between “what I have” and “what I need”.
>>>>>>> 4736e626c9ed31bc58a496a2f597f218b6d33e36
