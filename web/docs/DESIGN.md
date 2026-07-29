# Landing page design system

## Principles
- Follow the premium SaaS language of Copilot Money and YNAB: large, polished product imagery is the visual anchor, the copy stays concise, and the page feels spacious rather than crowded.
- Let images lead. Screenshots should be the first thing the eye lands on, with minimal chrome around them and no heavy decorative frame competing for attention.
- Prefer generous whitespace over interior padding. Section rhythm comes from spacing, not from stuffing more content into boxes.
- Keep the type system restrained and reusable. A small set of heading/body sizes and line-heights should be reused across sections so the page feels intentional.
- Motion should feel subtle and consistent. Use the existing Reveal transition patterns with matching timing and easing across the page.

## Color tokens
Use the design tokens from [app/globals.css](../app/globals.css) rather than raw hex values whenever possible.
- `--color-bg-app`: overall page background and the default canvas for the landing experience.
- `--color-bg-surface`: elevated surfaces such as cards, the sticky header, and any component that should feel layered above the page background.
- `--color-bg-muted`: soft supporting surfaces for alternate sections and secondary panels.
- `--color-bg-hover`: interactive hover states for inline links and subtle buttons.
- `--color-bg-subtle`: low-contrast backgrounds for soft visual texture and image placeholders.
- `--color-text-main`: primary body and heading text.
- `--color-text-muted`: supporting body copy and secondary labels.
- `--color-text-ghost`: tertiary text and tiny metadata.
- `--color-text-inverse`: text on dark or saturated backgrounds such as the final CTA.
- `--color-border-main`: primary borders for cards, sections, and controls.
- `--color-border-muted`: lighter dividers and supporting borders.
- `--color-border-focus`: focus rings and other emphasis states.
- `--color-divider`: explicit section dividers.
- `--color-primary`: primary action and high-priority emphasis color.
- `--color-primary-hover`: hover state for primary actions.
- `--color-primary-soft`: soft primary tint for badges, chips, and subtle backgrounds.
- `--color-primary-foreground`: text placed on primary surfaces.
- `--color-secondary`: secondary actions and neutral emphasis where a less saturated treatment is preferred.
- `--color-secondary-hover`: hover state for secondary actions.
- `--color-secondary-soft`: soft neutral fill for secondary UI.
- `--color-secondary-foreground`: text placed on secondary surfaces.
- `--color-success`: positive success states and budget progress states.
- `--color-success-hover`: hover state for success emphasis.
- `--color-success-soft`: soft success backgrounds.
- `--color-success-foreground`: text placed on success surfaces.
- `--color-warning`: warning states and attention-grabbing accents.
- `--color-warning-hover`: hover state for warning emphasis.
- `--color-warning-soft`: soft warning backgrounds.
- `--color-warning-foreground`: text placed on warning surfaces.
- `--color-danger`: destructive or loss states.
- `--color-danger-hover`: destructive hover state.
- `--color-danger-soft`: soft danger backgrounds.
- `--color-danger-foreground`: text placed on destructive surfaces.
- `--color-info`: information or supporting accent color.
- `--color-info-hover`: hover state for informational emphasis.
- `--color-info-soft`: soft info backgrounds.
- `--color-emerald`: alternate positive accent for specific UI moments.
- `--color-emerald-soft`: soft emerald background.
- `--color-gold`: premium highlight color used for AI/achievement accents.
- `--color-gold-soft`: soft gold background and highlight treatment.

## Typography
- `--font-sans` (Urbanist): the default UI and body font. Use it for body copy, navigation, labels, and general interface text.
- `--font-display` (Lora): section headings and hero messaging. Reserve it for prominent headings and premium moments where the page should feel more editorial.
- `--font-mono`: reserved for technical details or code-like labels; do not use it for standard landing page copy.
- Heading scale:
  - Hero heading: `text-4xl sm:text-5xl lg:text-[3.5rem] font-display font-semibold leading-[0.98]`.
  - Section heading: `text-3xl sm:text-4xl font-display font-semibold tracking-tight`.
  - Subheading and body copy: `text-lg leading-8 text-(--color-text-muted)`.
  - Card titles: `text-base font-semibold text-(--color-text-main)`.
  - Supporting copy: `text-sm leading-7 text-(--color-text-muted)`.

## Spacing and rhythm
- Preserve section-level spacing with `py-24 sm:py-32` for most major sections.
- Use `max-w-7xl` for the main page grid and `max-w-3xl` or `max-w-4xl` for text-first sections as needed.
- Keep content rhythm consistent with `gap-14`/`gap-16` for split layouts and `gap-5`/`gap-6` for card grids.
- Prefer one strong spacing scale across the page rather than scaling each section independently.

## Image handling convention
- Treat screenshots as premium content, not as decorative ornaments. They should take up meaningful space and be framed minimally.
- New image slots should use the skeleton-placeholder pattern introduced in [components/ResponsiveImageFrame.tsx](../components/ResponsiveImageFrame.tsx): render a neutral placeholder block with a subtle pulse and correct aspect ratio first, then leave the real `<Image>` implementation commented below it so the layout remains reviewable while the final crops are being confirmed.
- Known image dimensions in [public/](../public/):
  - `Ai_Image.png` (file extension is `.png`, but the contents are JPEG data): 2267 × 1013.
  - `budget_image.png`: 896 × 528.
  - `category_image.png`: 696 × 770.
  - `chart_image.png`: 1474 × 770.
  - `hero_img.png`: 1553 × 1097.
  - `transaction_image.png`: 2280 × 1008.
- Do not hardcode a “best guess” aspect ratio for a new screenshot; use the actual dimensions above or confirm a new image’s real ratio before implementing it.

## Component conventions
- Keep cards lightweight: rounded corners, subtle border, calm shadow, and clear spacing are preferred over loud visual effects.
- `ResponsiveImageFrame` should remain simple. Any border, background, or padding should be provided by the caller when it is truly necessary; the default treatment should stay minimal and clean.
- Reveal animations should use the shared [components/Reveal.tsx](../components/Reveal.tsx) pattern with consistent timing: `duration: 0.55` and `ease: [0.22, 1, 0.36, 1]`.
- Button and link styles should stay restrained: rounded, clear hierarchy, and a single primary action per section.
