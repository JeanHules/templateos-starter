# Gemini guide

This is a **TemplateOS starter** — a React + Tailwind component library. Components are single
self-contained `.tsx` files in `components/` (default export, zero-prop render, Tailwind only,
no local imports — see `.claude/skills/html-to-templateos/reference.md`).

## Build a kit from a dropped template

When the user drops a template into `./html` and wants a component kit, follow
**[CONVERT.md](CONVERT.md)** end to end: generate the kit → `npm run verify` (loop until it
passes) → `npm run dev` → then STOP and tell them to review at
http://localhost:3000/review and run `npm run pack` when happy. Do not run `npm run pack`
yourself; the author reviews first.

## Commands

- `npm run dev` — preview the gallery + `/review`
- `npm run verify` — type-check every component in isolation
- `npm run pack` — verify, then zip the kit
- `npm run submit` — push the verified zip to TemplateOS
