

# Fridge App MVP

## Overview

Fridge App MVP is a simple decision engine that helps a user decide what to eat based on available ingredients and context.

The system takes:

* ingredients
* time available
* energy level
* willingness to cook
* personality mode (fast / healthy / comfort)

and returns:
→ one single suggestion (no list, no overthinking)

---

## Product Vision

The final goal is **not manual input**.

The intended experience is:
→ user takes a photo of their fridge
→ system detects ingredients
→ system suggests what to eat

Current version = logic foundation only (no vision yet).

---

## Architecture

The app is built around 3 layers:

### 1. Decision Engine

Deterministic logic (no AI) that:

* generates possible food options
* scores them based on constraints and context
* selects the best option

Located in:

```
src/lib/decision-engine.ts
```

---

### 2. Output Layer

Transforms the raw decision into a more meaningful experience.

Example:

* decision: "Eat bread"
* output: "Soft comfort plate – grounding and soothing"

Located in:

```
src/lib/engine/buildOutput.ts
```

---

### 3. UI (Next.js)

Simple interface for testing:

* input form
* single result display

Located in:

```
src/app/page.tsx
```

---

## API

Endpoint:

```
POST /api/suggest
```

Handles:

* input validation
* normalization
* calls decision engine
* returns structured result

---

## Current Status

Working:

* end-to-end flow (UI → API → engine → output)
* deterministic decision logic
* basic output layer

Limitations:

* very limited “cooked” logic
* output layer covers only a few cases
* UI is for testing only
* no image recognition

---

## Next Steps

* expand output layer rules (comfort / cooked / light)
* improve cooked combinations logic
* rebuild UI as a clean testing interface
* prepare structure for future image input

---

## Goal

This is not a recipe app.

It is a **decision system** that:

* reduces friction
* avoids overthinking
* turns context into action
