# HS Operator v0.1

HS Operator is the workflow specification for HighScore's AI operating team. It is not a fourth employee role and it is not tied to one runtime. ChatGPT, Codex, or future automation code may execute parts of this workflow.

## Purpose

Turn external signals and internal product evidence into deliberate product decisions, executable project work, shipped software/data changes, and measurable outcomes.

```text
Signals -> Product Decision -> Project/Task -> Ready for Dev -> Build -> Release -> Metrics -> Product Review
```

## Systems of record

### Notion — operational state

Canonical for:
- Signals
- Product Decisions
- Projects
- Tasks
- Releases
- Metrics

### GitHub — product delivery state

Canonical for:
- Source code
- Course/capability/curriculum production data
- Assets and configuration
- Issues and pull requests
- Implementation and release history

Do not keep a second canonical production dataset in Notion.

## Roles and boundaries

### Product Manager — WHY / WHAT

Owns product direction, opportunity assessment, prioritization, product requirements, learning-system quality, success metrics, and post-release interpretation.

May recommend: Ignore, Watch, Knowledge Update, Catalog Update, Capability Update, Guide Update, Product Experiment, Product Feature, Content Opportunity.

Does not write implementation plans or production code as part of the Product role.

### Project Manager — WHEN / HOW TO DELIVER

Owns initiatives, milestones, task decomposition, sequencing, dependencies, blockers, status, delivery risk, Definition of Ready, and Definition of Done.

Does not redefine product strategy without routing the question back to Product.

### Developer — BUILD

Owns repository inspection, implementation, tests, validation, branch/PR work, and technical delivery notes.

Normally starts only from an approved task marked `Ready for Dev` or an explicit user instruction to implement immediately.

## Lifecycle states

### Signal

Recommended states:
- New
- Triaged
- Watching
- Promoted
- Archived

### Product Decision

Recommended states:
- Candidate
- Researching
- Proposed
- Approved
- Rejected
- Measuring
- Closed

### Task

Recommended states:
- Backlog
- Planned
- Ready for Dev
- In Progress
- In Review
- Blocked
- Done
- Cancelled

## Daily workflow

Run in this order when performing a complete HS daily cycle.

### 0. Preflight

1. Read the latest operational state from Notion when available.
2. Check whether a weekly/monthly/quarterly boundary review is due.
3. If a required review is missing, run it before generating the current daily plan.
4. Read relevant GitHub delivery state for active work.

Do not silently skip a due review because it is inconvenient. If a dependency is unavailable, record a flag and continue with the rest of the cycle.

### 1. Collect and normalize signals

Use `product-scan`.

Sources can include:
- X/Grok monitoring
- official AI vendor announcements
- university and educational-provider releases
- creator/KOL sources
- GitHub ecosystem developments
- manually saved URLs, notes, screenshots, or ideas
- HighScore analytics and user feedback when available

Every useful signal should have a source URL/evidence, type, provider/entity, relevance, confidence, related HighScore area, and recommended next action.

### 2. Product review

Use `product-review`.

Product converts selected signals and product evidence into decisions. A daily product brief should emphasize decisions and implications, not a generic news summary.

Expected output:
- important signals
- decisions/recommendations
- metric implications
- content opportunities
- watch items
- decisions requiring human approval

### 3. Project sync

Use `project-sync`.

Translate approved Product Decisions into projects/tasks. Reconcile active work with GitHub reality. Surface blockers and build a prioritized delivery plan.

A task may become `Ready for Dev` only when it has:
- clear goal
- sufficient context
- acceptance criteria / Definition of Done
- dependencies resolved or explicitly recorded
- priority

### 4. Development queue

For each approved `Ready for Dev` task, use `dev-task`.

In v0.1, human-supervised Codex execution is preferred. Do not automatically dispatch all tasks simply because they are technically ready.

### 5. Release sync

After a PR merge, deployment, or production data update, use `release-sync` to reconcile GitHub delivery state back into the operational system and identify what should be measured.

### 6. Daily briefing

Produce one concise operational brief:

```text
HS DAILY — YYYY-MM-DD

PRODUCT
- highest-value signals
- decisions/recommendations

PROJECT
- active priorities
- blockers / delivery risks

DEV
- Ready for Dev
- In Progress / In Review

SHIPPED
- releases since last brief

METRICS
- material movement or missing measurements

DECISIONS NEEDED
- human approvals or unresolved product questions
```

## Weekly workflow

Use `weekly-review` on the first operating cycle of a new week, or explicitly at week close.

Order:
1. Review what shipped and what did not.
2. Review product metrics and user/product evidence.
3. Synthesize the week's meaningful market signals.
4. Product chooses next-week priorities and non-priorities.
5. Project converts priorities into milestones/tasks.
6. Carry forward only still-relevant unfinished work.
7. Rebuild the `Ready for Dev` queue.

The weekly output should make tradeoffs explicit. Include a `Not Priority` section when useful to prevent scope creep.

## Monthly and quarterly boundaries

Monthly review:
- trend in core metrics
- catalog/content freshness and quality
- experiments and major releases
- repeated operational bottlenecks

Quarterly review:
- progress against product outcomes
- whether the HighScore product model still matches user needs
- major bets to continue, stop, or start
- next-quarter product outcomes and measurable targets

## Human approval gates — v0.1

Require human approval for:
- major product-direction changes
- destructive or high-impact production actions
- production release when normal repository/release policy requires approval
- public posting to X, LinkedIn, or other social channels

May be automated after confidence is established:
- signal ingestion
- normalization and deduplication
- source verification
- daily/weekly synthesis
- task/status reconciliation
- low-risk metadata changes with validation

## Automation priority

### P0 — establish memory and decision flow
1. Notion Signal Inbox
2. X/Grok/manual signal ingestion
3. signal normalization + deduplication
4. daily Product brief
5. daily Project sync

### P1 — close strategy-to-execution loop
1. Product Decision -> Project/Task
2. Project -> Ready for Dev validation
3. GitHub -> Notion status reconciliation
4. weekly Product review
5. weekly Project review

### P2 — automate development/release loop
1. approved Ready-for-Dev dispatch to Codex
2. PR/status sync
3. deployment -> Release record
4. analytics -> Metrics

### P3 — content pipeline
1. extract content candidates
2. draft X/LinkedIn content
3. HyperFrames conversion
4. human review queue

### P4 — autonomous publishing
Only after the preceding loops are reliable.

## Failure handling

- Never fabricate unavailable Notion/GitHub/X state.
- Continue partial workflows when a non-critical source is unavailable; record the gap.
- Do not promote a low-confidence external claim to a Product Decision without verification.
- Do not let a single trend override current product priorities without explicit Product reasoning.

## Future runtime

This Markdown is the canonical human-readable workflow specification. When unattended automation is justified, implement deterministic orchestration in a small `operator.ts` or `operator.py` service that reads Notion state, invokes the appropriate agent/runtime, and writes results back. The code should implement this workflow rather than replace it.