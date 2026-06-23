# Drop your HTML here

Already have an HTML template — a landing page, a purchased theme, a static site export?
Put it in this folder, then convert it to TemplateOS components with Claude Code.

```
html/
  index.html
  about.html
  css/styles.css
  images/...
```

Then, from the repo root, run the converter skill in Claude Code:

```
claude
> use the html-to-templateos skill to convert the template in ./html
```

Claude will inventory your pages and CSS, split each page into PascalCase section
components under `components/`, extract your colors/typography/spacing/radii into
`templateos.config.ts`, and keep your real content. Review the checkpoints it surfaces
(category + the section plan), then:

```
npm run dev     # preview at localhost:3000
npm run pack    # build <id>.zip → upload at templateos.com/submit/upload
```

This folder is just the conventional drop location — you can point the skill at any path.
Anything you leave here is ignored by `npm run pack`; only `components/` and
`templateos.config.ts` are packed.
