# ExpenseAI Design System

> **Scope**: this is the shared design system used by both `client/` (the product) and `web/` (the marketing site) — the CSS variables and patterns below are duplicated in each app's own stylesheet (`client/src/index.css`, `web/app/globals.css`). For rules specific to the marketing landing page only (copy tone, section-by-section guidance), see `web/docs/DESIGN.md`. Log notable design changes to the marketing site in `web/docs/CHANGELOG.md`.

## Overview

ExpenseAI is a modern, AI-powered expense tracking application with a clean, professional design aesthetic inspired by top-tier SaaS products like Linear, Stripe, and Mercury. The design emphasizes clarity, consistency, and subtle motion to create a premium user experience.

## Design Principles

1. **Clarity First**: Every element should serve a clear purpose. No visual clutter.
2. **Consistent Rhythm**: Uniform spacing, typography scales, and component sizing across all sections.
3. **Subtle Motion**: Animations should enhance, not distract. Smooth transitions and gentle reveals.
4. **Premium Feel**: Careful attention to shadows, borders, and color usage to create depth without heaviness.
5. **Responsive by Default**: Design for mobile first, then enhance for tablet and desktop.

## Color System

### CSS Variables (Tailwind v4)

All colors are defined as CSS custom properties in `web/app/globals.css`:

#### Background Colors

- `--bg-app`: #f6f7fb (Main application background)
- `--bg-surface`: #ffffff (Card/surface backgrounds)
- `--bg-muted`: #eef1f8 (Section alternation backgrounds)
- `--bg-hover`: #e8ecf7 (Interactive hover states)
- `--bg-subtle`: #fafafa (Subtle backgrounds)

#### Text Colors

- `--text-main`: #1a1a1a (Primary text)
- `--text-muted`: #6b7280 (Secondary text)
- `--text-ghost`: #9ca3af (Tertiary text)
- `--text-inverse`: #ffffff (Text on dark backgrounds)

#### Border Colors

- `--border-main`: #e5e7eb (Primary borders)
- `--border-muted`: #f3f4f6 (Subtle borders)
- `--border-focus`: #d1d5db (Focus states)
- `--divider`: #e5e7eb (Section dividers)

#### Semantic Colors

- `--primary`: #5b4cf0 (Primary brand color - purple)
- `--success`: #10b981 (Success states - green)
- `--warning`: #f59e0b (Warning states - amber)
- `--danger`: #dc2626 (Error/danger - red)
- `--info`: #3b82f6 (Informational - blue)
- `--gold`: #c98a1a (Premium/accent - gold)

### Usage Guidelines

- **Always use CSS variables**: `text-(--color-text-main)` instead of `text-gray-900`
- **Semantic colors**: Use semantic colors for their intended purpose (success for positive states, etc.)
- **Gold accent**: Reserve gold for premium features, highlights, and CTAs
- **Consistent opacity**: Use opacity modifiers (e.g., `/10`, `/60`) for subtle backgrounds

## Typography

### Font Families

- **Sans-serif**: Urbanist (primary UI font)
- **Display**: Lora (headings, hero text)
- **Mono**: System monospace (code, numbers)

### Type Scale

#### Headings (Display Font - Lora)

- `text-3xl`: Section headings (mobile)
- `text-4xl`: Section headings (tablet+)
- `text-5xl`: Hero subheadings (desktop)
- `text-[3.4rem]`: Hero main heading (desktop)

#### Body Text (Sans-serif - Urbanist)

- `text-xs`: Labels, badges, metadata
- `text-sm`: Secondary text, descriptions
- `text-base`: Body text
- `text-lg`: Lead paragraphs, descriptions
- `text-xl`: Emphasized body text

### Typography Rules

- **Line height**: `leading-relaxed` for body text, `tracking-tight` for headings
- **Font weights**: `font-semibold` for headings, `font-medium` for emphasis, `font-normal` for body
- **No orphaned text**: Ensure text wraps gracefully at 375px, 768px, 1024px, 1440px breakpoints

## Spacing System

### Section Padding

- **Vertical rhythm**: `py-24 sm:py-32` for all major sections
- **Container padding**: `px-6 lg:px-8` for content containers
- **Max width**: `max-w-7xl` for full-width sections, `max-w-2xl` for centered text

### Component Spacing

- **Card padding**: `p-6` for feature cards, `p-3 sm:p-4 lg:p-5` for image frames
- **Gap between items**: `gap-6` for grids, `gap-3` for button groups
- **Margin between sections**: `mt-16` between content blocks

## Component Design

### Cards

**Standard Card Pattern:**

