# ExpenseAI Project Issues Audit

This file captures the main issues found across the project. Each issue includes the folder affected, what the problem is, what can happen if it is not fixed, and how to fix it.

---

## Client

### 1. JWT is stored in localStorage
- Description: The client stores the authentication token in localStorage and then sends it as a bearer token in API requests. The app also sets a cookie, but the frontend still reads and uses the local token.
- What can happen: If the app is compromised by XSS, an attacker can steal the token and impersonate the user. This can lead to unauthorized access to accounts, transactions, budgets, and AI insights.
- How to solve: Remove localStorage token storage. Use only HttpOnly, Secure, SameSite cookies for session handling. If a client token is required, use short-lived refresh tokens with secure flows and strict CSRF protections.

### 2. render-time prefetching in the transactions hook
- Description: In `client/src/features/Transactions/useTransactions.js`, `queryClient.prefetchQuery()` is called during render.
- What can happen: This can cause duplicate requests, stale data races, unexpected re-render loops, and poor UX when pagination/filter state updates frequently.
- How to solve: Move prefetch logic into a `useEffect` or a dedicated data-fetch controller hook. Keep data fetching side effects out of render.

### 3. Large page logic in one component
- Description: `client/src/pages/Transactions.jsx` handles filters, selection, pagination, export, modal state, and mutations in one component.
- What can happen: This increases the chance of bugs, makes testing harder, and slows feature maintenance.
- How to solve: Split the page into smaller hooks and components such as filter state, selection state, export logic, and transaction table controller.

### 4. Dead auth footer links
- Description: The login and register pages show links like Privacy Policy, Terms, and FAQ, but those routes/pages do not exist.
- What can happen: Users click and get dead ends, reducing trust and causing drop-off during signup/login.
- How to solve: Either build these pages or remove the links until they are available.

### 5. Theme toggle lacks fully accessible labeling
- Description: The theme button is icon-only and uses a title attribute, but it does not clearly expose its purpose to assistive technologies.
- What can happen: Screen reader users may not know what the button does, which reduces accessibility.
- How to solve: Add `aria-label`, `aria-pressed`, and ensure the control has a clear accessible name.

### 6. Form validation feedback is weak
- Description: Inputs support an `error` prop, but the auth forms do not provide strong inline field validation or accessible error announcements.
- What can happen: Users may not understand what went wrong when a form fails, which hurts usability and accessibility.
- How to solve: Add inline validation, `aria-invalid`, `aria-describedby`, and a live region to announce validation errors.

### 7. Profile scope is client-driven without enough central guardrails
- Description: The active profile is stored in local storage and attached in request headers.
- What can happen: If the client state is manipulated, it can create confusion around which profile data is being accessed; this must be tightly validated on the backend.
- How to solve: Keep the server as the source of truth and avoid trusting client profile state as the only authority. Continue validating profile scope server-side with authenticated user checks.

---

## Server

### 1. Direct subscription plan update from client requests
- Description: `server/controllers/userController.js` exposes a direct patch route to update `subscriptionPlan` based on a request body.
- What can happen: Users can change their plan without real billing confirmation. This breaks entitlement enforcement and allows unauthorized premium access.
- How to solve: Remove client-driven plan mutation. Only update plans after successful payment confirmation from a real billing provider webhook or server-verified checkout flow.

### 2. No brute-force protection for login/register
- Description: Auth routes do not enforce rate limiting or lockout policies.
- What can happen: Attackers can spam password guesses, brute-force emails, or create mass fake accounts.
- How to solve: Add per-IP and per-account rate limits, exponential backoff, temporary lockout, and logging for repeated failed attempts.

### 3. Missing CSRF protection and strong security headers
- Description: Express app enables CORS but does not set security headers such as CSP, HSTS, X-Frame-Options, Referrer-Policy, or Permissions-Policy, and cookie auth is not protected with CSRF strategy.
- What can happen: Cross-site request attacks, clickjacking, MIME confusion, and cross-site form attacks become easier to execute.
- How to solve: Use `helmet`, configure a suitable CSP, enable HSTS in production, set security headers, and use CSRF tokens for state-changing requests when cookie auth is used.

### 4. JWT auth is not fully protected against XSS by design
- Description: The backend sets a cookie, but the frontend also stores a JWT in localStorage and uses it in Authorization headers.
- What can happen: Attackers with XSS access can steal user tokens and impersonate users across the product.
- How to solve: Prefer cookie-only session auth with HttpOnly cookies and strict browser protections. Remove bearer token reads from localStorage.

### 5. Rate limiter for AI is global and not user-aware
- Description: `server/middleware/rateLimiter.middleware.js` tracks requests and tokens in a single global in-memory object.
- What can happen: The limiter is not effective across multiple app instances and can wrongly throttle users. It is also not tied to a specific user or IP.
- How to solve: Move rate limiting to a shared store or managed service, and apply it by user/IP. Use a user-aware limit model and persistent storage if running multiple instances.

