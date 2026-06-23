---
name: build-from-template
description: One command to turn a dropped template into a complete TemplateOS component kit. Convert the template in ./html into components, generate any missing pieces in the template's own style, self-verify until everything compiles, start the preview, then hand off to the author to review at localhost:3000/review and build. Use when the user says "build my kit", "convert my template", or drops a template into ./html and wants the whole flow.
---

# Build a TemplateOS kit from a template — one command

This is the single entry point for the author flow. The author dropped a template into
`./html` and wants a complete, coherent, buildable component library with minimal hand-holding.
You do the work end to end and stop at exactly one place: the review handoff.

Run these stages in order. Stage 4 is a hard STOP — you hand back to the human there.

## Stage 1 — Generate the kit

Convert the template in `./html` into components, following the **html-to-templateos** skill
and its `reference.md` (`.claude/skills/html-to-templateos/`). That skill is the conversion
engine; read it and apply it. The target is a **complete kit**, not just the sections that
happen to exist in the source:

- **Derive the style guide once** — tokens (colors/typography/spacing/radii) + recurring
  patterns. Write tokens into `templateos.config.ts`.
- **Extract** the static structural components that exist in the template (NavBar, Hero,
  Footer, cards, pricing) → `components/*.tsx`.
- **Generate** the rest **in the derived style**: interactive components (Modal, Tabs,
  Carousel, Select) and any component the template lacks but the category expects (see the
  category checklist in `reference.md`). A component the source doesn't have should still be
  produced, styled to match the template's look.

Every component must follow the format rules in `reference.md`: single self-contained `.tsx`,
default export, renders with zero props, Tailwind only, **no local imports**, inline SVGs.

## Stage 2 — Verify and self-heal (loop)

Run:

```bash
npm run verify
```

This type-checks every component in isolation — exactly how a buyer's agent receives them.
For each component it reports as failing:

- **local/aliased import** (`@/…`, `./…`) → inline whatever it referenced; components must be
  self-contained.
- **type error** → fix it.
- **missing npm package** → either add it to `package.json` (and tell the author) or, better,
  remove the dependency and inline an SVG/helper.

Re-run `npm run verify` after fixes. **Loop until it exits clean.** Do not move on with any
failing component — a component that fails here is broken for every buyer.

## Stage 3 — Start the preview (non-blocking)

`npm run dev` is a long-running server — **do not run it in the foreground**, it will block
the session. If your tool can run background processes (Claude Code: run it backgrounded), start
it now:

```bash
npm run dev      # background only — serves http://localhost:3000
```

If your tool can't cleanly background a process, skip this — just tell the author to run
`npm run dev` themselves in the handoff. Either way, never wait on the server.

## Stage 4 — Hand off to review  ·  STOP

Stop and tell the author, in these words (include the dev step if you didn't start it):

> Your kit is ready — **N components**, all verified to compile.
> Run **`npm run dev`** (if it isn't already running) and review every component at
> **http://localhost:3000/review**.
> Tell me anything you want changed and I'll update it and re-verify.
> When it all looks right, run **`npm run pack`** to build the zip.

Do **not** run `npm run pack` yourself. The author reviews first — that's the whole point of
the handoff. If they ask for changes, edit the components, re-run Stage 2 (verify), and point
them back at `/review`.

## Stage 5 — Build (only when the author says so)

If the author confirms they're happy and asks you to build, run `npm run pack` and report the
output zip. Otherwise leave it to them. (Phase 2: `npm run submit` pushes the verified zip to
TemplateOS via the CLI.)
