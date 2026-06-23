# Convert a template into a TemplateOS kit (canonical procedure)

This is the tool-agnostic version of the build flow. Claude Code runs it via the
`build-from-template` skill; Codex and Gemini follow this file directly. The deterministic
steps are npm scripts, so the procedure is identical across tools.

**Goal:** the author dropped a template into `./html` and wants a complete, coherent,
buildable component library. Do the work end to end and stop only at the review handoff.

## Steps

1. **Generate the kit.** Convert the template in `./html` into components, following the rules
   in `.claude/skills/html-to-templateos/reference.md`. Produce a *complete* kit:
   - Derive the design language once — tokens (colors, typography, spacing, radii) + recurring
     patterns. Write tokens into `templateos.config.ts`.
   - **Extract** the static structural components present in the template (NavBar, Hero,
     Footer, cards, pricing) into `components/*.tsx`.
   - **Generate**, in that same style, the interactive components (Modal, Tabs, Carousel,
     Select) and any component the category kit expects but the template lacks (reference.md →
     "Category kit" + "Building a complete kit").
   - Format rules (non-negotiable): one self-contained `.tsx` per component, default export,
     renders with zero props, Tailwind only, **no local imports**, inline SVG icons.

2. **Verify and self-heal.** Run `npm run verify`. Fix every failure (inline local imports,
   fix type errors, drop missing-package imports), then re-run. **Loop until it passes.** A
   failing component is broken for every buyer — never proceed with one.

3. **Start the preview (non-blocking).** `npm run dev` is a long-running server — only start it
   if your tool can background processes; never run it in the foreground or wait on it. If you
   can't background it, skip and tell the author to run `npm run dev` themselves in step 4.

4. **Hand off — STOP.** Tell the author: their kit is ready (N components, all verified); to
   review every component at **http://localhost:3000/review**; that they can ask you for
   changes (edit, then re-verify); and that when it looks right they run **`npm run pack`** to
   build the zip. Do not run `npm run pack` yourself.

5. **Build only on request.** If the author says they're happy and asks you to build, run
   `npm run pack`. (Phase 2: `npm run submit` pushes the verified zip to TemplateOS.)
