/**
 * Pack your component library into a zip file for upload to TemplateOS.
 *
 * Usage:
 *   npm run pack
 *
 * Output: <id>.zip  (ready to upload at templateos.com/submit/upload)
 */

import fs from "fs";
import path from "path";
import { zipSync, strToU8 } from "fflate";
import { verifyAll } from "./verify";

async function main() {
  const configPath = path.join(process.cwd(), "templateos.config.ts");
  if (!fs.existsSync(configPath)) {
    console.error("templateos.config.ts not found.");
    process.exit(1);
  }

  const { default: config } = await import(configPath);

  const componentsDir = path.join(process.cwd(), "components");
  if (!fs.existsSync(componentsDir)) {
    console.error("components/ directory not found.");
    process.exit(1);
  }

  const allFiles = fs.readdirSync(componentsDir).filter((f: string) => f.endsWith(".tsx"));
  const files = allFiles.filter((f: string) => !f.startsWith("_"));
  const coverFile = allFiles.find((f: string) => f === "_cover.tsx");

  if (files.length === 0) {
    console.error("No components found in components/");
    process.exit(1);
  }

  // Gate: every shipped component must compile in isolation before we zip.
  // A buyer's agent receives each component as a single self-contained file, so
  // a stray local import or type error here means a broken download downstream.
  if (!process.argv.includes("--skip-verify")) {
    const verify = await verifyAll(process.cwd());
    if (!verify.ok) {
      console.error("\n✗ Not packing — these components don't compile:\n");
      for (const r of verify.results.filter((x) => !x.ok)) {
        console.error(`  ✗ ${r.name}`);
        for (const e of r.errors) console.error(`      ${e}`);
      }
      console.error("\nRun `npm run verify` for the full report, or `npm run pack -- --skip-verify` to override.\n");
      process.exit(1);
    }
    console.log(`✓ Verified ${verify.results.length} component${verify.results.length === 1 ? "" : "s"} compile.`);
  }

  const zipEntries: Record<string, Uint8Array> = {};

  // templateos.json — metadata manifest (price converted to cents)
  const manifest = {
    id: config.id,
    name: config.name,
    description: config.description,
    category: config.category,
    version: config.version ?? "1.0.0",
    price: Math.round(config.price * 100),
    tags: config.tags ?? [],
    figmaUrl: config.figmaUrl ?? undefined,
    tokens: config.tokens,
  };
  zipEntries["templateos.json"] = strToU8(JSON.stringify(manifest, null, 2));

  // components/*.tsx (public) + _cover.tsx if present
  for (const file of files) {
    const code = fs.readFileSync(path.join(componentsDir, file), "utf-8");
    zipEntries[`components/${file}`] = strToU8(code);
  }
  if (coverFile) {
    const code = fs.readFileSync(path.join(componentsDir, coverFile), "utf-8");
    zipEntries[`components/_cover.tsx`] = strToU8(code);
  }

  const zipped = zipSync(zipEntries, { level: 6 });
  const outPath = path.join(process.cwd(), `${config.id}.zip`);
  fs.writeFileSync(outPath, zipped);

  console.log(`\n✓ Packed ${files.length} component${files.length === 1 ? "" : "s"} → ${config.id}.zip`);
  console.log(`  Components: ${files.map((f: string) => f.replace(".tsx", "")).join(", ")}`);
  if (coverFile) console.log(`  Cover:      _cover.tsx included`);
  console.log(`\n  Upload at: https://templateos.com/submit/upload\n`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
