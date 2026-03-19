<<<<<<< HEAD
# TECH_PLAN.md

## 1. Technical Goal

Build a very small web MVP that takes a user's current food context and returns ONE simple food suggestion.

The technical system must stay minimal, stable, and easy to understand.

This is a strict MVP, not a scalable production system.

---

## 2. Recommended Stack

### Frontend
- Next.js
- TypeScript
- App Router

### Backend
- Next.js Route Handlers for API endpoints

### Styling
- simple CSS or minimal Tailwind CSS

### Deployment
- Vercel

### Runtime
- Node.js

---

## 3. Why This Stack

This stack is chosen because it allows:

- one single codebase
- fast setup
- simple deployment
- low infrastructure complexity
- easy work inside Cursor

We intentionally avoid complex architecture.

---

## 4. MVP Architecture

The MVP has 3 layers only:

### Layer 1 — UI
Collects:
- available ingredients
- available time
- energy level
- cooking willingness

### Layer 2 — Decision Engine
Processes the inputs and selects:
- ONE best food suggestion
- optional fallback only if needed

### Layer 3 — API Response
Returns structured JSON to the frontend

---

## 5. Input Model

The frontend sends this data to the backend:

```json
{
  "ingredients": ["eggs", "bread", "yogurt"],
  "timeMinutes": 5,
  "energyLevel": "low",
  "cookingWillingness": "no"
}

Field rules

ingredients: array of strings

timeMinutes: one of 5, 10, 20

energyLevel: one of low, medium, ok

cookingWillingness: one of no, minimal, yes

6. Output Model

The backend must return ONE suggestion only.

Example:

{
  "suggestion": "Take yogurt with sliced apple and cinnamon. Mix and eat.",
  "fallback": "Eat an apple and a slice of bread.",
  "reasoning": "Fast, no-cook, compatible with low energy."
}
Output rules

suggestion is required

fallback is optional

reasoning must stay very short

no multiple recipe options

no long explanations

7. Decision Engine Strategy

The MVP uses a RULES-FIRST engine.

Important:

Do NOT start with LLM dependency.

The engine should:

detect usable ingredients

classify what kind of action is possible

prefer the lowest-friction solution

generate only one valid output

Prioritization rules

The engine should prioritize:

no-cook combinations if cooking willingness = no

minimal assembly if energy = low

short preparation if time = 5

realistic combinations from available ingredients only

simple fallback if input is too weak

8. No AI Dependency in First Version

Version 1 must NOT require:

OpenAI API

Gemini API

image recognition API

vector database

RAG

recommendation model

Reason:
The first version validates product usefulness, not AI sophistication.

A future version may use AI only after the rules engine is proven useful.

9. Suggested Folder Structure
fridge-app-mvp/
│
├── PRODUCT_PLAN.md
├── TECH_PLAN.md
├── package.json
├── tsconfig.json
├── next.config.ts
│
├── src/
│   ├── app/
│   │   ├── page.tsx
│   │   └── api/
│   │       └── suggest/
│   │           └── route.ts
│   │
│   ├── components/
│   │   ├── InputForm.tsx
│   │   └── SuggestionCard.tsx
│   │
│   ├── lib/
│   │   ├── types.ts
│   │   ├── ingredient-utils.ts
│   │   ├── decision-engine.ts
│   │   └── fallback-rules.ts
│   │
│   └── data/
│       └── simple-combos.ts
│
└── .cursor/
    └── rules/
        └── mvp_rules.md
10. Core Files Responsibilities
src/app/page.tsx

Main page for the MVP UI

src/app/api/suggest/route.ts

API endpoint that receives input and returns one suggestion

src/lib/types.ts

Defines TypeScript types for request and response

src/lib/decision-engine.ts

Contains the main decision logic

src/lib/ingredient-utils.ts

Normalizes and checks ingredients

src/lib/fallback-rules.ts

Contains minimal fallback logic for weak input

src/data/simple-combos.ts

Contains predefined simple combinations the engine can use

11. API Design
Endpoint

POST /api/suggest

Request body
{
  "ingredients": ["bread", "cheese"],
  "timeMinutes": 5,
  "energyLevel": "low",
  "cookingWillingness": "no"
}
Response body
{
  "suggestion": "Make a bread and cheese plate and eat it now.",
  "fallback": "Eat the cheese with bread separately.",
  "reasoning": "Very low effort and no cooking."
}
API rules

reject invalid input

return clear error messages

never invent unavailable ingredients

always prefer stable behavior over creativity

12. UI Requirements

The UI must stay minimal.

Required elements

ingredient text input

time selector

energy selector

cooking willingness selector

submit button

result card

UX rules

user must understand flow in less than 10 seconds

no clutter

no multiple result cards

no advanced settings

13. Validation Rules

Before the engine runs:

ingredient list must not be empty

values must match allowed enums

strings should be trimmed and normalized to lowercase

If ingredient list is too weak:

still return a minimal fallback if possible

14. Testing Requirements

At minimum, test:

no-cook + low energy

minimal ingredients

cooking allowed + 10 or 20 min

invalid input

fallback behavior

The most important thing to test is:

the engine never returns nonsense

the engine never returns more than one suggestion

15. Deployment Plan
First deployment target

Vercel

Reason

easiest deploy path for Next.js

fast iteration

no server management

Not needed now

Dokploy

Docker

Kubernetes

custom VPS

16. Technical Non-Goals

The MVP must NOT include:

authentication

database

user history

image upload processing

AI model integration

external food APIs

admin panel

payment system

17. Future Technical Expansion (NOT NOW)

Possible later additions:

image upload

ingredient detection from fridge photo

user preferences storage

profile-based suggestions

analytics

AI phrasing layer

subscription system

These are explicitly out of scope for version 1.

18. Build Principle

The system should be:

small

readable

deterministic

easy to modify

If a technical choice makes the project heavier without improving MVP validation, reject it.

19. Final Technical Rule

Version 1 proves this only:

Can the system produce one useful food decision from a small set of user inputs?

=======
# TECH_PLAN.md

## 1. Technical Goal

Build a very small web MVP that takes a user's current food context and returns ONE simple food suggestion.

The technical system must stay minimal, stable, and easy to understand.

This is a strict MVP, not a scalable production system.

---

## 2. Recommended Stack

### Frontend
- Next.js
- TypeScript
- App Router

### Backend
- Next.js Route Handlers for API endpoints

### Styling
- simple CSS or minimal Tailwind CSS

### Deployment
- Vercel

### Runtime
- Node.js

---

## 3. Why This Stack

This stack is chosen because it allows:

- one single codebase
- fast setup
- simple deployment
- low infrastructure complexity
- easy work inside Cursor

We intentionally avoid complex architecture.

---

## 4. MVP Architecture

The MVP has 3 layers only:

### Layer 1 — UI
Collects:
- available ingredients
- available time
- energy level
- cooking willingness

### Layer 2 — Decision Engine
Processes the inputs and selects:
- ONE best food suggestion
- optional fallback only if needed

### Layer 3 — API Response
Returns structured JSON to the frontend

---

## 5. Input Model

The frontend sends this data to the backend:

```json
{
  "ingredients": ["eggs", "bread", "yogurt"],
  "timeMinutes": 5,
  "energyLevel": "low",
  "cookingWillingness": "no"
}