```tsx
<div className="rounded-2xl border border-(--color-border-main) bg-(--color-bg-surface) p-6">
  {/* Content */}
</div>
```

**Highlighted Card Pattern:**

```tsx
<div className="rounded-2xl border border-(--color-gold)/40 bg-linear-to-b from-(--color-gold-soft)/60 to-(--color-bg-surface) shadow-lg shadow-(--color-gold)/10">
  {/* Content */}
</div>
```

### Buttons

**Primary Button:**

```tsx
<button className="rounded-lg bg-(--color-primary) px-6 py-3.5 text-sm font-semibold text-(--color-primary-foreground) shadow-lg shadow-(--color-primary)/25 hover:bg-(--color-primary-hover) transition-all hover:-translate-y-0.5">
  {/* Label */}
</button>
```

**Secondary Button:**

```tsx
<button className="rounded-lg border border-(--color-border-main) bg-(--color-bg-surface) px-6 py-3.5 text-sm font-semibold text-(--color-text-main) hover:bg-(--color-bg-hover) transition-all hover:-translate-y-0.5">
  {/* Label */}
</button>
```

### Image Frames

**Standard Image Frame:**

```tsx
<div className="rounded-[1.5rem] border border-(--color-border-main)/60 bg-(--color-bg-surface) p-3 sm:p-4 lg:p-5 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.25)]">
  <ResponsiveImageFrame
    src="/image.png"
    alt="Description"
    aspectClassName="aspect-[ratio]"
    wrapperClassName="w-full border-0 bg-transparent shadow-none"
    imageClassName="rounded-[1.1rem]"
  />
</div>
```

**Gradient Image Frame:**

```tsx
<div className="rounded-[1.5rem] border border-(--color-border-main) bg-linear-to-br from-(--color-bg-surface) via-(--color-bg-subtle) to-(--color-bg-muted) p-3 sm:p-4 lg:p-5 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.25)] transition-all duration-500 hover:shadow-[0_30px_80px_-28px_rgba(91,76,240,0.28)]">
  <ResponsiveImageFrame
    src="/image.png"
    alt="Description"
    aspectClassName="aspect-[ratio]"
    wrapperClassName="w-full border-0 bg-transparent p-0 shadow-none"
    imageClassName="rounded-[0.95rem]"
  />
</div>
```

### Badges

**Primary Badge:**

```tsx
<span className="inline-flex items-center gap-2 rounded-full bg-(--color-primary-soft) px-3.5 py-1.5 text-xs font-semibold text-(--color-primary)">
  {/* Icon + Label */}
</span>
```

**Gold Badge:**

```tsx
<span className="rounded-full bg-linear-to-r from-(--color-gold) to-(--color-warning) px-2.5 py-0.5 text-[10px] font-bold tracking-wide text-white shadow-sm">
  {/* Label */}
</span>
```

## Shadows

### Shadow Scale

- **Subtle**: `shadow-sm` (buttons, small elements)
- **Medium**: `shadow-lg` (cards, feature highlights)
- **Deep**: `shadow-[0_20px_60px_-35px_rgba(15,23,42,0.25)]` (image frames)
- **Colored**: `shadow-(--color-primary)/25` (brand-colored shadows)

### Shadow Usage

- Use colored shadows for brand elements (primary, gold)
- Use neutral shadows for structural elements
- Consistent shadow depth across similar components

## Border Radius

- **Small elements**: `rounded-lg` (buttons, badges)
- **Cards**: `rounded-2xl` (feature cards, testimonials)
- **Image frames**: `rounded-[1.5rem]` (outer), `rounded-[1.1rem]` (inner)
- **Hero frame**: `rounded-[1.75rem]` (outer), `rounded-[1.25rem]` (inner)

## Animations

### Built-in Animations (from globals.css)

