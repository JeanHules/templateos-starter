# TemplateOS component format — conversion reference

The single source of truth for what an HTML→TemplateOS conversion must produce. The
`html-to-templateos` skill follows this; the hosted pipeline converter targets the same
format. If you change the rules, change them here.

---

## Target layout

A converted template lives in the starter repo like this:

```
templateos.config.ts        # metadata + design tokens (you edit this)
components/
  NavBar.tsx                 # one PascalCase .tsx per section
  HeroSection.tsx
  FeatureGrid.tsx
  Footer.tsx
  _cover.tsx                 # OPTIONAL — marketplace screenshot (see "Cover")
public/                      # any local images the components reference
```

`npm run pack` zips `templateos.json` (built from the config) + every public
`components/*.tsx` + `_cover.tsx` if present. Files starting with `_` are excluded from the
public component list but still shipped.

---

## Component rules

Every `components/*.tsx` file must:

1. **Render with zero props.** Give every prop a realistic default taken from the source
   content. The starter gallery and the marketplace preview render the file with no props.
2. **No local imports — keep each file self-contained.** Never import another component from
   `components/`. React and Tailwind are pre-loaded, so don't import React. Other npm
   packages *are* allowed (the preview resolves them via esm.sh), but a converted HTML
   section almost never needs one — **inline SVG icons and helpers** instead of pulling in an
   icon or UI library. Fewer imports = always renders.
3. **Use Tailwind utility classes only** for styling. No CSS modules, no styled-components,
   no `<style>` tags. Inline `style={{ }}` is allowed *only* for genuinely dynamic values
   that can't be a class (e.g. a computed `width` for a progress bar).
4. **Export a default function** — the showcase and marketplace preview render the file's
   **default export**, so make it the component (or a small demo wrapper that renders it).
   `export default function ComponentName(props) { ... }`, PascalCase, matching the filename.
5. **TypeScript props interface** defined immediately above the function.
6. **Realistic content** — keep the author's real copy, headings, and links. Never replace
   real content with "Lorem ipsum".
7. **Be responsive** with Tailwind breakpoints (`sm:`, `md:`, `lg:`, `xl:`).
8. Not require `"use client"` — it's added automatically by the preview runtime.

### Constraints (enforced by the manifest validator on submission)

| Field | Rule |
|-------|------|
| Component filename / name | PascalCase `^[A-Z][A-Za-z0-9]*$`, or `_`-prefixed for private (`_cover`) |
| Component code length | ≥ 50 and ≤ 50,000 characters |
| Component description | 5–200 characters |
| Components per template | 1–100 |
| `id` | 2–60 chars, `^[a-z0-9-]+$` (lowercase, digits, hyphens) |
| `name` | 2–80 chars |
| `description` | 20–500 chars |
| `category` | one of the 8 categories below |
| `version` | semver `X.Y.Z` |
| `tags` | 1–10 tags, each 1–30 chars |
| `price` | dollars in config (`49`), converted to cents on pack |
| `tokens` | must include `colors`, `typography`, `spacing`, `radii`; each entry `{ value, description? }` |

---

## Category checklist

Pick the category from the content, then aim to produce at least these components (named in
PascalCase). Buyers filter by category and expect this set.

| Category | Expected components |
|----------|--------------------|
| `marketing` | NavBar, HeroSection, FeatureGrid, Footer, Button |
| `saas` | NavBar, HeroSection, FeatureGrid, PricingCard, Footer, Button |
| `dashboard` | Sidebar, NavBar, StatCard, DataTable, Button, Badge |
| `ecommerce` | NavBar, ProductCard, Footer, Button, Badge |
| `docs` | NavBar, Sidebar, Footer, Button |
| `portfolio` | NavBar, HeroSection, ProjectCard, Footer |
| `blog` | NavBar, HeroSection, BlogCard, Footer, Button |
| `agency` | NavBar, HeroSection, ServiceCard, Footer, Button |

Add any extra sections the source has (TestimonialCard, CTABanner, FAQ, LogoCloud, Stats…)
as their own components.

---

## Design tokens

Replace the `tokens` block in `templateos.config.ts` with values extracted from the source
CSS. Four groups are required:

- **colors** — at minimum a primary, a primary-dark/hover, an accent, a neutral ramp
  (heading → body → muted → border → subtle-bg → page-bg), and semantic success/warning/
  danger. Name them `brand/primary`, `neutral/900`, `semantic/danger`, etc.
- **typography** — the font-size scale used (`size/xs` … `size/5xl`) as CSS values, plus
  weights (`weight/normal` … `weight/bold`).