### 6. Transaction controller is too large and mixes responsibilities
- Description: `server/controllers/transactionController.js` handles validation, balance updates, budget syncing, CSV export, and transaction CRUD inside the same file.
- What can happen: Small logic changes can create hidden balance bugs or inconsistent budget calculations. It becomes difficult to test and maintain.
- How to solve: Split into dedicated service functions such as validation, balance adjustment, budget sync, and export generation.

### 7. Search queries may become very slow as data grows
- Description: Search in transaction queries uses regex on `description` and `merchant` without proper indexing or search input bounds.
- What can happen: Database performance degrades quickly as transaction volume increases, causing slow dashboards and API latency.
- How to solve: Add a suitable text index, cap search string length, consider prefix indexing or a dedicated search strategy, and benchmark on realistic datasets.

### 8. No health endpoint or graceful shutdown
- Description: The server starts the app but does not expose a health check or graceful shutdown behavior.
- What can happen: Production health monitoring cannot confirm readiness, and restarts may interrupt active traffic or leave stale connections.
- How to solve: Add `/health`, signal handlers for graceful shutdown, and include health metrics/monitoring for the app and database.

### 9. Database connection handling is minimal
- Description: `server/config/db.js` ensures a connection is created but lacks retry logic and production-grade connection robustness.
- What can happen: Temporary DB outages may crash startup or leave the app unhealthy.
- How to solve: Add retry/backoff logic, connection pool configuration, and monitoring around database health.

### 10. Production security basics are incomplete
- Description: The app uses Express but does not set enough baseline production protections.
- What can happen: The API is more vulnerable to browser and web attack patterns than needed.
- How to solve: Add a hardened middleware stack, security headers, strict CORS configuration, and request validation.

---

## Web

### 1. Missing robots.txt and sitemap
- Description: The Next.js marketing site has solid metadata for the homepage but no `robots.txt` and no `sitemap.ts`/`sitemap.xml` implementation.
- What can happen: Search engines have less visibility into the site and discoverability is reduced.
- How to solve: Add a sitemap and robots rules and provide metadata for all public pages.

### 2. SEO coverage is too narrow for a production marketing site
- Description: The homepage is optimized, but there are no pages for pricing, app routes, or additional landing sections with dedicated metadata.
- What can happen: Lower search performance and less organic traffic.
- How to solve: Add dedicated metadata for all public pages and expand the site structure with additional content and canonical routes.

### 3. JSON-LD metadata is acceptable but should be kept controlled
- Description: The app uses `dangerouslySetInnerHTML` to inject structured data.
- What can happen: If this pattern is extended to untrusted data, it can become risky. Current usage is small and controlled, but it is still a fragile pattern.
- How to solve: Keep the schema static or use a helper that serializes known-safe data.

---

## Mobile

### 1. Mobile app still uses mock data
- Description: The mobile app screens are based on sample/mock datasets instead of live API data.
- What can happen: The app does not reflect real customer data, which creates inaccurate UX and weak product confidence.
- How to solve: Connect mobile screens to the live API contract and replace mock data with real queries and state handling.

### 2. Feature parity is incomplete compared to the web product
- Description: The mobile app is a scaffold with some screens, but not all core flows are connected or production-ready.
- What can happen: Users see a partial experience that does not match the main app.
- How to solve: Define a clear MVP and product parity roadmap, then integrate the core data and flows before promotion to production.

---

## Additional Cross-cutting Issues

### 1. No test suite exists
- Description: There are no automated tests for backend routes, business logic, or frontend flows.
- What can happen: Bugs and regressions remain undetected, especially in auth, budget logic, and transaction balance math.
- How to solve: Start with unit tests for critical logic and integration tests for auth/transaction flows. Add E2E smoke tests for login and core dashboard journeys.

### 2. Dependency hygiene issues
- Description: The backend includes the `fs` package even though Node includes `fs` by default. There is also no central dependency governance across apps.
- What can happen: Unnecessary dependencies increase maintenance burden and can introduce supply-chain noise.
- How to solve: Remove redundant packages and standardize the monorepo dependency strategy.

### 3. Production readiness is still limited
- Description: The repo lacks a strong testing pipeline, monitoring, CI standards, and deployment hardening.
- What can happen: Production issues are harder to catch before release, and reliability suffers.
- How to solve: Add CI, linting, type checks, smoke tests, monitoring, health checks, and deployment protections.

---

## Final Summary

The biggest issues are tied to security and trust boundaries: token storage in the browser, direct client-driven subscription changes, and lack of auth abuse protection. The next most important area is structural code quality: the transactions logic is too large, query patterns can scale poorly, and there is no test coverage. The mobile app and web marketing app are also behind the full product maturity expected for production.