Field rules

ingredients: array of strings

timeMinutes: one of 5, 10, 20

energyLevel: one of low, medium, ok

cookingWillingness: one of no, minimal, yes

6. Output Model

The backend must return ONE suggestion only.

Example:

{
  "suggestion": "Take yogurt with sliced apple and cinnamon. Mix and eat.",
  "fallback": "Eat an apple and a slice of bread.",
  "reasoning": "Fast, no-cook, compatible with low energy."
}
Output rules

suggestion is required

fallback is optional

reasoning must stay very short

no multiple recipe options

no long explanations

7. Decision Engine Strategy

The MVP uses a RULES-FIRST engine.

Important:

Do NOT start with LLM dependency.

The engine should:

detect usable ingredients

classify what kind of action is possible

prefer the lowest-friction solution

generate only one valid output

Prioritization rules

The engine should prioritize:

no-cook combinations if cooking willingness = no

minimal assembly if energy = low

short preparation if time = 5

realistic combinations from available ingredients only

simple fallback if input is too weak

8. No AI Dependency in First Version

Version 1 must NOT require:

OpenAI API

Gemini API

image recognition API

vector database

RAG

recommendation model

Reason:
The first version validates product usefulness, not AI sophistication.

A future version may use AI only after the rules engine is proven useful.

