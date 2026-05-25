import fs from "fs";
import path from "path";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ComponentViewer } from "./ComponentViewer";

function getComponentCode(name: string): string | null {
  const file = path.join(process.cwd(), "components", `${name}.tsx`);
  if (!fs.existsSync(file)) return null;
  return fs.readFileSync(file, "utf-8");
}

export default async function ComponentPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const code = getComponentCode(name);
  if (!code) notFound();

  const allComponents = fs
    .readdirSync(path.join(process.cwd(), "components"))
    .filter((f) => f.endsWith(".tsx") && !f.startsWith("_"))
    .map((f) => f.replace(".tsx", ""))
    .sort();

  const currentIndex = allComponents.indexOf(name);
  const prev = currentIndex > 0 ? allComponents[currentIndex - 1] : null;
  const next = currentIndex < allComponents.length - 1 ? allComponents[currentIndex + 1] : null;

  return (
    <div className="flex flex-col h-screen bg-white overflow-hidden">
      {/* Header */}
      <header className="flex-shrink-0 h-14 border-b border-slate-200 flex items-center justify-between px-6">
        <nav className="flex items-center gap-2 text-sm">
          <Link href="/" className="font-bold text-slate-900">
            TemplateOS Starter
          </Link>
          <span className="text-slate-300">/</span>
          <span className="text-slate-900">{name}</span>
        </nav>
        <div className="flex items-center gap-4">
          {prev && (
            <Link href={`/components/${prev}`} className="text-xs text-slate-400 hover:text-slate-700 transition-colors">
              ← {prev}
            </Link>
          )}
          {next && (
            <Link href={`/components/${next}`} className="text-xs text-slate-400 hover:text-slate-700 transition-colors">
              {next} →
            </Link>
          )}
        </div>
      </header>

      {/* Two-column viewer */}
      <div className="flex flex-1 overflow-hidden" style={{ height: "calc(100vh - 57px)" }}>
        {/* Sidebar: component list */}
        <aside className="w-56 flex-shrink-0 border-r border-slate-200 overflow-y-auto bg-white">
          <div className="px-3 py-4">
            <p className="px-2 mb-2 text-[10px] font-semibold text-slate-400 uppercase tracking-widest">
              Components
            </p>
            <nav className="space-y-0.5">
              {allComponents.map((c) => (
                <Link
                  key={c}
                  href={`/components/${c}`}
                  className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                    c === name
                      ? "bg-slate-900 text-white font-medium"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  {c}
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main: interactive preview */}
        <ComponentViewer name={name} code={code} />
      </div>
    </div>
  );
}
