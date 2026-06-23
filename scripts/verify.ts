/**
 * Verify your components compile in isolation before packing.
 *
 * Each component must be self-contained — exactly how a buyer's AI agent
 * receives it: one file, no imports from other local files. This catches the
 * failures that make a component unusable downstream (a stray `@/...` import, a
 * type error, a missing npm package) before you zip or publish.
 *
 * Usage:
 *   npm run verify            # check components/, print a report
 *
 * `npm run pack` runs this automatically and refuses to zip if anything fails.
 */

import fs from "fs";
import os from "os";
import path from "path";
import { spawnSync } from "child_process";

const BUILTIN = new Set(["react", "react-dom", "next", "react/jsx-runtime"]);

interface Scan {
  packages: string[];
  localImports: string[];
}

/** Same rules as packages/pipeline/src/build-verify/scan-deps.ts — keep in sync. */
function scanImports(code: string): Scan {
  const packages: string[] = [];
  const localImports: string[] = [];
  for (const m of code.matchAll(/\bfrom\s+['"]([^'"]+)['"]/g)) {
    const src = m[1];
    if (src.startsWith(".") || src.startsWith("/") || src.startsWith("@/")) {
      if (!localImports.includes(src)) localImports.push(src);
      continue;
    }
    const pkg = src.startsWith("@") ? src.split("/").slice(0, 2).join("/") : src.split("/")[0];
    if (!BUILTIN.has(pkg) && !packages.includes(pkg)) packages.push(pkg);
  }
  return { packages, localImports };
}

export interface ComponentResult {
  name: string;
  ok: boolean;
  errors: string[];
}

export interface VerifyResult {
  ok: boolean;
  results: ComponentResult[];
}

const TSCONFIG = {
  compilerOptions: {
    target: "es2020",
    lib: ["es2020", "dom", "dom.iterable"],
    jsx: "react-jsx",
    module: "esnext",
    moduleResolution: "bundler",
    esModuleInterop: true,
    skipLibCheck: true,
    noEmit: true,
    strict: false,
    types: [] as string[],
  },
  include: ["*.tsx"],
};

/** The files `npm run pack` ships: public components + _cover (if present). */
function shippedComponents(componentsDir: string): { name: string; file: string }[] {
  const all = fs.readdirSync(componentsDir).filter((f) => f.endsWith(".tsx"));
  const out = all.filter((f) => !f.startsWith("_")).map((f) => ({ name: f.replace(".tsx", ""), file: f }));
  if (all.includes("_cover.tsx")) out.push({ name: "_cover", file: "_cover.tsx" });
  return out;
}

export async function verifyAll(cwd = process.cwd()): Promise<VerifyResult> {
  const componentsDir = path.join(cwd, "components");
  if (!fs.existsSync(componentsDir)) {
    return { ok: false, results: [{ name: "(setup)", ok: false, errors: ["components/ directory not found"] }] };
  }
  const nodeModules = path.join(cwd, "node_modules");
  const tscBin = path.join(nodeModules, ".bin", "tsc");
  if (!fs.existsSync(tscBin)) {
    return { ok: false, results: [{ name: "(setup)", ok: false, errors: ["TypeScript not installed — run `npm install`"] }] };
  }

  const files = shippedComponents(componentsDir);
  if (files.length === 0) {
    return { ok: false, results: [{ name: "(setup)", ok: false, errors: ["No components found in components/"] }] };
  }

  const byFile = new Map<string, ComponentResult>();
  for (const { name, file } of files) {
    byFile.set(file, { name, ok: true, errors: [] });
    const code = fs.readFileSync(path.join(componentsDir, file), "utf-8");
    const { localImports } = scanImports(code);
    if (localImports.length) {
      const r = byFile.get(file)!;
      r.ok = false;
      r.errors.push(`imports local/aliased modules a buyer won't have: ${localImports.join(", ")} — inline them instead`);
    }
  }

  // Scratch project that borrows this repo's installed react types + tsc.
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "tos-verify-"));
  try {
    fs.symlinkSync(nodeModules, path.join(tmp, "node_modules"), "dir");
    fs.writeFileSync(path.join(tmp, "tsconfig.json"), JSON.stringify(TSCONFIG, null, 2));
    for (const { file } of files) {
      fs.copyFileSync(path.join(componentsDir, file), path.join(tmp, file));
    }

    const res = spawnSync(tscBin, ["--noEmit", "--pretty", "false", "-p", "tsconfig.json"], {
      cwd: tmp,
      encoding: "utf-8",
    });
    const output = `${res.stdout ?? ""}${res.stderr ?? ""}`;
    attachTscErrors(output, byFile);
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }

  const results = [...byFile.values()];
  return { ok: results.every((r) => r.ok), results };
}

function attachTscErrors(output: string, byFile: Map<string, ComponentResult>) {
  const re = /^([^(]+\.tsx)\((\d+),\d+\): error (TS\d+): (.+)$/;
  for (const raw of output.split("\n")) {
    const m = raw.match(re);
    if (!m) continue;
    const [, file, ln, codeId, message] = m;
    const result = byFile.get(path.basename(file));
    if (!result) continue;
    // local-import TS2307 already reported with a friendlier message
    if (codeId === "TS2307" && /Cannot find module ['"](\.|\/|@\/)/.test(message)) continue;
    result.ok = false;
    if (codeId === "TS2307" && /Cannot find module/.test(message)) {
      result.errors.push(`L${ln}: ${message} — add it to package.json and \`npm install\``);
    } else {
      result.errors.push(`L${ln} ${codeId}: ${message}`);
    }
  }
}

function printReport(result: VerifyResult): void {
  const pass = result.results.filter((r) => r.ok).length;
  console.log(`\nVerifying ${result.results.length} component${result.results.length === 1 ? "" : "s"}…\n`);
  for (const r of result.results) {
    console.log(`  ${r.ok ? "✓" : "✗"} ${r.name}`);
    for (const e of r.errors) console.log(`      ${e}`);
  }
  if (result.ok) {
    console.log(`\n✓ All ${pass} components compile. Ready to pack.\n`);
  } else {
    console.log(`\n✗ ${result.results.length - pass} component(s) failed. Fix the above, then re-run.\n`);
  }
}

// Run directly: `npm run verify`
if (process.argv[1] && /verify\.ts$/.test(process.argv[1])) {
  verifyAll()
    .then((result) => {
      printReport(result);
      process.exit(result.ok ? 0 : 1);
    })
    .catch((e) => {
      console.error(e);
      process.exit(1);
    });
}
