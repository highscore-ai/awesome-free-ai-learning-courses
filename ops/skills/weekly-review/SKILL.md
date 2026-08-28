---
name: weekly-review
description: "Close the HighScore operating week by reviewing delivery, product metrics, market signals, blockers, and unfinished work, then establish next-week product and project priorities."
---

# Weekly Review

## Goal

Close the loop between what HighScore intended to do, what actually shipped, what users/metrics showed, and what should matter next week.

## Trigger

Run:
- at week close, or
- before the first daily operating cycle of a new week when the prior week has not been reviewed.

## Inputs

- Product Decisions created/changed during the week
- meaningful Signals from the week
- Projects and Tasks
- GitHub merged/open work
- Releases
- product Metrics
- blockers and unresolved decisions

## Procedure

### 1. Delivery review

Summarize:
- planned vs completed work
- releases shipped
- work still in review
- blocked work
- cancelled/dropped work

For unfinished work, identify why it slipped rather than automatically carrying it forward.

### 2. Product outcome review

For important shipped work:
- restate intended user outcome
- review available success metric/evidence
- classify as `Positive`, `Neutral`, `Negative`, or `Too Early / Missing Data`
- recommend Continue, Iterate, Roll Back/Stop, or Measure Longer

### 3. Signal synthesis

Do not list every signal. Identify only patterns or developments that could change HighScore priorities, catalog/capability coverage, or product positioning.

### 4. Product priority setting

Product chooses a short set of next-week priorities. For each priority include:
- outcome
- why now
- expected metric/evidence

Also include `Not Priority` items when there is likely scope pressure.

### 5. Project planning

Project converts approved priorities into:
- milestones where needed
- tasks
- dependencies
- initial priority order
- Ready-for-Dev candidates

### 6. Carry-forward

Carry unfinished work only if it still supports current priorities. Otherwise cancel, archive, or return to backlog with an explicit reason.

## Output

```text
HS WEEKLY REVIEW — YYYY-Www

OUTCOMES
- ...

SHIPPED
- ...

METRICS / USER EVIDENCE
- ...

MARKET / LEARNING SIGNALS
- ...

WHAT SLIPPED AND WHY
- ...

NEXT WEEK PRODUCT PRIORITIES
1. ...
2. ...
3. ...

NOT PRIORITY
- ...

PROJECT PLAN
- ...

READY FOR DEV
- ...

DECISIONS NEEDED
- ...
```

## Rules

- Do not confuse amount of work completed with product progress.
- Do not invent metric movement when analytics are unavailable.
- Keep next-week priorities intentionally small enough to guide tradeoffs.
- Surface recurring operational friction as a system problem when it repeats across weeks.