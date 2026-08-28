---
name: dev-task
description: "Execute an approved HighScore development task: inspect the repo, implement only the defined scope, validate the result, and return branch/PR evidence plus blockers or product questions."
---

# Dev Task

## Goal

Deliver one approved HighScore task with minimal scope drift and verifiable implementation evidence.

## Preconditions

Proceed when either:
- the task is `Ready for Dev`, or
- the user explicitly asks for immediate implementation.

If neither is true, do not silently promote the task; return it to Project for readiness review.

## Procedure

1. Read root `AGENTS.md` and relevant task context.
2. Inspect existing files and patterns before editing.
3. Restate the technical plan internally against the acceptance criteria.
4. Implement the smallest coherent change that satisfies the task.
5. Run available relevant checks: tests, build, lint, data validation, or targeted verification.
6. Review changed files for accidental scope expansion.
7. Create/update the branch or PR as appropriate.
8. Return delivery evidence to Project.

## Delivery report

```text
TASK
- <task>

CHANGED
- <file/path> — <what changed>

VALIDATION
- <command/check> — passed/failed/not run + reason

DELIVERY
- branch: ...
- PR: ...

RISKS / FOLLOW-UP
- ...

STATUS RECOMMENDATION
- In Review | Blocked | Done candidate
```

## Product-question rule

If implementation exposes an unresolved choice that changes user behavior, scope, product positioning, learning logic, or success criteria:

1. do not silently decide it as Dev;
2. explain the options and technical implications;
3. route the decision to Product via Project;
4. continue only portions of the task unaffected by the decision when safe.

## Rules

- Never claim a check passed unless it ran successfully.
- Never claim release/deployment unless verified.
- Avoid unrelated refactors.
- Preserve existing repository conventions unless the task explicitly changes them.
- For production dataset updates, verify source/evidence and schema consistency.