9. Suggested Folder Structure
fridge-app-mvp/
│
├── PRODUCT_PLAN.md
├── TECH_PLAN.md
├── package.json
├── tsconfig.json
├── next.config.ts
│
├── src/
│   ├── app/
│   │   ├── page.tsx
│   │   └── api/
│   │       └── suggest/
│   │           └── route.ts
│   │
│   ├── components/
│   │   ├── InputForm.tsx
│   │   └── SuggestionCard.tsx
│   │
│   ├── lib/
│   │   ├── types.ts
│   │   ├── ingredient-utils.ts
│   │   ├── decision-engine.ts
│   │   └── fallback-rules.ts
│   │
│   └── data/
│       └── simple-combos.ts
│
└── .cursor/
    └── rules/
        └── mvp_rules.md
10. Core Files Responsibilities
src/app/page.tsx

Main page for the MVP UI

src/app/api/suggest/route.ts

API endpoint that receives input and returns one suggestion

src/lib/types.ts

Defines TypeScript types for request and response

src/lib/decision-engine.ts

Contains the main decision logic

src/lib/ingredient-utils.ts

Normalizes and checks ingredients

src/lib/fallback-rules.ts

Contains minimal fallback logic for weak input

src/data/simple-combos.ts

Contains predefined simple combinations the engine can use

11. API Design
Endpoint

POST /api/suggest

Request body
{
  "ingredients": ["bread", "cheese"],
  "timeMinutes": 5,
  "energyLevel": "low",
  "cookingWillingness": "no"
}
Response body
{
  "suggestion": "Make a bread and cheese plate and eat it now.",
  "fallback": "Eat the cheese with bread separately.",
  "reasoning": "Very low effort and no cooking."
}
API rules

reject invalid input

return clear error messages

never invent unavailable ingredients

always prefer stable behavior over creativity

12. UI Requirements

The UI must stay minimal.

Required elements

ingredient text input

time selector

energy selector

cooking willingness selector

submit button

result card

UX rules

user must understand flow in less than 10 seconds

no clutter

no multiple result cards

no advanced settings

13. Validation Rules

Before the engine runs:

ingredient list must not be empty

values must match allowed enums

strings should be trimmed and normalized to lowercase

If ingredient list is too weak:

still return a minimal fallback if possible

14. Testing Requirements

At minimum, test:

no-cook + low energy

minimal ingredients

cooking allowed + 10 or 20 min

invalid input

fallback behavior

The most important thing to test is:

the engine never returns nonsense

the engine never returns more than one suggestion

15. Deployment Plan
First deployment target

Vercel

Reason

easiest deploy path for Next.js

fast iteration

no server management

Not needed now

Dokploy

Docker

Kubernetes

custom VPS

16. Technical Non-Goals

The MVP must NOT include:

authentication

database

user history

image upload processing

AI model integration

external food APIs

admin panel

payment system

17. Future Technical Expansion (NOT NOW)

Possible later additions:

image upload

ingredient detection from fridge photo

user preferences storage

profile-based suggestions

analytics

AI phrasing layer

subscription system

These are explicitly out of scope for version 1.

18. Build Principle

The system should be:

small

readable

deterministic

easy to modify

If a technical choice makes the project heavier without improving MVP validation, reject it.

19. Final Technical Rule

Version 1 proves this only:

Can the system produce one useful food decision from a small set of user inputs?

>>>>>>> 4736e626c9ed31bc58a496a2f597f218b6d33e36
Everything else is secondary.