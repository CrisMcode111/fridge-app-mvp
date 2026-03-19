<<<<<<< HEAD
# PRODUCT_PLAN.md

## 1. Problem

Users experience daily decision fatigue around food.

At the moment they need to eat (especially evening), they:
- feel tired
- lack mental clarity
- have constraints (time, ingredients, digestion, preferences)
- cannot decide what to eat

Existing solutions (recipes, meal plans, AI suggestions) increase complexity instead of reducing it.

Core problem:
> Users do not need more options. They need one clear decision.

---

## 2. Target User

Primary:
- Women (30–55)
- Busy, mentally loaded (work + family)
- Care about food quality but feel overwhelmed
- Often experience:
  - fatigue
  - digestive sensitivity
  - lack of time

Secondary:
- Busy professionals (any gender)
- People living alone with low cooking motivation

---

## 3. Core Value Proposition

> “Stop thinking. Eat this.”

The app removes decision fatigue by providing:
- ONE clear food suggestion
- based on current context
- immediately actionable

---

## 4. MVP Scope (STRICT)

The MVP does ONLY this:

### Input:
- list of available ingredients (manual input)
- time available (5 / 10 / 20 minutes)
- energy level (low / medium / ok)
- cooking willingness (no / minimal / yes)

### Output:
- ONE food suggestion
- optional fallback (ONLY if first is not possible)

### Constraints:
- no list of recipes
- no multiple options
- no complex instructions
- no long explanations

---

## 5. Output Format

Each suggestion must be:

- simple
- executable immediately
- based on available ingredients
- adapted to energy level

Example:

> “Take yogurt + apple + cinnamon. Mix and eat.”

NOT acceptable:
- long recipes
- complex cooking steps
- missing ingredients
- abstract ideas

---

## 6. Non-Goals (VERY IMPORTANT)

The MVP will NOT include:

- user accounts
- authentication
- database persistence
- meal planning
- nutrition tracking
- calorie counting
- advanced AI personalization
- fridge image recognition
- multiple suggestions UI
- social features

---

## 7. Core Principle

> Reduce cognitive load, not optimize food.

The system prioritizes:
1. simplicity
2. feasibility
3. speed of execution

NOT:
- perfect nutrition
- creativity
- variety

---

## 8. User Scenarios (Test Cases)

### Scenario 1
- ingredients: eggs, cheese, bread
- time: 5 min
- energy: low
→ output: simple sandwich or eggs

### Scenario 2
- ingredients: apple, yogurt, nuts (if allowed)
- time: 5 min
- energy: very low
→ output: mix and eat

### Scenario 3
- ingredients: vegetables, rice
- time: 20 min
- energy: ok
→ output: simple warm dish

### Scenario 4
- almost empty fridge
- time: 5 min
- energy: low
→ output: minimal fallback (e.g. fruit, simple combination)

### Scenario 5
- user refuses cooking
→ output: no-cook solution ONLY

---

## 9. Success Criteria

The MVP is successful if:

- users understand the suggestion instantly
- users can execute without thinking
- users return to use it again
- users do NOT ask for more options

Failure signals:

- users ask “what else?”
- users ignore suggestions
- users feel suggestions are unrealistic

---

## 10. Product Philosophy

This is NOT a recipe app.

This is:
> a decision engine for low-energy moments

Key rule:
> One decision is better than ten options.

---

## 11. Future (NOT NOW)

Possible future extensions (NOT part of MVP):

- fridge image recognition
- user profiles
- dietary protocols (candida, etc.)
- history and learning
- AI personalization
- shopping suggestions

These are explicitly excluded from MVP.

---

## FINAL RULE

If a feature increases complexity, it is rejected.

=======
# PRODUCT_PLAN.md

## 1. Problem

Users experience daily decision fatigue around food.

At the moment they need to eat (especially evening), they:
- feel tired
- lack mental clarity
- have constraints (time, ingredients, digestion, preferences)
- cannot decide what to eat

Existing solutions (recipes, meal plans, AI suggestions) increase complexity instead of reducing it.

Core problem:
> Users do not need more options. They need one clear decision.

---

## 2. Target User

Primary:
- Women (30–55)
- Busy, mentally loaded (work + family)
- Care about food quality but feel overwhelmed
- Often experience:
  - fatigue
  - digestive sensitivity
  - lack of time

Secondary:
- Busy professionals (any gender)
- People living alone with low cooking motivation

---

## 3. Core Value Proposition

> “Stop thinking. Eat this.”

The app removes decision fatigue by providing:
- ONE clear food suggestion
- based on current context
- immediately actionable

---

## 4. MVP Scope (STRICT)

The MVP does ONLY this:

### Input:
- list of available ingredients (manual input)
- time available (5 / 10 / 20 minutes)
- energy level (low / medium / ok)
- cooking willingness (no / minimal / yes)

### Output:
- ONE food suggestion
- optional fallback (ONLY if first is not possible)

### Constraints:
- no list of recipes
- no multiple options
- no complex instructions
- no long explanations

---

## 5. Output Format

Each suggestion must be:

- simple
- executable immediately
- based on available ingredients
- adapted to energy level

Example:

> “Take yogurt + apple + cinnamon. Mix and eat.”

NOT acceptable:
- long recipes
- complex cooking steps
- missing ingredients
- abstract ideas

---

## 6. Non-Goals (VERY IMPORTANT)

The MVP will NOT include:

- user accounts
- authentication
- database persistence
- meal planning
- nutrition tracking
- calorie counting
- advanced AI personalization
- fridge image recognition
- multiple suggestions UI
- social features

---

## 7. Core Principle

> Reduce cognitive load, not optimize food.

The system prioritizes:
1. simplicity
2. feasibility
3. speed of execution

NOT:
- perfect nutrition
- creativity
- variety

---

## 8. User Scenarios (Test Cases)

### Scenario 1
- ingredients: eggs, cheese, bread
- time: 5 min
- energy: low
→ output: simple sandwich or eggs

### Scenario 2
- ingredients: apple, yogurt, nuts (if allowed)
- time: 5 min
- energy: very low
→ output: mix and eat

### Scenario 3
- ingredients: vegetables, rice
- time: 20 min
- energy: ok
→ output: simple warm dish

### Scenario 4
- almost empty fridge
- time: 5 min
- energy: low
→ output: minimal fallback (e.g. fruit, simple combination)

### Scenario 5
- user refuses cooking
→ output: no-cook solution ONLY

---

## 9. Success Criteria

The MVP is successful if:

- users understand the suggestion instantly
- users can execute without thinking
- users return to use it again
- users do NOT ask for more options

Failure signals:

- users ask “what else?”
- users ignore suggestions
- users feel suggestions are unrealistic

---

## 10. Product Philosophy

This is NOT a recipe app.

This is:
> a decision engine for low-energy moments

Key rule:
> One decision is better than ten options.

---

## 11. Future (NOT NOW)

Possible future extensions (NOT part of MVP):

- fridge image recognition
- user profiles
- dietary protocols (candida, etc.)
- history and learning
- AI personalization
- shopping suggestions

These are explicitly excluded from MVP.

---

## FINAL RULE

If a feature increases complexity, it is rejected.

>>>>>>> 4736e626c9ed31bc58a496a2f597f218b6d33e36
If a feature reduces thinking, it is accepted.