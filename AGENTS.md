# Agent guide (Codex & others)

This is a **TemplateOS starter** — a React + Tailwind component library you build and sell on
TemplateOS. Components are single self-contained `.tsx` files in `components/` (default export,
zero-prop render, Tailwind only, no local imports — see
`.claude/skills/html-to-templateos/reference.md`).

## Build a kit from a dropped template

If the user dropped a template into `./html` and wants it turned into a component kit, follow
**[CONVERT.md](CONVERT.md)** end to end: generate → `npm run verify` (loop until clean) →
`npm run dev` → stop and tell them to review at http://localhost:3000/review, then run
`npm run pack`. Do not run `npm run pack` yourself; the author reviews first.

## Commands

- `npm run dev` — preview the gallery + `/review` at http://localhost:3000
- `npm run verify` — type-check every component in isolation (must pass before packing)
- `npm run pack` — verify, then zip the kit → `<id>.zip`
- `npm run submit` — push the verified zip to TemplateOS (needs `TEMPLATEOS_API_KEY`)
