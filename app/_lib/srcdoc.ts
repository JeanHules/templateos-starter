// Shared iframe render harness — builds a self-contained HTML doc that compiles a
// component with Babel and renders it via an esm.sh importmap. Used by the /review
// page. (The single-component viewer keeps its own copy; keep these in sync.)

export function getComponentName(code: string): string | null {
  const match = code.match(
    /export\s+default\s+function\s+([A-Z]\w*)|(?:export\s+default\s+)?(?:function\s+([A-Z]\w*)|(?:const|let|var)\s+([A-Z]\w*)\s*=)/,
  );
  return match?.[1] ?? match?.[2] ?? match?.[3] ?? null;
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
    .replace(/^import\s+[^;]*?from\s+['"][./][^'"]*['"]\s*;?\r?\n?/gm, "")
    .replace(/^import\s+['"][./][^'"]*['"]\s*;?\r?\n?/gm, "")
    .replace(/export\s+default\s+function\s/g, "function ")
    .replace(/export\s+function\s/g, "function ")
    .replace(/^export\s+(const|let|var)\s+/gm, "$1 ")
    .replace(/^export\s+default\s+\w+\s*;?\r?\n?/gm, "")
    .replace(/^export\s*\{[^}]*\}\s*;?\r?\n?/gm, "");
}

export function buildSrcdoc(code: string, entryName: string): string {
  const pkgs = extractPackageImports(code);
  let prepared = prepareCode(code);

  if (!prepared.includes("from 'react'") && !prepared.includes('from "react"')) {
    prepared = `import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';\n${prepared}`;
  }

  const imports: Record<string, string> = {
    react: "https://esm.sh/react@18",
    "react-dom": "https://esm.sh/react-dom@18",
    "react-dom/client": "https://esm.sh/react-dom@18/client",
    "react/jsx-runtime": "https://esm.sh/react@18/jsx-runtime",
    "react/jsx-dev-runtime": "https://esm.sh/react@18/jsx-dev-runtime",
  };
  for (const pkg of pkgs) {
    if (!imports[pkg]) imports[pkg] = `https://esm.sh/${pkg}`;
  }

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
          [Babel.availablePresets['typescript'], { allExtensions: true, isTSX: true }]
        ]
      });
      var src = \`${safeCode}\`;
      var render = "import{createRoot}from'react-dom/client';createRoot(document.getElementById('root')).render(<${entryName}/>);";
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
