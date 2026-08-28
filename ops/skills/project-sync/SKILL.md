---
name: project-sync
description: "Translate approved HighScore product decisions into projects/tasks, reconcile delivery state with GitHub, surface blockers, and maintain a trustworthy Ready-for-Dev queue."
---

# Project Sync

## Goal

Keep operational delivery state aligned with approved product intent and actual GitHub progress.

## Inputs

- approved Product Decisions
- active Projects
- open Tasks
- GitHub issues / branches / PRs / CI / merged changes
- release state

## Procedure

1. Find approved Product Decisions that require delivery but have no project/task representation.
2. Create or update the smallest useful project/milestone/task structure.
3. Reconcile existing task status with GitHub evidence.
4. Identify stale, duplicate, blocked, or no-longer-relevant work.
5. Check each candidate task against Definition of Ready.
6. Promote only eligible work to `Ready for Dev`.
7. Build a prioritized delivery plan.

## Definition of Ready checklist

A task needs:

- [ ] clear goal
- [ ] linked product intent / decision
- [ ] enough context
- [ ] acceptance criteria / Definition of Done
- [ ] priority
- [ ] dependencies resolved or documented
- [ ] target repository / area when applicable

If any critical item is missing, keep it `Planned` or `Blocked` and state what is needed.

## GitHub reconciliation guidance

Use evidence rather than assumptions:

- no branch/PR and no delivery evidence -> do not infer In Progress
- active implementation branch/explicit developer work -> In Progress
- open PR awaiting review/CI -> In Review
- dependency or unresolved decision prevents progress -> Blocked
- merged code alone does not prove production deployment when deployment is a separate condition
- mark Done only when the task's Definition of Done is satisfied

## Daily delivery output

```text
P0
- ...

P1
- ...

P2
- ...

READY FOR DEV
- ...

BLOCKED
- <task> — <blocker / owner / next action>

STATE CORRECTIONS
- <what changed because GitHub reality differed from Notion>
```

## Rules

- Do not carry every unfinished item forward indefinitely.
- Do not split work into tiny administrative tasks unless it improves execution clarity.
- Do not create technical implementation decisions that require Dev inspection; state the outcome/acceptance criteria instead.
- Route ambiguous product requirements back to Product.