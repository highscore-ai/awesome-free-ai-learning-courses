---
name: product-scan
description: "Collect, verify, normalize, deduplicate, and score new HighScore product signals from X/Grok, official sources, GitHub, analytics, feedback, and manual inbox items."
---

# Product Scan

## Goal

Turn noisy external/internal inputs into a small set of structured, evidence-backed signals for Product review.

## Inputs

Use whatever sources are available for the run:

- X/Grok monitoring output
- official vendor announcements
- university / educational-provider updates
- AI creator/KOL posts
- relevant GitHub developments
- manual URLs, screenshots, notes, or ideas
- HighScore analytics and user feedback

## Procedure

1. Collect new items since the previous scan when a prior timestamp/state exists.
2. Prefer original/official sources over reposts or commentary.
3. Verify material claims before promotion.
4. Check whether the item already exists in Signals, Product Decisions, or the HighScore production dataset when those sources are available.
5. Normalize each retained item.
6. Deduplicate semantically equivalent items.
7. Score relevance and confidence.
8. Recommend one primary next action.

## Signal schema

For each retained signal capture:

- **Title**
- **Observed at**
- **Source type** — X, Grok, Official, GitHub, Manual, Analytics, Feedback, Other
- **Source URL / evidence**
- **Provider / entity**
- **Signal type** — Course Launch, Course Update, Product Launch, Ecosystem Trend, User Feedback, Metric Change, Content Opportunity, Other
- **Related HS area** — Role, Map, Discover, Guide, Apply, Platform, Growth, Other
- **Novelty** — 1-5
- **HS relevance** — 1-5
- **Confidence** — Low / Medium / High
- **Recommended action**
- **Reason** — concise explanation of why it matters or why it should be ignored

## Recommended actions

- Ignore
- Watch
- Knowledge Update
- Catalog Update
- Capability Update
- Guide Update
- Product Experiment
- Product Feature
- Content Opportunity

## Output rules

- Do not produce a long generic news digest.
- Keep ignored/noise items out of the main Product brief unless useful to explain a pattern.
- Never treat popularity alone as proof of relevance.
- If verification is incomplete, set confidence accordingly and recommend `Watch` or further research.
- When Notion is available, write/update the normalized signal record there. Otherwise return structured output without pretending it was stored.