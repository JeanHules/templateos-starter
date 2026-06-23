# TemplateOS Starter

Build a React + Tailwind component library and sell it on [TemplateOS](https://templateos.com). AI agents (Claude, Cursor, Codex) buy and use your components directly — no setup required on the buyer's side beyond an API key.

---

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you'll see your component showcase. Every `.tsx` file in `components/` appears here automatically.

---

## Already have an HTML template?

Drop your existing HTML/CSS into [`html/`](html/) and let Claude Code convert it for you. From the repo root:

```
claude
> use the html-to-templateos skill to convert the template in ./html
```

The bundled **`html-to-templateos`** skill ([`.claude/skills/`](.claude/skills/html-to-templateos/SKILL.md)) inventories your pages and stylesheets, splits each page into PascalCase section components (`NavBar`, `HeroSection`, `Footer`, …), extracts your colors/typography/spacing/radii into `templateos.config.ts`, and keeps your real content — all running locally with your own Claude. Review the two checkpoints it surfaces (category + section plan), then `npm run dev` to preview and `npm run pack` to ship.

---

## The only rules for components

1. **One file = one component.** `Button.tsx`, `HeroSection.tsx`, `DataTable.tsx`
2. **PascalCase filenames.** The filename becomes the component name buyers see.
3. **Export a default function** — this is what the showcase and marketplace preview renders.
4. **No imports from other local files.** Each component must be self-contained.
5. **React + Tailwind are pre-loaded.** Any other npm package is fine too — just import it normally.

### Minimal example

```tsx
// components/Button.tsx

interface ButtonProps {
  label: string;
  variant?: "primary" | "secondary";
}

function Button({ label, variant = "primary" }: ButtonProps) {
  return (
    <button
      className={`h-9 px-4 text-sm font-medium rounded-lg transition-colors ${
        variant === "primary"
          ? "bg-indigo-600 text-white hover:bg-indigo-700"
          : "border border-slate-300 text-slate-700 hover:bg-slate-50"
      }`}
    >
      {label}
    </button>
  );
}

// ↓ This is the demo — the showcase renders this, not Button directly
export default function ButtonDemo() {
  return (
    <div className="flex items-center gap-4 p-8">
      <Button label="Primary" variant="primary" />
      <Button label="Secondary" variant="secondary" />
    </div>
  );
}
```

### Component with external packages

Just import them — the marketplace viewer resolves them automatically via esm.sh, and Claude gets told to install them before use.

```tsx
// components/StatsChart.tsx
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", revenue: 4000 },
  { month: "Feb", revenue: 6200 },
  { month: "Mar", revenue: 5800 },
  { month: "Apr", revenue: 9100 },
];

export default function StatsChart() {
  return (
    <div className="p-8 bg-white rounded-2xl border border-slate-200">
      <h3 className="text-sm font-semibold text-slate-500 mb-4">Revenue</h3>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={data}>
          <Area type="monotone" dataKey="revenue" stroke="#6366f1" fill="#eef2ff" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
```

---

## Configure your template

Edit `templateos.config.ts` before submitting. Every field matters.

```ts
const config = {
  // Unique identifier — lowercase letters, numbers, hyphens only.
  // This becomes the URL slug: templateos.com/templates/my-saas-kit
  id: "my-saas-kit",

  // Shown on the marketplace listing
  name: "My SaaS Kit",

  // 20–500 characters. Be specific about what's included and who it's for.
  description: "A complete SaaS component library with 25 components covering marketing pages, dashboards, and base UI. Indigo palette, fully typed TypeScript, responsive Tailwind.",

  // Category determines which components are required/recommended
  // Options: marketing | saas | dashboard | ecommerce | docs | portfolio | blog | agency
  category: "saas",

  // Bump this before every push. Once published, a version is locked forever.
  // Buyers are pinned to the version they bought.
  // Minor bump (1.0.0 → 1.1.0) for new components or fixes.
  // Major bump (1.0.0 → 2.0.0) for renamed or removed components.
  version: "1.0.0",

  // In dollars. Set to 0 for free templates.
  price: 49,

  // 1–10 tags. Help buyers find your template.
  tags: ["saas", "indigo", "dashboard", "tailwind"],

  // Your Figma file URL (optional)
  figmaUrl: undefined,

  // Design tokens — these become the buyer's DESIGN.md and Tailwind config
  tokens: {
    colors: {
      "brand/primary": { value: "#6366f1", description: "Primary action color — buttons, links, active states" },
      // ... add your full palette
    },
    typography: { /* ... */ },
    spacing: { /* ... */ },
    radii: { /* ... */ },
  },
};
```

---

## Add a cover image

The marketplace shows a screenshot of your template. Create `components/_cover.tsx` — a self-contained 1440×900 layout showing your best work. The `_` prefix hides it from the public component list.

```tsx
// components/_cover.tsx
// Optimize for 1440×900. Use inline styles — Tailwind CDN loads asynchronously.

export default function Cover() {
  return (
    <div style={{ width: 1440, height: 900, background: "#f8fafc", display: "flex", overflow: "hidden" }}>
      {/* Left sidebar */}
      <div style={{ width: 240, background: "#1e293b", height: "100%" }} />
      {/* Main content */}
      <div style={{ flex: 1, padding: 32 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: "#0f172a" }}>Dashboard</h1>
        {/* Add your most impressive layout here */}
      </div>
    </div>
  );
}
```

> **Skip this file?** The system auto-composes your existing components into a cover — but your own cover will look much better.

---

## Pack and submit

### Pack into a zip

```bash
npm run pack
```

Creates `<your-id>.zip` in the project root. This zip contains:
- `templateos.json` — your metadata and design tokens
- `components/*.tsx` — all your components
- `components/_cover.tsx` — your cover image (if you created one)

### Upload

1. Go to [templateos.com/submit/upload](https://templateos.com/submit/upload)
2. Drag and drop your zip (or click to browse)
3. Preview shows: component list, price, category, token count
4. You can **edit the template ID** on this screen if it's already taken
5. Click **Submit for review**

Review takes up to 48 hours.

---

## Set up auto-deploy (one-time)

After your first submission, set up GitHub auto-deploy so every `git push` updates your template automatically.

**The workflow file is already in the starter** at `.github/workflows/deploy.yml`. You just need to add your API key:

1. Get your key: [templateos.com/dashboard](https://templateos.com/dashboard) → copy from "API key & MCP setup"
2. In your GitHub repo: **Settings → Secrets and variables → Actions → New repository secret**
3. Name: `TEMPLATEOS_API_KEY`  
   Value: *paste your key*
4. Save

That's it. From now on:

```bash
# Make changes to components
# Bump version in templateos.config.ts
git add .
git commit -m "v1.1.0 — add DataTable component"
git push
# → packs, validates, syncs automatically
```

---

## Releasing updates

**You must bump the version before pushing.** The sync endpoint rejects a push if the version already exists.

| Change type | Example bump |
|-------------|-------------|
| Bug fix or visual tweak | `1.0.0` → `1.0.1` |
| New component added | `1.0.0` → `1.1.0` |
| Component renamed or removed | `1.0.0` → `2.0.0` |

Buyers on older versions:
- Their Claude keeps working with the version they purchased
- They see an **"X.X.X available"** notice in their dashboard
- They choose when to upgrade

---

## Required components by category

The local dev server shows your progress. These aren't hard-blocked — you can submit without them — but buyers expect them.

| Category | Required | Recommended |
|----------|----------|-------------|
| `marketing` | NavBar, HeroSection, Footer | FeatureSection, PricingSection, TestimonialsSection, CTASection |
| `saas` | NavBar, HeroSection, Footer, PricingSection | DashboardPage, FeatureSection, TestimonialsSection |
| `dashboard` | Sidebar, StatCard, DataTable | NavBar, Tabs, Breadcrumb, Badge |
| `ecommerce` | NavBar, ProductCard, Footer | HeroSection, Badge, Button |
| `docs` | NavBar, Sidebar, Footer | Breadcrumb, Button |
| `portfolio` | NavBar, HeroSection, Footer | ProjectCard |
| `blog` | NavBar, HeroSection, Footer | BlogCard, Button |
| `agency` | NavBar, HeroSection, Footer | ServiceCard, TestimonialsSection |

---

## Project structure

```
starter/
  components/              ← your components go here
    _cover.tsx             ← marketplace cover (optional, excluded from public list)
  app/
    page.tsx               ← showcase home — auto-discovers components/
    components/[name]/     ← per-component preview + code view
  scripts/
    pack.ts                ← npm run pack — creates the submission zip
    submit.ts              ← npm run submit — direct API submission
  .github/
    workflows/
      deploy.yml           ← auto-deploy on git push (add TEMPLATEOS_API_KEY secret)
  templateos.config.ts     ← template metadata, version, tokens
```

---

## FAQ

**Can I use component libraries like shadcn/ui or Radix?**  
Yes. Import them normally. Just make sure each component file is self-contained — don't import from other files in your `components/` folder.

**What if my component needs `useState` or `useEffect`?**  
Fine. The preview is a full React app. Just don't use Next.js-specific APIs (`next/image`, `next/router`, server components) since buyers may not be using Next.js.

**Can I have more than one "demo" component per file?**  
You can define as many helper components as you like inside the file. Only the `export default` function is treated as the demo.

**My component uses a custom font — will it show in the preview?**  
The preview loads via CDN. Stick to system fonts (`system-ui`, `sans-serif`) or fonts available via a `<link>` tag you can add inside the component. Google Fonts work if you add the link via a `useEffect`.

**How do buyers actually use my components?**  
They ask Claude: *"Add the DataTable component from my template to src/components/DataTable.tsx"*. Claude fetches the exact code, installs any packages, and writes the file. The buyer never needs to look at your GitHub repo.
