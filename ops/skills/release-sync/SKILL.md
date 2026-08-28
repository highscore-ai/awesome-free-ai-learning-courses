---
name: release-sync
description: "Reconcile merged or deployed HighScore work into operational release state, verify what actually shipped, close eligible tasks, and define the post-release measurement follow-up."
---

# Release Sync

## Goal

Close the delivery loop after implementation by recording what actually shipped and what Product should measure next.

## Inputs

- merged PRs / commits
- deployment evidence when deployment is separate
- related Project / Tasks
- linked Product Decision
- acceptance criteria

## Procedure

1. Verify the implementation event: merged, deployed, or production-data update.
2. Identify the related operational tasks and Product Decision.
3. Check the task Definition of Done against evidence.
4. Mark tasks `Done` only when the required delivery condition is satisfied; otherwise keep `In Review` or `In Progress` and state what remains.
5. Create/update a Release record with concise user/product impact.
6. Identify the success metric or evidence Product should monitor.
7. Move the related Product Decision to `Measuring` when appropriate.

## Release record template

```text
Release: <title>
Date: <date>
Related decision: <link/id>
Related tasks: <links/ids>
GitHub evidence: <PR/commit/deployment>
What shipped: <concise summary>
User impact: <expected observable change>
Validation: <checks performed>
Measurement: <metric/evidence + review window>
Status: Shipped | Partially Shipped | Rolled Back
```

## Rules

- A merged PR is not automatically a deployment.
- A production data edit must still satisfy source/schema validation.
- Do not close the product loop at `Shipped`; specify measurement when the decision had an expected outcome.
- If the release differs materially from approved scope, flag the variance to Project and Product.