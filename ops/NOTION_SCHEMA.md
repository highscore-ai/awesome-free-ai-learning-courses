# HighScore Notion Operating Schema v0.1

Notion is the live operational system of record for HS Operator. GitHub remains canonical for production code/data.

Create these six databases first. Avoid adding more until the workflow proves a need.

## 1. Signals

Purpose: normalized external/internal evidence before it becomes a product decision.

Recommended properties:

- **Title** — title
- **Status** — New / Triaged / Watching / Promoted / Archived
- **Observed At** — date/time
- **Source Type** — X / Grok / Official / GitHub / Manual / Analytics / Feedback / Other
- **Source URL** — URL
- **Provider / Entity** — text or relation later
- **Signal Type** — Course Launch / Course Update / Product Launch / Ecosystem Trend / User Feedback / Metric Change / Content Opportunity / Other
- **HS Area** — Role / Map / Discover / Guide / Apply / Platform / Growth / Other
- **Novelty** — 1-5
- **Relevance** — 1-5
- **Confidence** — Low / Medium / High
- **Recommended Action** — Ignore / Watch / Knowledge Update / Catalog Update / Capability Update / Guide Update / Product Experiment / Product Feature / Content Opportunity
- **Reason** — text
- **Product Decisions** — relation to Product Decisions

## 2. Product Decisions

Purpose: canonical record of what Product decided and why.

Recommended properties:

- **Decision** — title
- **Status** — Candidate / Researching / Proposed / Approved / Rejected / Measuring / Closed
- **Product Area** — select
- **Priority** — P0 / P1 / P2 / P3
- **Confidence** — Low / Medium / High
- **Problem / Opportunity** — text
- **Decision Summary** — text
- **Expected User Outcome** — text
- **Success Metric** — text
- **Risks / Assumptions** — text
- **Next Review** — date
- **Signals** — relation to Signals
- **Projects** — relation to Projects
- **Releases** — relation to Releases
- **Metrics** — relation to Metrics

## 3. Projects

Purpose: initiatives/milestones that deliver approved product outcomes.

Recommended properties:

- **Project** — title
- **Status** — Proposed / Active / Blocked / Complete / Cancelled
- **Priority** — P0 / P1 / P2 / P3
- **Outcome** — text
- **Start** — date
- **Target** — date
- **Product Decisions** — relation to Product Decisions
- **Tasks** — relation to Tasks
- **Blockers / Risks** — text

## 4. Tasks

Purpose: executable delivery work.

Recommended properties:

- **Task** — title
- **Status** — Backlog / Planned / Ready for Dev / In Progress / In Review / Blocked / Done / Cancelled
- **Priority** — P0 / P1 / P2 / P3
- **Goal** — text
- **Acceptance Criteria** — text
- **Dependencies** — text or self-relation later
- **Owner / Runtime** — Human / Product Agent / Project Agent / Codex / Other
- **Repository** — URL or text
- **GitHub Issue / PR** — URL
- **Project** — relation to Projects
- **Product Decision** — relation to Product Decisions
- **Release** — relation to Releases

## 5. Releases

Purpose: verified record of shipped product/data changes.

Recommended properties:

- **Release** — title
- **Date** — date
- **Status** — Shipped / Partially Shipped / Rolled Back
- **What Shipped** — text
- **User Impact** — text
- **Validation** — text
- **GitHub Evidence** — URL
- **Measurement Plan** — text
- **Tasks** — relation to Tasks
- **Product Decision** — relation to Product Decisions
- **Metrics** — relation to Metrics

## 6. Metrics

Purpose: product evidence used to judge outcomes, not a full analytics warehouse.

Recommended properties:

- **Metric Snapshot** — title
- **Date** — date
- **Metric** — text/select
- **Value** — number
- **Unit** — text
- **Window** — Daily / Weekly / Monthly / Experiment / Other
- **Source** — text/URL
- **Interpretation** — text
- **Product Decision** — relation to Product Decisions
- **Release** — relation to Releases

## Initial product metrics

Do not over-instrument v0.1. Start with metrics that answer whether users move through the HighScore learning journey.

Candidate north-star concept:

**Qualified Learning Actions** — meaningful actions showing a user moved from exploration toward learning/action, such as reaching a relevant course/Guide from Role/Map context.

Supporting categories:

- Acquisition — visitors / organic traffic
- Activation — users reaching a course or Guide
- Engagement — role selection / capability-map exploration
- Learning — external-course clicks / Guide starts
- Retention — return usage when available
- Quality — broken/stale resource rate
- Freshness — percentage of catalog recently verified
- Distribution — X/LinkedIn -> HS qualified visits

Product owns the exact metric definition and should revise it as instrumentation improves.

## Key views

Create these views first:

### Signals
- New / Needs Triage
- Watching
- Promoted This Week

### Product Decisions
- Needs Decision
- Approved
- Measuring
- Rejected / Not Priority

### Projects
- Active
- Blocked

### Tasks
- Ready for Dev
- In Progress / In Review
- Blocked
- Done This Week

### Releases
- Recent Releases
- Needs Measurement

### Metrics
- This Week
- By Product Decision

## Source-of-truth rule

Notion may reference production course/capability records, but should not become a second editable canonical copy of the full production dataset. The production dataset lives in GitHub.