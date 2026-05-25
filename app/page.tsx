import fs from "fs";
import path from "path";
import config from "../templateos.config";
import ShowcaseClient from "./ShowcaseClient";

function getComponents(): string[] {
  const dir = path.join(process.cwd(), "components");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".tsx") && !f.startsWith("_"))
    .map((f) => f.replace(".tsx", ""))
    .sort();
}

export default function ShowcasePage() {
  const components = getComponents();
  const colorTokens = Object.entries(config.tokens.colors).map(([key, token]) => ({
    key,
    value: token.value,
  }));

  return (
    <ShowcaseClient
      components={components}
      templateName={config.name}
      templateCategory={config.category}
      templateId={config.id}
      templateDescription={config.description}
      templateTags={config.tags}
      colorTokens={colorTokens}
    />
  );
}