- **spacing** — the spacing rhythm as a rem scale keyed by step (`1`, `2`, `3`, `4`, `6`, `8`…).
- **radii** — the corner-radius scale (`sm`, `md`, `lg`, `xl`, `2xl`, `full`).

Each value is `{ value: "<css-value>", description?: "<usage note>" }`.

How to extract: scan the CSS for `:root` custom properties first (e.g. `--color-primary`,
`--radius-lg`) — they map cleanly to tokens. Otherwise infer from the most frequent
`color`, `background`, `font-size`, `padding`, and `border-radius` values.

---

## CSS → Tailwind cheatsheet

Translate computed CSS into Tailwind. Use arbitrary values when the source is off the
default scale — never invent a class.

| CSS | Tailwind |
|-----|----------|
| `display:flex; gap:16px` | `flex gap-4` |
| `display:grid; grid-template-columns:repeat(3,1fr)` | `grid grid-cols-3` |
| `padding:24px 32px` | `py-6 px-8` |
| `margin-top:37px` (off-scale) | `mt-[37px]` |
| `color:#1a2b3c` (off-palette) | `text-[#1a2b3c]` |
| `background:#f97316` | `bg-orange-500` or `bg-[#f97316]` |
| `border-radius:9999px` | `rounded-full` |
| `font-size:1.125rem; font-weight:600` | `text-lg font-semibold` |
| `box-shadow:0 1px 2px rgba(0,0,0,.05)` | `shadow-sm` |
| `max-width:1180px; margin:0 auto` | `max-w-[1180px] mx-auto` |
| `@media (min-width:768px){…}` | `md:` prefix on the affected classes |
| `:hover { background:… }` | `hover:bg-…` |
| `transition: all .2s` | `transition-colors` (or `transition`) |

### CSS frameworks

- **Bootstrap / Bulma / Foundation classes** (`container`, `row`, `col-md-6`, `btn btn-primary`,
  `navbar`) — these are *not* Tailwind. Re-express the intent in Tailwind
  (`col-md-6` → `md:w-1/2`, `btn btn-primary` → the project's primary button classes).
- **Tailwind via CDN** — already Tailwind; copy the classes through, but confirm they're real
  utilities and move any custom config values to arbitrary values.
- **Utility soup / hand-rolled CSS** — read the rules and translate to the equivalent
  Tailwind. Don't preserve the original class names.

---

## Cover (optional)

You don't need to create `_cover.tsx`. If absent, the marketplace screenshot system
auto-composes a cover from the public components (NavBar + Hero + Footer for the category).
Only add `_cover.tsx` if you want to control the exact marketplace thumbnail — it's a single
composed page component, still import-free, prefixed `_` so it's excluded from the public
list.

---

## Worked example

**Source** — `index.html` + `styles.css`:

```html
<header class="site-nav">
  <a class="brand" href="/">Northwind</a>
  <nav>
    <a href="#features">Features</a>
    <a href="#pricing">Pricing</a>
    <a class="cta" href="/signup">Get started</a>
  </nav>
</header>
```
```css
.site-nav { display:flex; justify-content:space-between; align-items:center;
  height:64px; padding:0 32px; border-bottom:1px solid #e7e5e4; }
.brand { font-weight:700; font-size:1.125rem; color:#1c1917; }
.site-nav nav { display:flex; gap:24px; align-items:center; }
.site-nav nav a { color:#44403c; font-size:0.875rem; }
.site-nav nav a.cta { background:#f97316; color:#fff; padding:8px 16px;
  border-radius:8px; font-weight:600; }
```

**Output** — `components/NavBar.tsx`:

```tsx
interface NavBarProps {
  brand?: string;
  links?: { label: string; href: string }[];
  ctaLabel?: string;
  ctaHref?: string;
}

export default function NavBar({
  brand = "Northwind",
  links = [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
  ],
  ctaLabel = "Get started",
  ctaHref = "/signup",
}: NavBarProps) {
  return (
    <header className="flex items-center justify-between h-16 px-8 border-b border-stone-200">
      <a href="/" className="text-lg font-bold text-stone-900">{brand}</a>
      <nav className="flex items-center gap-6">
        {links.map((l) => (
          <a key={l.label} href={l.href} className="text-sm text-stone-700 hover:text-stone-900">
            {l.label}
          </a>
        ))}
        <a
          href={ctaHref}
          className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-600"
        >
          {ctaLabel}
        </a>
      </nav>
    </header>
  );
}
```

Note how the conversion: split the header into one `NavBar` component, turned the brand /
links / CTA into typed props with real defaults, translated every CSS rule to Tailwind
utilities (mapping `#e7e5e4`/`#44403c`/`#1c1917` onto the `stone` neutral ramp and `#f97316`
onto `orange-500`), added a `hover:` state, and kept zero imports.
