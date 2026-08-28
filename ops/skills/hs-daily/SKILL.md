---
name: hs-daily
description: "Run HighScore's daily operating cycle: preflight overdue reviews, scan/normalize signals, make product recommendations, reconcile project delivery, surface the Dev queue, releases, metrics, and decisions needed."
---

# HS Daily

## Goal

Run one complete HighScore operating cycle and produce a concise decision-oriented daily briefing.

This is the primary orchestration skill. It composes other HS skills; it is not a separate employee role.

## Preflight

Before scanning today's inputs:

1. Read `ops/HS_OPERATOR.md`.
2. Read current Notion operational state when available.
3. Find the latest completed daily/weekly/monthly/quarterly operating reviews.
4. If the prior week has not been reviewed and the current run is in a new week, run `weekly-review` first.
5. If a required monthly or quarterly review is missing, flag it and complete the review before allowing it to silently disappear from planning. If the current runtime cannot perform that review, include a prominent flag rather than inventing completion.
6. Read current GitHub state relevant to active projects/tasks.

## Daily sequence

Run in order:

### 1. Product Scan
Use `../product-scan/SKILL.md`.

Collect and normalize new X/Grok/manual/official/GitHub/analytics/user signals. Deduplicate against existing state.

### 2. Product Review
Use `../product-review/SKILL.md`.

Convert meaningful signals and current metrics into decisions/recommendations. Define expected outcome and metric for delivery work.

### 3. Project Sync
Use `../project-sync/SKILL.md`.

Translate approved Product Decisions into delivery work and reconcile project/task status with GitHub reality. Build the Ready-for-Dev queue.

### 4. Dev Queue
Do not automatically implement every ready task in v0.1.

Surface:
- Ready for Dev
- In Progress
- In Review
- Blocked

If the user explicitly requests implementation, execute the selected task with `../dev-task/SKILL.md`.

### 5. Release Sync
For newly merged/deployed work, use `../release-sync/SKILL.md`.

Ensure shipped work links back to its Product Decision and measurement plan.

### 6. Metrics
Review available metrics relevant to open `Measuring` Product Decisions. Do not invent unavailable analytics. Flag missing instrumentation when it prevents a useful product conclusion.

## Daily briefing format

```text
HS DAILY — YYYY-MM-DD

PRODUCT
- 1-3 important signals / product implications
- decisions or recommendations

PROJECT
- current highest-priority delivery items
- blockers / risks

DEV
- Ready for Dev
- In Progress / In Review

SHIPPED
- verified releases since the prior cycle

METRICS
- meaningful movement, learning, or missing measurement

WATCH
- items not yet worth acting on

DECISIONS NEEDED
- human approvals / unresolved product choices
```

## Quality bar

A good HS Daily run:

- filters more information than it surfaces
- produces decisions, not just summaries
- preserves Product -> Project -> Dev boundaries
- reflects actual GitHub state
- clearly distinguishes verified facts, recommendations, and missing data
- leaves the Ready-for-Dev queue more trustworthy than before the run