- `animate-float`: Gentle vertical floating (6s ease-in-out infinite)
- `animate-pulse-glow: Subtle opacity pulse (3s ease-in-out infinite)
- `animate-gold-shimmer`: Gold gradient shimmer (3.5s ease-in-out infinite)

### Reveal Animation

```tsx
<Reveal delay={0.1}>{/* Content fades in with translateY */}</Reveal>
```

### Hover Effects

- Buttons: `hover:-translate-y-0.5` with `transition-all`
- Cards: `hover:shadow-xl` with `transition-all duration-300`
- Images: `hover:scale-[1.01]` with `transition-transform duration-500`

## Responsive Design

### Breakpoints

- **Mobile**: 375px - 414px (base styles)
- **Tablet**: 768px - 834px (`sm:` prefix)
- **Desktop**: 1280px+ (`lg:` prefix)

### Grid Systems

- **2-column**: `grid-cols-1 sm:grid-cols-2`
- **3-column**: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`
- **4-column**: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`
- **Custom ratios**: `lg:grid-cols-[1.35fr_0.65fr]` for asymmetric layouts

### Mobile-First Approach

- Write base styles for mobile
- Enhance with `sm:` for tablet
- Polish with `lg:` for desktop
- Always test at 375px minimum width

## Accessibility

### Focus States

```tsx
:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
```

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Color Contrast

- Ensure text meets WCAG AA standards
- Use semantic colors with appropriate foreground/background pairs
- Test in both light and dark modes

## File Structure

```
web/
├── app/
│   ├── globals.css          # Design tokens, animations, base styles
│   ├── layout.tsx           # Root layout with metadata
│   └── page.tsx             # Landing page composition
├── components/
│   ├── Hero.tsx             # Hero section with stats
│   ├── Features.tsx         # Feature grid
│   ├── AISection.tsx        # AI features section
│   ├── BudgetSection.tsx    # Budget features
│   ├── TransactionsSection.tsx  # Transaction features
│   ├── AnalyticsSection.tsx # Analytics features
│   ├── WhyChoose.tsx        # Value proposition
│   ├── Testimonials.tsx     # Social proof
│   ├── FAQ.tsx              # Accordion FAQ
│   ├── FinalCTA.tsx         # Final call-to-action
│   ├── Footer.tsx           # Site footer
│   ├── Header.tsx           # Site header
│   ├── ResponsiveImageFrame.tsx  # Image wrapper component
│   ├── AnimatedNumber.tsx   # Animated stat numbers
│   ├── Reveal.tsx           # Scroll reveal animation
│   └── [other components]
└── public/
    ├── hero_img.png         # Hero screenshot (1553×1097)
    ├── chart_image.png      # Analytics chart (1474×770)
    ├── category_image.png   # Category breakdown (696×770)
    ├── budget_image.png     # Budget view
    ├── transaction_image.png # Transaction view
    └── Ai_Image.png         # AI insights view
```

## Best Practices

1. **Always use CSS variables** for colors, never hardcode values
2. **Maintain consistent padding order**: `p-3 sm:p-4 lg:p-5`
3. **Use semantic class names** that describe purpose, not appearance
4. **Test at multiple breakpoints**: 375px, 768px, 1024px, 1440px
5. **Keep animations subtle**: No jarring movements, smooth easing
6. **Ensure text readability**: Adequate contrast, appropriate line heights
7. **Maintain visual hierarchy**: Clear distinction between headings, body, and metadata
8. **Use shadows for depth**: Consistent shadow scale across components
9. **Responsive images**: Use `ResponsiveImageFrame` with correct aspect ratios
10. **Tailwind v4 syntax**: Use `bg-linear-to-*` not `bg-gradient-to-*`

## Common Patterns

### Section Header

```tsx
<Reveal className="mx-auto max-w-2xl text-center">
  <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-(--color-text-main)">
    Section Title
  </h2>
  <p className="mt-4 text-lg text-(--color-text-muted)">
    Section description that provides context.
  </p>
</Reveal>
```

### Feature List with Icons

```tsx
<ul className="mt-8 space-y-5">
  <li className="flex gap-4 group">
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-(--color-bg-surface) border border-(--color-border-main) group-hover:border-(--color-primary)/50 group-hover:shadow-lg group-hover:shadow-(--color-primary)/10 transition-all duration-300">
      <Icon size={16} className="text-(--color-primary)" />
    </span>
    <div>
      <p className="font-semibold text-(--color-text-main)">Feature title</p>
      <p className="text-sm text-(--color-text-muted) mt-0.5">Description</p>
    </div>
  </li>
</ul>
```

### Grid Layout

```tsx
<div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
  {items.map((item, i) => (
    <Reveal key={item.id} delay={(i % 4) * 0.06}>
      <div className="h-full rounded-2xl border border-(--color-border-main) bg-(--color-bg-surface) p-6">
        {/* Content */}
      </div>
    </Reveal>
  ))}
</div>
```

## Notes for AI Editors

- This project uses **Tailwind CSS v4** - ensure all syntax is v4 compatible
- All colors must use CSS variables: `text-(--color-text-main)` not `text-gray-900`
- Gradients use `bg-linear-to-*` not `bg-gradient-to-*`
- Image aspect ratios must match actual file dimensions for proper `object-contain`
- Always test responsive behavior at mobile (375px), tablet (768px), and desktop (1280px+)
- Maintain the existing section structure and content - this is a visual polish, not a rewrite
- Use the `Reveal` component for scroll animations with staggered delays
- Keep animations subtle and professional - no flashy or jarring effects
