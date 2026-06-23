import fs from "fs";
import path from "path";
import config from "../../templateos.config";
import { ReviewClient } from "./ReviewClient";

function getComponents(): { name: string; code: string }[] {
  const dir = path.join(process.cwd(), "components");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".tsx") && !f.startsWith("_"))
    .map((f) => ({
      name: f.replace(".tsx", ""),
      code: fs.readFileSync(path.join(dir, f), "utf-8"),
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export default function ReviewPage() {
  const components = getComponents();
  return (
    <ReviewClient
      components={components}
      templateName={config.name}
      templateId={config.id}
    />
  );
}
