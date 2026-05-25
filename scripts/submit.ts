/**
 * Submit your component library to the TemplateOS marketplace.
 *
 * Usage:
 *   TEMPLATEOS_API_KEY=sk-tos-... npm run submit
 *
 * Or set TEMPLATEOS_API_KEY in a .env.local file.
 */

import fs from "fs";
import path from "path";

const API_BASE = process.env.TEMPLATEOS_URL ?? "https://templateos.com";
const API_KEY = process.env.TEMPLATEOS_API_KEY;

async function main() {
  if (!API_KEY) {
    console.error("Error: TEMPLATEOS_API_KEY is not set.");
    console.error("Get your key at templateos.com/dashboard");
    process.exit(1);
  }

  // Load config
  const configPath = path.join(process.cwd(), "templateos.config.ts");
  if (!fs.existsSync(configPath)) {
    console.error("templateos.config.ts not found.");
    process.exit(1);
  }

  // Dynamic import to resolve TypeScript
  const { default: config } = await import(configPath);

  // Load components
  const componentsDir = path.join(process.cwd(), "components");
  if (!fs.existsSync(componentsDir)) {
    console.error("components/ directory not found.");
    process.exit(1);
  }

  const files = fs
    .readdirSync(componentsDir)
    .filter((f: string) => f.endsWith(".tsx") && !f.startsWith("_"));

  if (files.length === 0) {
    console.error("No components found in components/");
    process.exit(1);
  }

  const components = files.map((file: string) => {
    const name = file.replace(".tsx", "");
    const code = fs.readFileSync(path.join(componentsDir, file), "utf-8");
    return { name, description: `${name} component`, code };
  });

  console.log(`\nSubmitting ${config.name} with ${components.length} components…`);
  console.log(`Components: ${components.map((c: { name: string }) => c.name).join(", ")}\n`);

  const payload = {
    id: config.id,
    name: config.name,
    description: config.description,
    category: config.category,
    tags: config.tags,
    price: Math.round(config.price * 100), // dollars → cents
    figmaUrl: config.figmaUrl,
    tokens: config.tokens,
    components,
  };

  const res = await fetch(`${API_BASE}/api/submit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    console.error("Submission failed:", data.error ?? res.statusText);
    if (data.issues) {
      console.error("Validation issues:", JSON.stringify(data.issues, null, 2));
    }
    process.exit(1);
  }

  console.log(`✓ Template submitted: ${data.id}`);
  console.log(`View it at: ${API_BASE}/admin/submissions`);
  console.log("\nYou'll receive an email when it's been reviewed (usually within 48 hours).");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
