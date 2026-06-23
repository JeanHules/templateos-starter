"use client";

import { useState, useCallback } from "react";

// ─── iframe utilities ─────────────────────────────────────────────────────────

function getComponentName(code: string): string | null {
  // Find the default export (what we render) first — not the first helper/const above it.
  let m = code.match(/export\s+default\s+function\s+([A-Z]\w*)/);
  if (m) return m[1];
  m = code.match(/export\s+default\s+([A-Z]\w*)\b/);
  if (m) return m[1];
  m = code.match(/export\s+(?:function|const|let|var)\s+([A-Z]\w*)/);
  return m?.[1] ?? null;
}

function extractPackageImports(code: string): string[] {
  const sources: string[] = [];
  for (const m of code.matchAll(/from\s+['"]([^'"]+)['"]/g)) {
    const src = m[1];
    if (!src.startsWith(".") && !src.startsWith("/")) sources.push(src);
  }
  return [...new Set(sources)];
}

function prepareCode(code: string): string {
  return code
    // Strip local/relative imports only — keep package imports for esm.sh resolution
    .replace(/^import\s+[^;]*?from\s+['"][./][^'"]*['"]\s*;?\r?\n?/gm, "")
    // Strip side-effect local imports
    .replace(/^import\s+['"][./][^'"]*['"]\s*;?\r?\n?/gm, "")
    // Strip exports
    .replace(/export\s+default\s+function\s/g, "function ")
    .replace(/export\s+function\s/g, "function ")
    .replace(/^export\s+(const|let|var)\s+/gm, "$1 ")
    .replace(/^export\s+default\s+\w+\s*;?\r?\n?/gm, "")
    .replace(/^export\s*\{[^}]*\}\s*;?\r?\n?/gm, "");
}

function buildSrcdoc(code: string, name: string): string {
  const pkgs = extractPackageImports(code);
  let prepared = prepareCode(code);

  // If no react import exists, add a broad one so hooks work without explicit imports
  if (!prepared.includes("from 'react'") && !prepared.includes('from "react"')) {
    prepared = `import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';\n${prepared}`;
  }

  // Build importmap — known packages + anything else maps to esm.sh
  const imports: Record<string, string> = {
    "react": "https://esm.sh/react@18",
    "react-dom": "https://esm.sh/react-dom@18",
    "react-dom/client": "https://esm.sh/react-dom@18/client",
    "react/jsx-runtime": "https://esm.sh/react@18/jsx-runtime",
    "react/jsx-dev-runtime": "https://esm.sh/react@18/jsx-dev-runtime",
  };
  for (const pkg of pkgs) {
    if (!imports[pkg]) imports[pkg] = `https://esm.sh/${pkg}`;
  }

  // Safely embed component source in a JS template literal
  const safeCode = prepared
    .replace(/\\/g, "\\\\")
    .replace(/`/g, "\\`")
    .replace(/\$\{/g, "\\${");

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <script src="https://cdn.tailwindcss.com"><\/script>
  <script type="importmap">${JSON.stringify({ imports })}<\/script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"><\/script>
  <style>
    body { margin: 0; padding: 0; background: #fff; font-family: system-ui, sans-serif; }
    #err { color: #dc2626; font-size: 11px; padding: 8px 12px; background: #fef2f2; border-radius: 6px; white-space: pre-wrap; margin: 8px; display: none; }
  <\/style>
</head>
<body>
  <div id="root"></div>
  <div id="err"></div>
  <script>
    window.addEventListener('error', function(e) {
      var el = document.getElementById('err');
      el.style.display = 'block';
      el.textContent = e.message;
    });
    window.addEventListener('unhandledrejection', function(e) {
      var el = document.getElementById('err');
      el.style.display = 'block';
      el.textContent = String(e.reason);
    });
    try {
      Babel.registerPreset('tsx', {
        presets: [
          [Babel.availablePresets['react'], { runtime: 'automatic' }],
          // .tsx filename drives JSX detection; allExtensions/isTSX were removed in newer Babel.
          [Babel.availablePresets['typescript']]
        ]
      });
      var src = \`${safeCode}\`;
      var render = "import{createRoot}from'react-dom/client';createRoot(document.getElementById('root')).render(<${name}/>);";
      var compiled = Babel.transform(src + '\\n\\n' + render, {
        presets: ['tsx'],
        filename: 'component.tsx',
      }).code;
      var s = document.createElement('script');
      s.type = 'module';
      s.textContent = compiled;
      document.head.appendChild(s);
    } catch(e) {
      document.getElementById('err').style.display = 'block';
      document.getElementById('err').textContent = String(e);
    }
  <\/script>
</body>
</html>`;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function ComponentViewer({ name, code }: { name: string; code: string }) {
  const [tab, setTab] = useState<"preview" | "code">("preview");
  const [copied, setCopied] = useState(false);

  const componentName = getComponentName(code) ?? name;
  const srcdoc = buildSrcdoc(code, componentName);

  const copyCode = useCallback(async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

  return (
    <main className="flex-1 flex flex-col overflow-hidden bg-stone-50">
      <div className="flex-shrink-0 bg-white border-b border-stone-200 px-6 py-3 flex items-center justify-between">
        <p className="text-sm font-semibold text-stone-900">{name}</p>
        <div className="flex items-center gap-2">
          <div className="flex bg-stone-100 rounded-lg p-0.5">
            {(["preview", "code"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`h-7 px-3 text-xs font-medium rounded-md transition-colors capitalize ${
                  tab === t ? "bg-white text-stone-900 shadow-sm" : "text-stone-500 hover:text-stone-700"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <button
            onClick={copyCode}
            className={`flex items-center gap-1.5 h-8 px-3 text-xs font-medium rounded-lg border transition-all ${
              copied
                ? "border-emerald-200 text-emerald-600 bg-emerald-50"
                : "border-stone-200 text-stone-600 bg-white hover:bg-stone-50"
            }`}
          >
            {copied ? "✓ Copied!" : "Copy"}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {tab === "preview" ? (
          <div className="rounded-xl overflow-hidden border border-stone-200 bg-white shadow-sm">
            <iframe
              key={name}
              srcDoc={srcdoc}
              sandbox="allow-scripts"
              className="w-full border-0 block"
              style={{ height: 540 }}
              title={name}
            />
          </div>
        ) : (
          <div className="rounded-xl overflow-hidden border border-stone-200 shadow-sm">
            <div className="flex items-center justify-between px-4 py-2.5 bg-stone-800 border-b border-stone-700">
              <span className="text-xs font-mono text-stone-400">{name}.tsx</span>
              <span className="text-[10px] text-stone-500">{code.split("\n").length} lines</span>
            </div>
            <pre className="overflow-auto text-xs leading-relaxed p-5 bg-stone-900 text-stone-200 m-0" style={{ maxHeight: 520 }}>
              <code>{code}</code>
            </pre>
          </div>
        )}
      </div>
    </main>
  );
}
