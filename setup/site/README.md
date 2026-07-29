# ExpenseAI — Marketing Site

A static, SEO-optimized marketing website for **ExpenseAI**, the AI-powered expense tracker
(app repo: https://github.com/3narinder/expense-tracker). This site does **not** contain the
application itself — it explains the product, ranks well on Google, and sends visitors into the
existing app.

Built with Next.js App Router, TypeScript, and Tailwind CSS v4, using the same design tokens
(colors, fonts) as the real application so it feels like a natural extension of it.

## Tech stack

- Next.js 16 (App Router, static export via `output: "export"`)
- TypeScript
- Tailwind CSS v4
- Framer Motion (subtle scroll-reveal animations only)
- lucide-react icons

## Before you deploy: update these

1. **`lib/config.ts`** — set `APP_URL` to the real, deployed URL of the ExpenseAI application
   (where "Launch App" should send people), and `SITE_URL` to the domain this marketing site
   will live on.
2. **`app/contact/page.tsx`** — replace the placeholder email address.
3. **`app/privacy/page.tsx`** and **`app/terms/page.tsx`** — these are templates. Have them
   reviewed before going live.
4. **`public/og-image.png`** — regenerate if you change the headline/branding (source SVG in
   `assets/og.svg`).

---

## 1. Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000. Edit files under `app/` and `components/` — changes hot-reload.

## 2. Static export (production build)

```bash
npm run build
```

Because `next.config.ts` sets `output: "export"`, this produces a fully static site in the
`out/` folder — no Node.js server required at runtime. You can open `out/index.html` directly
or serve the folder with any static file host.

To preview the exported build locally:

```bash
npx serve out
```

## 3. Deploy to Vercel

1. Push this project to a GitHub repository.
2. Go to https://vercel.com/new and import the repository.
3. Vercel auto-detects Next.js. Leave the build command as `next build` and the output
   directory as `out` (Vercel reads this automatically from `next.config.ts`).
4. Click **Deploy**. Vercel gives you a `*.vercel.app` URL immediately; add a custom domain
   under **Project → Settings → Domains**.

## 4. Deploy to Netlify

1. Push the project to GitHub.
2. Go to https://app.netlify.com/start and connect the repository.
3. Set:
   - **Build command:** `npm run build`
   - **Publish directory:** `out`
4. Click **Deploy site**. Add a custom domain under **Site configuration → Domain management**.

## 5. Deploy to GitHub Pages

1. Build locally: `npm run build`. This creates the `out/` folder.
2. Install the `gh-pages` helper: `npm install --save-dev gh-pages`.
3. Add a script to `package.json`:
   ```json
   "deploy": "gh-pages -d out"
   ```
4. Run `npm run deploy`. This pushes the `out/` folder to a `gh-pages` branch.
5. In your repository settings, go to **Pages** and set the source branch to `gh-pages`.
6. If you're deploying to a project page (`username.github.io/repo-name`), you'll also need to
   set `basePath` in `next.config.ts` to `/repo-name` and rebuild.

## 6. Point a custom domain at your host

- **Vercel / Netlify:** add the domain in the dashboard, then create the DNS records they show
  you (usually a `CNAME` for a subdomain like `www`, or an `A`/`ALIAS` record for the root
  domain) with your domain registrar.
- **GitHub Pages:** add a `CNAME` file to the `public/` folder containing your domain, and
  create a `CNAME` DNS record pointing to `username.github.io`.
- DNS changes can take a few minutes to 48 hours to propagate.

## 7. Verify with Google Search Console

1. Go to https://search.google.com/search-console and click **Add property**.
2. Choose **URL prefix** and enter your live site URL (e.g. `https://expenseai.app`).
3. Verify ownership using one of the offered methods — the simplest is usually **HTML file
   upload**: download the verification file Google gives you and drop it into the `public/`
   folder, then rebuild and redeploy so it's served at the root (e.g.
   `https://expenseai.app/googleXXXXXXX.html`).
4. Alternatively, use the **HTML tag** method: add the `<meta name="google-site-verification" ...>`
   tag Google gives you into the `metadata.verification.google` field in `app/layout.tsx`.
5. Click **Verify**.

## 8. Verify with Bing Webmaster Tools

1. Go to https://www.bing.com/webmasters and sign in.
2. Add your site URL. Bing can usually **import verified sites directly from Google Search
   Console**, which is the fastest path if you completed step 7.
3. Otherwise, verify manually with the XML file or meta tag method it provides, the same way as
   Google Search Console above.

## 9. Generate the sitemap

The sitemap is generated automatically at build time by `app/sitemap.ts` and exported to
`out/sitemap.xml`. If you add new static pages, add their paths to the `routes` array in that
file and rebuild.

## 10. Submit the sitemap to Google

1. In Google Search Console, open your verified property.
2. Go to **Sitemaps** in the left sidebar.
3. Enter `sitemap.xml` and click **Submit**.

## 11. Add Google Analytics

1. Create a property at https://analytics.google.com and get your Measurement ID
   (looks like `G-XXXXXXXXXX`).
2. Add the two standard gtag.js `<script>` tags Google gives you into `app/layout.tsx`, inside
   the `<head>` (Next.js App Router lets you place raw `<script>` tags in `layout.tsx`, or use
   `next/script` with `strategy="afterInteractive"` for better loading behavior).
3. Rebuild and redeploy.

## 12. Add the Google Search Console meta tag (alternative to file upload)

If you prefer the meta-tag verification method from step 7, add it to the `metadata` export in
`app/layout.tsx`:

```ts
export const metadata: Metadata = {
  // ...existing fields
  verification: {
    google: "your-verification-code-here",
  },
};
```

Rebuild and redeploy, then click **Verify** in Search Console.

---

## Project structure

```
app/
  layout.tsx        Root layout, metadata, JSON-LD structured data
  page.tsx           Landing page (composes all sections)
  robots.ts          Generates /robots.txt
  sitemap.ts         Generates /sitemap.xml
  privacy/, terms/, contact/   Static support pages
components/
  Hero.tsx, Features.tsx, AISection.tsx, BudgetSection.tsx,
  TransactionsSection.tsx, AnalyticsSection.tsx, WhyChoose.tsx,
  Testimonials.tsx, FAQ.tsx, FinalCTA.tsx, Header.tsx, Footer.tsx
  mocks/DashboardMock.tsx   Static visual recreation of the app's dashboard
lib/config.ts        Site-wide constants (APP_URL, GITHUB_URL, etc.)
```
