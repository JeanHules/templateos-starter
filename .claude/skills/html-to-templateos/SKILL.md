---
name: html-to-templateos
description: Convert an existing HTML/CSS template into TemplateOS-format React + Tailwind components. Use when the user wants to turn HTML files — a landing page, purchased theme, or static site — into self-contained .tsx components under components/ plus design tokens in templateos.config.ts, ready to preview and `npm run pack`.
---

# HTML → TemplateOS converter

You are running inside a **TemplateOS starter repo**. The author already has an HTML
template (a landing page, a purchased theme, a static site export) and wants to turn it
into the TemplateOS format: self-contained React + Tailwind components in `components/`,
plus design tokens in `templateos.config.ts`. Once converted, they preview with
`npm run dev`, then ship with `npm run pack`.

Your job is to **dissect their HTML/CSS and rebuild it as idiomatic TemplateOS components**
— not a mechanical find-and-replace. Read [reference.md](reference.md) for the exact target
format, the manifest constraints every component must satisfy, the per-category component
checklist, and a worked before/after example. **Read it before you start writing files.**

Work through the steps below in order. Keep the author in the loop at the two checkpoints
(category + the section plan) — everything else you can do autonomously.

## Step 0 — Confirm the environment

Verify this is a TemplateOS starter: `templateos.config.ts` and a `components/` directory
must both exist at the repo root. If they don't, stop and tell the author to run the skill
from inside a cloned starter repo.

## Step 1 — Locate and inventory the HTML source

1. Look for the source in `./html/` first (the conventional drop folder). If it's empty or
   missing, ask the author where their HTML lives (a folder, a single file, or a zip they've
   already extracted).
2. Inventory what you find — don't convert blind:
   - **Pages**: every `.html` file. Note which is the homepage/entry.
   - **CSS**: linked stylesheets (`<link rel="stylesheet">`), `<style>` blocks, and inline
     `style="..."` attributes. Read them all — this is where the design system lives.
   - **CSS framework?**: detect Bootstrap, Tailwind CDN, Bulma, Foundation, or hand-rolled
     CSS. This changes how you translate classes (see reference.md → "CSS frameworks").
   - **Assets**: images, SVGs, icon fonts, web fonts. Note their paths.
   - **JS**: note interactive behavior (carousels, accordions, mobile menus) but do not try
     to port arbitrary scripts — see Step 6 on interactivity.
3. Build a mental model of the design language: primary/accent colors, neutral ramp, the
   type scale, spacing rhythm, border radius, shadows, and recurring patterns (button
   styles, card styles). You'll need this for tokens *and* for consistent components.

## Step 2 — Pick the category  ·  CHECKPOINT

From the content, infer the TemplateOS category (`marketing`, `saas`, `dashboard`,
`ecommerce`, `docs`, `portfolio`, `blog`, `agency`). State your pick and the reasoning in
one line and let the author confirm or correct it — the category drives the expected
component set (reference.md → "Category checklist").

## Step 3 — Plan the section split  ·  CHECKPOINT

Auto-split each page into **semantic sections**, one component each:

- Top-level landmarks become components: `<header>`/`<nav>` → `NavBar`, the lead
  `<section>`/hero → `HeroSection`, feature blocks → `FeatureGrid`, pricing → `PricingCard`,
  testimonials → `TestimonialCard`, CTA band → `CTABanner`, `<footer>` → `Footer`, etc.
- **Deduplicate across pages**: a multi-page site repeats nav and footer on every page —
  emit `NavBar` and `Footer` **once**. Keep page-unique sections.
- Name every component in **PascalCase** and prefer the conventional names in
  reference.md's checklist so the result matches what buyers expect for the category.
- Cap at ~40 components; merge trivial fragments into their parent section.

Present the plan as a short list — `SourceSection → ComponentName` — and let the author
adjust before you write anything.

## Step 4 — Extract design tokens into templateos.config.ts

Derive the four required token groups from the source CSS and write them into
`templateos.config.ts` (replace the starter defaults):

- `colors` — primary, primary-dark/hover, accent, a neutral ramp (heading→body→muted→
  border→subtle-bg→page-bg), and semantic success/warning/danger. Pull real hex values
  from the CSS; name them like `brand/primary`, `neutral/900`, `semantic/danger`.
- `typography` — the font-size scale (xs→5xl) and weights actually used.
- `spacing` — the spacing rhythm, as a rem scale.
- `radii` — the corner-radius scale (sm→full).

Every token is `{ value, description? }`. Keep at least 4 colors. Also update the metadata
fields: `id` (lowercase-with-hyphens), `name`, `description` (20–500 chars), `category`,
`tags`, and leave `version` / `price` for the author unless they tell you otherwise.

## Step 5 — Write the components

For **each** planned section, create `components/<PascalCaseName>.tsx`. Follow the
COMPONENT RULES in reference.md exactly. The essentials:

- **Self-contained & renders with zero props** — realistic defaults pulled from the source
  copy (keep the author's real headlines and content, don't replace with Lorem ipsum).
- **Tailwind utilities only** — translate the source CSS to Tailwind classes. For values off
  the default scale, use arbitrary values: `text-[#1a2b3c]`, `mt-[37px]`, `max-w-[1180px]`.
  Use the tokens you extracted as the source of truth for colors/spacing.
- **No local imports.** Never import another component from `components/` — if two sections
  share a button look, repeat the classes. Don't import React (it's pre-loaded). Inline SVG
  icons rather than pulling in an icon library; npm imports are allowed but rarely needed.
- **TypeScript props interface** directly above the function, with sensible optional props
  (e.g. `links`, `title`, `items`) so buyers can customize.
- **Default export** so it renders in the showcase: `export default function ComponentName(...)`.
- **Responsive**: preserve the source's breakpoints with Tailwind `sm:`/`md:`/`lg:`.
- **Images**: keep `<img src="...">` with the original paths; if assets are local, copy them
  into `public/` and reference them as `/asset.png`. List anything the author must copy.
- **Interactivity**: re-implement *simple* JS behavior with React state (mobile menu toggle,
  accordion, tabs). Drop heavy/library-driven scripts and leave a `// TODO` note rather than
  importing a dependency — components must stay import-free.

Validate each file against the manifest constraints as you write (PascalCase name, code
between 50 and 50,000 chars, description 5–200 chars). See reference.md → "Constraints".

## Step 6 — Verify

1. If practical, run `npx tsc --noEmit` (or the project's typecheck) and fix type errors.
2. Tell the author to run `npm run dev` and open http://localhost:3000 — the starter's
   `app/page.tsx` renders the component gallery so they can eyeball each one.
3. Spot-check that the converted output visually matches the source: spacing, colors,
   hierarchy. Fix obvious drift.

## Step 7 — Hand off

Summarize what you produced: the component list (mapped from their sections), the tokens you
extracted, and any assets they need to drop into `public/`. Then point them at the finish
line:

```
npm run dev     # preview at localhost:3000 and tweak
npm run pack    # build <id>.zip, then upload at templateos.com/submit/upload
```

Remind them they can re-run this skill on additional HTML pages to add more components, and
to bump `version` in `templateos.config.ts` before each release after the first.
