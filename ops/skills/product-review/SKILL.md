---
name: product-review
description: "Turn normalized signals, metrics, user evidence, and release outcomes into HighScore product decisions, priorities, expected outcomes, and measurable success criteria."
---

# Product Review

## Goal

Convert evidence into product decisions. The output should answer what HighScore should do, why, and how success will be measured.

## Inputs

- newly triaged Signals
- open Product Decisions
- relevant HighScore metrics
- recent Releases
- user feedback
- current product priorities

## Procedure

1. Review only signals with material HighScore relevance or meaningful uncertainty worth watching.
2. Group related signals into one product question when possible.
3. Check existing product decisions before creating a new one.
4. For each product question, assess:
   - user value
   - strategic fit
   - urgency
   - evidence quality
   - expected impact
   - cost/complexity when known
   - reversibility
5. Choose a decision/action.
6. Define the expected user outcome and success metric for work that will be delivered.
7. Set priority and confidence.
8. Route approved delivery work to Project.

## Decision template

```text
Decision: <short title>
Status: Proposed | Approved | Rejected | Watch | Measuring
Product area: <area>
Evidence: <links / metrics / feedback>
Problem or opportunity: <why this matters>
Decision: <what HS will do or not do>
Expected user outcome: <change for users>
Success metric: <metric + expected direction/target if known>
Priority: P0 | P1 | P2 | P3
Confidence: Low | Medium | High
Risks/assumptions: <short list>
Next action: <Project / Watch / Measure / Close>
```

## Daily brief output

Keep the daily Product section concise:

- **Important signals** — only items worth attention
- **Decisions / recommendations**
- **Metric implications**
- **Content opportunities**
- **Watch**
- **Human decisions needed**

## Rules

- A new course does not automatically mean `Catalog Update`; check fit, duplication, quality, official status, and coverage gap.
- A hot vendor topic does not automatically mean a feature.
- Separate product value from content/distribution value.
- When evidence is insufficient, prefer a reversible `Watch` or small experiment over a large commitment.
- Explicitly record `Rejected` / `Not Priority` decisions so the same idea is not repeatedly re-proposed without new evidence.