# HighScore Agent Guide

HighScore uses the **HS Operator** workflow for product, project, and development work.

## Start here

Before planning or executing operational work, read:

1. [`ops/HS_OPERATOR.md`](ops/HS_OPERATOR.md) — lifecycle, routing, gates, and source-of-truth rules.
2. The relevant role definition in [`ops/roles/`](ops/roles/).
3. The relevant procedure in [`ops/skills/`](ops/skills/).

## Operating principles

- **Notion is the operational system of record** for signals, product decisions, projects, tasks, releases, and metrics.
- **GitHub is the product delivery system of record** for source code, production datasets, configuration, assets, issues/PRs, and shipped implementation history.
- Do not create parallel canonical copies of production course/capability data in Notion.
- Product decides **why/what**. Project decides **when/how to deliver**. Dev builds approved work.
- Development work should normally begin only when a task is marked **Ready for Dev** or when the user explicitly asks for immediate implementation.
- Never turn a market signal directly into code. Route it through Product Decision first unless the user explicitly overrides the workflow.
- Public publishing and major product-direction changes require human approval in v0.1.

## Roles

- Product work → [`ops/roles/product-manager.md`](ops/roles/product-manager.md)
- Project/delivery work → [`ops/roles/project-manager.md`](ops/roles/project-manager.md)
- Coding/repository work → [`ops/roles/developer.md`](ops/roles/developer.md)

## Common procedures

- Daily signal scan → [`ops/skills/product-scan/SKILL.md`](ops/skills/product-scan/SKILL.md)
- Product decision review → [`ops/skills/product-review/SKILL.md`](ops/skills/product-review/SKILL.md)
- Project/task reconciliation → [`ops/skills/project-sync/SKILL.md`](ops/skills/project-sync/SKILL.md)
- Weekly operating review → [`ops/skills/weekly-review/SKILL.md`](ops/skills/weekly-review/SKILL.md)
- Development execution → [`ops/skills/dev-task/SKILL.md`](ops/skills/dev-task/SKILL.md)
- Release reconciliation → [`ops/skills/release-sync/SKILL.md`](ops/skills/release-sync/SKILL.md)

If the live Notion state is unavailable, do not invent it. Work from the data actually accessible and clearly flag missing operational state.