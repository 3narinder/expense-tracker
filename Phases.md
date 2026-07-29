# ExpenseAI Development Phases

> This file previously described Phase 1 as "Multi-Account Support" as if not yet built. A codebase scan shows accounts, transactions, categories, budgets, dashboard, and AI insights are already implemented (see `STATUS.md`). This version replaces that with what's actually true, plus the plan going forward.

## Phase 1 — Core expense tracking ✅ Done

The foundation already built and running across `server/`, `client/`, `web/`, and `mobile/`:

- Auth (register/login/logout, JWT cookie sessions)
- Financial accounts (bank, credit, cash, investment) with balance and currency
- Transactions (income/expense, recurring, bulk delete, CSV export, trend views)
- Categories (hierarchical, auto-categorization by merchant keyword)
- Budgets (multi-category, weekly/monthly/quarterly periods, alert thresholds)
- Dashboard (month summary, trends, category breakdown)
- AI-generated insights (monthly summary, savings tips, budget alerts) with plan-gated eligibility
- Marketing landing page (`web/`)
- Mobile app scaffold with core screens (`mobile/`)

Full detail: `PRD.md` (Phase 1 section), `ARCHITECTURE.md` (models/API), `STATUS.md` (per-module status).

---

## Phase 2 — Payments & personal/business accounts (next)

### 1. Payment integration

**Objective**: Monetize via paid plans. The `User.aiInsightPlan` field (`basic`/`personal`/`premium`) already anticipates tiering — this phase adds real billing behind it.

**Likely scope**:

- Payment provider integration (Stripe is the common default — confirm before building)
- Subscription lifecycle: create, upgrade/downgrade, cancel, prorated billing
- Payment method management, invoice history
- Webhook handling for payment events
- Plan-gated feature checks reusing the existing `aiInsightPlan`-style pattern

**New data needed**: subscription record, payment method record, invoice record, and a plans table/config — see `ARCHITECTURE.md` for how these should relate to the existing `User` model.

### 2. Personal / business accounts (per user)

**Objective**: Let a user separate their personal finances from a small business, as its own workspace-level concept.

**Important — do not confuse with the existing `Account` model.** `server/models/AccountSchema.js` already represents financial accounts (bank/credit/cash/investment) used to attribute transactions. This feature is a different, higher-level concept: which "profile" (personal vs. business) a user is currently operating in.

**Open design decision (resolve before building — see `ARCHITECTURE.md`)**:

- **Option A — tag on shared data**: add a `profileType` field to transactions/budgets/categories, filter by it. Simple, but doesn't scale to true separation (e.g. can't easily support a business having multiple team members later).
- **Option B — separate workspace model**: a `Workspace` (or `Profile`) document that `Transaction`/`Budget`/`Category`/`Account` all reference, in addition to `userId`. More flexible, more migration work.

**Likely scope once decided**:

- Profile creation/switching UI (personal/business selector)
- Scoping all existing queries (transactions, budgets, categories, accounts, dashboard, insights) to the active profile
- Migration path for existing users' data into a default "personal" profile

**Priority**: High
**Estimated effort**: Medium (payments), Medium–High (profile separation, depending on Option A vs B)

---

## Phase 3 — Not yet decided

No commitment yet on what comes after Phase 2. Reasonable directions to consider, roughly in order of how naturally they follow from Phase 1 + 2:

1. **Advanced analytics & reporting** — custom date-range reports, budget-vs-actual, income vs. expense breakdown, PDF/CSV export, scheduled email reports, net worth over time. Natural next step since the data model (transactions/budgets/categories) already supports richer aggregation than the current dashboard exposes.
2. **Bank sync** (e.g. via Plaid) — auto-import transactions instead of manual entry. High value, but adds real compliance/security surface area; probably sequenced after payments are stable.
3. **Receipt scanning / OCR** — photo-to-transaction, reduces manual entry friction, pairs well with the mobile app.
4. **Shared/family budgeting** — natural extension of the Phase 2 workspace concept if Option B (separate workspace model) is chosen; a "business" workspace with multiple members isn't far from a "family" workspace.
5. **Predictive spending / goal-based savings** — leans on the existing AI insight infrastructure (`Insight` model, health score) rather than requiring new infrastructure.
6. **Mobile parity** — closing the gap noted in `STATUS.md` (some mobile screens still on mock data) so the mobile app has full feature parity with `client/`.
7. **Third-party API / integrations** — lowest priority until the core product and monetization are proven.

Pick and scope this phase once Phase 2 ships and usage data (or user feedback) points to which of the above matters most.

---

## Notes for AI agents

- Update this file when a phase's scope changes or a phase completes — an out-of-date `Phases.md` was the reason this rewrite was needed.
- Cross-check `STATUS.md` before assuming something isn't built yet.
- Follow `Design.md` for any new UI; follow the model/route conventions in `ARCHITECTURE.md` for any new backend feature.
- Resolve the Phase 2 profile-model design decision (Option A vs B) explicitly before writing migration code — this affects every existing collection.
