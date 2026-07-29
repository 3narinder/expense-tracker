# STATUS

Snapshot of what's actually built vs. planned, based on a scan of the codebase. Update this whenever a feature moves from planned → in progress → done, so it doesn't drift like `Phases.md` did before this update.

## Backend (`server/`)

| Module                                                          | Status                   |
| --------------------------------------------------------------- | ------------------------ |
| Auth (register/login/me/logout, JWT cookie)                     | ✅ Done                  |
| Accounts (bank/credit/cash/investment)                          | ✅ Done                  |
| Categories (hierarchical, auto-categorization by merchant)      | ✅ Done                  |
| Transactions (CRUD, recurring, bulk delete, CSV export, trends) | ✅ Done                  |
| Budgets (multi-category, period, alert threshold)               | ✅ Done                  |
| Dashboard (month summary/trends/category breakdown)             | ✅ Done                  |
| AI Insights (generation, rate limiting, plan eligibility)       | ✅ Done                  |
| Payment/subscription billing                                    | ⬜ Not started — Phase 2 |
| Personal/business profile separation                            | ⬜ Not started — Phase 2 |

## Web app (`client/`)

| Area                         | Status                   |
| ---------------------------- | ------------------------ |
| Auth pages (Login, Register) | ✅ Done                  |
| Dashboard                    | ✅ Done                  |
| Transactions                 | ✅ Done                  |
| Budgets                      | ✅ Done                  |
| Categories                   | ✅ Done                  |
| Accounts feature             | ✅ Done                  |
| AI Insights                  | ✅ Done                  |
| Dark mode (ThemeToggle)      | ✅ Present               |
| Billing/subscription UI      | ⬜ Not started — Phase 2 |

## Marketing site (`web/`)

| Area                                                                                                  | Status                                                              |
| ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| Landing page (Hero, Features, AI/Budget/Transaction/Analytics sections, Testimonials, FAQ, Final CTA) | ✅ Done                                                             |
| Shared design docs (`web/docs/DESIGN.md`, `web/docs/CHANGELOG.md`)                                    | ✅ Present — kept as the web-specific extension of root `Design.md` |
| Pricing page                                                                                          | ⬜ Not started — Phase 2                                            |

## Mobile (`mobile/`)

| Area                                                                                      | Status                                                              |
| ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| Screens: dashboard, transactions, budget progress, category/trend charts, sign-in/sign-up | ✅ Scaffolded                                                       |
| Live API wiring                                                                           | ⚠️ Partial — some screens still read from `src/data/mockAppData.ts` |
| Feature parity with `client/` (categories, accounts management)                           | ⬜ Not started                                                      |

## Known naming risk

The existing `Account` model (bank/credit/cash/investment, for transaction attribution) and the Phase 2 "personal/business account for user" concept are **not the same thing**. Whoever picks up Phase 2 should name the new concept distinctly (e.g. `profileType` on `User`, or a `Workspace` model) — see `ARCHITECTURE.md` open questions.
