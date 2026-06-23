"use client";

import { useState } from "react";
import { buildSrcdoc, getComponentName } from "../_lib/srcdoc";

interface ReviewClientProps {
  components: { name: string; code: string }[];
  templateName: string;
  templateId: string;
}

export function ReviewClient({ components, templateName, templateId }: ReviewClientProps) {
  const [copied, setCopied] = useState(false);

  async function copyBuild() {
    await navigator.clipboard.writeText("npm run pack");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (components.length === 0) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-stone-900 font-semibold mb-1">Nothing to review yet</p>
          <p className="text-sm text-stone-500">
            Generate components first, then refresh this page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Sticky header with the build handoff */}
      <header className="sticky top-0 z-30 border-b border-stone-200 bg-white/95 backdrop-blur">
        <div className="mx-auto max-w-6xl px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <span className="text-sm font-semibold text-stone-900 truncate">{templateName}</span>
            <span className="text-xs text-stone-400 bg-stone-100 rounded-full px-2 py-0.5 shrink-0">
              {components.length} component{components.length !== 1 ? "s" : ""} to review
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="hidden sm:inline text-xs text-stone-500">Happy with it?</span>
            <button
              onClick={copyBuild}
              className={`inline-flex items-center gap-2 h-8 px-3 text-xs font-medium rounded-lg border transition-all ${
                copied
                  ? "border-emerald-200 text-emerald-600 bg-emerald-50"
                  : "border-stone-200 text-stone-700 bg-white hover:bg-stone-50"
              }`}
              title="Copy the build command"
            >
              <code className="font-mono">{copied ? "✓ copied" : "npm run pack"}</code>
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-8 flex gap-8">
        {/* Jump nav */}
        <nav className="hidden lg:block w-48 shrink-0">
          <div className="sticky top-20">
            <p className="px-2 mb-2 text-[10px] font-semibold text-stone-400 uppercase tracking-widest">
              Components
            </p>
            <div className="space-y-0.5">
              {components.map((c) => (
                <a
                  key={c.name}
                  href={`#c-${c.name}`}
                  className="block px-2 py-1.5 rounded-md text-sm text-stone-600 hover:bg-stone-100 hover:text-stone-900 transition-colors truncate"
                >
                  {c.name}
                </a>
              ))}
            </div>
          </div>
        </nav>

        {/* Stacked previews */}
        <div className="flex-1 min-w-0 space-y-8">
          <div className="rounded-xl border border-amber-200 bg-amber-50 px-5 py-4">
            <p className="text-sm font-semibold text-amber-900">Review your kit</p>
            <p className="mt-1 text-sm text-amber-800">
              Scroll through every component below. To adjust anything, tell your agent what to
              change. When it all looks right, run{" "}
              <code className="font-mono bg-white/70 rounded px-1.5 py-0.5">npm run pack</code> to build the zip.
            </p>
          </div>

          {components.map((c) => {
            const entry = getComponentName(c.code) ?? c.name;
            return (
              <section key={c.name} id={`c-${c.name}`} className="scroll-mt-20">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-sm font-semibold text-stone-900">{c.name}</h2>
                  <span className="text-xs text-stone-400 font-mono">{c.name}.tsx</span>
                </div>
                <div className="rounded-xl overflow-hidden border border-stone-200 bg-white shadow-sm">
                  <iframe
                    srcDoc={buildSrcdoc(c.code, entry)}
                    sandbox="allow-scripts"
                    className="w-full border-0 block"
                    style={{ height: 520 }}
                    title={c.name}
                    loading="lazy"
                  />
                </div>
              </section>
            );
          })}

          <div className="rounded-xl border border-stone-200 bg-white px-5 py-4 text-center">
            <p className="text-sm text-stone-600">
              Looks good? Build it:{" "}
              <code className="font-mono bg-stone-100 rounded px-1.5 py-0.5">npm run pack</code>{" "}
              <span className="text-stone-400">→ {templateId}.zip</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
