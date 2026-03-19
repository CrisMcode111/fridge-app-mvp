<<<<<<< HEAD
# MVP RULES — STRICT EXECUTION

## 1. Core Principle

This is a STRICT MVP.

The goal is NOT to build a full application.  
The goal is to validate ONE behavior:

> The system returns ONE useful food suggestion that the user can execute immediately.

Any deviation from this is considered a failure.

---

## 2. Absolute Product Rules

The system MUST:

- return exactly ONE suggestion
- optionally return ONE fallback (only if needed)
- prioritize simplicity over creativity
- use only available ingredients
- produce immediately actionable output

The system MUST NOT:

- return multiple suggestions
- generate lists of recipes
- suggest unavailable ingredients
- produce long explanations
- add extra features

---

## 3. Scope Protection

Do NOT implement:

- authentication
- database
- user accounts
- history
- preferences
- image recognition
- AI integrations
- external APIs
- advanced UI features
- optimization features

If a feature is not explicitly defined in PRODUCT_PLAN.md, it is forbidden.

---

## 4. Architecture Rules

- Use Next.js App Router
- Use TypeScript strictly
- Keep all logic modular and isolated
- Do NOT mix UI and decision logic

Decision logic must be inside:

```text
src/lib/decision-engine.ts

5. Decision Engine Rules

The engine must:

prefer no-cook solutions when cookingWillingness = "no"

prefer minimal actions when energyLevel = "low"

prefer fastest solution when timeMinutes = 5

only use available ingredients

always return ONE suggestion

Fallback rules:

only used if no valid suggestion is possible

must remain simple

must still use available ingredients if possible

6. Simplicity Over Intelligence

When in doubt:

choose simpler logic over complex logic

choose deterministic rules over AI

choose stability over creativity

DO NOT attempt to be “smart”.
Attempt to be “reliable”.

7. Output Constraints

Valid output:

{
  "suggestion": "Take yogurt and apple. Mix and eat.",
  "fallback": "Eat the apple alone.",
  "reasoning": "Fast and no cooking."
}

Invalid output examples:

multiple suggestions

paragraphs

recipes with steps

abstract ideas

missing ingredients

8. UI Rules

The UI must:

be minimal

be understandable in less than 10 seconds

contain only required inputs

The UI must NOT:

display multiple results

contain advanced filters

contain settings panels

contain unnecessary components

9. Code Quality Rules

use TypeScript types everywhere

no unused variables

no console logs in final code

no duplicated logic

keep functions small and readable

10. File Discipline

Each file must have a single responsibility.

Examples:

decision logic → decision-engine.ts

ingredient utilities → ingredient-utils.ts

fallback logic → fallback-rules.ts

Do NOT create large monolithic files.

11. No Over-Engineering

Do NOT introduce:

design patterns that are not needed

abstractions without clear purpose

premature optimization

complex state management

If something works simply, keep it simple.

12. Error Handling Rules

validate all inputs

return clear error messages

never crash the API

always return a safe fallback when possible

13. Testing Rules

At minimum, ensure:

one suggestion is always returned

suggestion is valid and executable

no invalid ingredients are used

fallback works when needed

14. Forbidden Behaviors

The system must NEVER:

invent ingredients

return empty suggestion

return more than one suggestion

output complex cooking processes

ignore user constraints

15. Execution Rule for Cursor

When generating code:

strictly follow PRODUCT_PLAN.md

strictly follow TECH_PLAN.md

do not expand scope

do not add features “for improvement”

If unsure:
→ choose the simplest possible implementation.

16. Final Rule

This is not a food app.

This is a decision engine.

Success = less thinking for the user.

=======
# MVP RULES — STRICT EXECUTION

## 1. Core Principle

This is a STRICT MVP.

The goal is NOT to build a full application.  
The goal is to validate ONE behavior:

> The system returns ONE useful food suggestion that the user can execute immediately.

Any deviation from this is considered a failure.

---

## 2. Absolute Product Rules

The system MUST:

- return exactly ONE suggestion
- optionally return ONE fallback (only if needed)
- prioritize simplicity over creativity
- use only available ingredients
- produce immediately actionable output

The system MUST NOT:

- return multiple suggestions
- generate lists of recipes
- suggest unavailable ingredients
- produce long explanations
- add extra features

---

## 3. Scope Protection

Do NOT implement:

- authentication
- database
- user accounts
- history
- preferences
- image recognition
- AI integrations
- external APIs
- advanced UI features
- optimization features

If a feature is not explicitly defined in PRODUCT_PLAN.md, it is forbidden.

---

## 4. Architecture Rules

- Use Next.js App Router
- Use TypeScript strictly
- Keep all logic modular and isolated
- Do NOT mix UI and decision logic

Decision logic must be inside:

```text
src/lib/decision-engine.ts

5. Decision Engine Rules

The engine must:

prefer no-cook solutions when cookingWillingness = "no"

prefer minimal actions when energyLevel = "low"

prefer fastest solution when timeMinutes = 5

only use available ingredients

always return ONE suggestion

Fallback rules:

only used if no valid suggestion is possible

must remain simple

must still use available ingredients if possible

6. Simplicity Over Intelligence

When in doubt:

choose simpler logic over complex logic

choose deterministic rules over AI

choose stability over creativity

DO NOT attempt to be “smart”.
Attempt to be “reliable”.

7. Output Constraints

Valid output:

{
  "suggestion": "Take yogurt and apple. Mix and eat.",
  "fallback": "Eat the apple alone.",
  "reasoning": "Fast and no cooking."
}

Invalid output examples:

multiple suggestions

paragraphs

recipes with steps

abstract ideas

missing ingredients

8. UI Rules

The UI must:

be minimal

be understandable in less than 10 seconds

contain only required inputs

The UI must NOT:

display multiple results

contain advanced filters

contain settings panels

contain unnecessary components

9. Code Quality Rules

use TypeScript types everywhere

no unused variables

no console logs in final code

no duplicated logic

keep functions small and readable

10. File Discipline

Each file must have a single responsibility.

Examples:

decision logic → decision-engine.ts

ingredient utilities → ingredient-utils.ts

fallback logic → fallback-rules.ts

Do NOT create large monolithic files.

11. No Over-Engineering

Do NOT introduce:

design patterns that are not needed

abstractions without clear purpose

premature optimization

complex state management

If something works simply, keep it simple.

12. Error Handling Rules

validate all inputs

return clear error messages

never crash the API

always return a safe fallback when possible

13. Testing Rules

At minimum, ensure:

one suggestion is always returned

suggestion is valid and executable

no invalid ingredients are used

fallback works when needed

14. Forbidden Behaviors

The system must NEVER:

invent ingredients

return empty suggestion

return more than one suggestion

output complex cooking processes

ignore user constraints

15. Execution Rule for Cursor

When generating code:

strictly follow PRODUCT_PLAN.md

strictly follow TECH_PLAN.md

do not expand scope

do not add features “for improvement”

If unsure:
→ choose the simplest possible implementation.

16. Final Rule

This is not a food app.

This is a decision engine.

Success = less thinking for the user.

>>>>>>> 4736e626c9ed31bc58a496a2f597f218b6d33e36
Failure = more options for the user.