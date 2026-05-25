"use client";

import { useState } from "react";
import Link from "next/link";

const CATEGORIES = [
  "marketing", "saas", "dashboard", "ecommerce", "docs", "portfolio", "blog", "agency",
] as const;

type Category = (typeof CATEGORIES)[number];

const REQUIREMENTS: Record<Category, { required: string[]; recommended: string[] }> = {
  marketing: {
    required: ["NavBar", "HeroSection", "FeatureSection", "Footer", "Button"],
    recommended: ["TestimonialsSection", "PricingSection", "CTASection", "FAQSection", "LogoSection", "StatsSection", "BlogCard", "AnnouncementBar"],
  },
  saas: {
    required: ["NavBar", "HeroSection", "FeatureSection", "PricingSection", "Footer", "Button", "Badge"],
    recommended: ["TestimonialsSection", "FAQSection", "CTASection", "Modal", "Toast", "Tabs", "Avatar", "Toggle"],
  },
  dashboard: {
    required: ["Sidebar", "NavBar", "StatCard", "DataTable", "Button", "Badge", "Tabs", "Breadcrumb"],
    recommended: ["ActivityFeed", "CommandMenu", "PageHeader", "Modal", "Toast", "EmptyState", "Pagination", "Avatar"],
  },
  ecommerce: {
    required: ["NavBar", "ProductCard", "Footer", "Button", "Badge"],
    recommended: ["CartDrawer", "ProductGrid", "ReviewCard", "Breadcrumb", "Modal", "Toast"],
  },
  docs: {
    required: ["NavBar", "Sidebar", "Footer", "Button", "Breadcrumb"],
    recommended: ["SearchModal", "CodeBlock", "Callout", "Pagination", "Tabs", "Badge"],
  },
  portfolio: {
    required: ["NavBar", "HeroSection", "ProjectCard", "Footer"],
    recommended: ["TestimonialsSection", "CTASection", "StatsSection", "Avatar", "Badge"],
  },
  blog: {
    required: ["NavBar", "HeroSection", "BlogCard", "Footer", "Button"],
    recommended: ["NewsletterSection", "AuthorCard", "TagList", "Pagination", "Badge"],
  },
  agency: {
    required: ["NavBar", "HeroSection", "ServiceCard", "Footer", "Button"],
    recommended: ["TestimonialsSection", "TeamSection", "CTASection", "StatsSection", "Badge"],
  },
};

interface ShowcaseClientProps {
  components: string[];
  templateName: string;
  templateCategory: string;
  templateId: string;
  templateDescription: string;
  templateTags: string[];
  colorTokens: Array<{ key: string; value: string }>;
}

export default function ShowcaseClient({
  components,
  templateName,
  templateCategory,
  templateId,
  templateDescription,
  templateTags,
  colorTokens,
}: ShowcaseClientProps) {
  const [activeCategory, setActiveCategory] = useState<Category>(
    (CATEGORIES.includes(templateCategory as Category) ? templateCategory : "marketing") as Category
  );

  const componentSet = new Set(components);
  const { required, recommended } = REQUIREMENTS[activeCategory];
  const requiredMet = required.filter((c) => componentSet.has(c)).length;
  const recommendedMet = recommended.filter((c) => componentSet.has(c)).length;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-stone-200 bg-white/95 backdrop-blur">
        <div className="mx-auto max-w-7xl px-6 flex h-14 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-amber-500 rounded-lg flex items-center justify-center text-white text-xs font-bold">
              T
            </div>
            <span className="text-sm font-semibold text-stone-900">{templateName}</span>
            <span className="text-xs text-stone-400 bg-stone-100 rounded-full px-2 py-0.5 capitalize">
              {templateId}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-stone-400">{components.length} component{components.length !== 1 ? "s" : ""}</span>
            <a
              href="https://templateos.com/submit/upload"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center h-8 px-3 text-xs font-medium text-white bg-amber-500 rounded-lg hover:bg-amber-600 transition-colors"
            >
              Submit →
            </a>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-10">

        {/* Template meta */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-stone-900 tracking-tight mb-1">{templateName}</h1>
          <p className="text-sm text-stone-500 leading-relaxed max-w-xl mb-4">{templateDescription}</p>
          {colorTokens.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              {colorTokens.slice(0, 8).map(({ key, value }) => (
                <div
                  key={key}
                  className="w-4 h-4 rounded-md ring-1 ring-black/10"
                  style={{ backgroundColor: value }}
                  title={`${key}: ${value}`}
                />
              ))}
              <span className="text-xs text-stone-400 ml-1">{colorTokens.length} colors</span>
            </div>
          )}
        </div>

        {/* Category selector */}
        <div className="mb-8">
          <p className="text-xs font-medium text-stone-500 mb-2 uppercase tracking-wide">Building for</p>
          <div className="flex flex-wrap gap-1.5">
            {CATEGORIES.map((cat) => {
              const req = REQUIREMENTS[cat].required;
              const met = req.filter((c) => componentSet.has(c)).length;
              const isActive = cat === activeCategory;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`inline-flex items-center gap-1.5 h-8 px-3 rounded-full text-xs font-medium transition-colors ${
                    isActive
                      ? "bg-amber-500 text-white"
                      : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                  }`}
                >
                  <span className="capitalize">{cat}</span>
                  <span
                    className={`text-[10px] tabular-nums ${
                      isActive ? "text-amber-100" : met === req.length ? "text-emerald-500" : "text-stone-400"
                    }`}
                  >
                    {met}/{req.length}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Component grid */}
        {components.length === 0 ? (
          <div className="border-2 border-dashed border-stone-200 rounded-2xl p-16 text-center mb-10">
            <p className="text-stone-900 font-semibold mb-1">No components yet</p>
            <p className="text-sm text-stone-500 mb-4">
              Add <code className="text-xs bg-stone-100 rounded px-1.5 py-0.5 font-mono">.tsx</code> files to <code className="text-xs bg-stone-100 rounded px-1.5 py-0.5 font-mono">components/</code>
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mb-12">
            {components.map((name) => {
              const isRequired = required.includes(name);
              const isRecommended = recommended.includes(name);
              return (
                <Link
                  key={name}
                  href={`/components/${name}`}
                  className="group block bg-white rounded-xl border border-stone-200 hover:border-amber-300 hover:shadow-md transition-all p-5"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center text-lg">⊞</div>
                    {isRequired && (
                      <span className="text-[10px] font-medium text-amber-700 bg-amber-50 rounded-full px-2 py-0.5">required</span>
                    )}
                    {!isRequired && isRecommended && (
                      <span className="text-[10px] font-medium text-stone-500 bg-stone-100 rounded-full px-2 py-0.5">recommended</span>
                    )}
                  </div>
                  <p className="text-sm font-semibold text-stone-900 group-hover:text-amber-600 transition-colors">
                    {name}
                  </p>
                  <p className="text-xs text-stone-400 mt-0.5 font-mono">{name}.tsx</p>
                </Link>
              );
            })}
          </div>
        )}

        {/* Category progress */}
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          {/* Required */}
          <div className="border border-stone-200 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-stone-900 capitalize">{activeCategory} — Required</h3>
              <span className={`text-xs font-medium tabular-nums ${requiredMet === required.length ? "text-emerald-600" : "text-stone-400"}`}>
                {requiredMet}/{required.length}
              </span>
            </div>
            <div className="space-y-2">
              {required.map((name) => {
                const done = componentSet.has(name);
                return (
                  <div key={name} className="flex items-center gap-2.5">
                    <div className={`w-4 h-4 rounded flex items-center justify-center flex-shrink-0 ${done ? "bg-emerald-500" : "bg-stone-200"}`}>
                      {done && (
                        <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 10 8" fill="none">
                          <path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                    {done ? (
                      <Link href={`/components/${name}`} className="text-sm text-stone-700 hover:text-amber-600 transition-colors">
                        {name}
                      </Link>
                    ) : (
                      <span className="text-sm text-stone-400">{name}</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recommended */}
          <div className="border border-stone-200 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-stone-900">Recommended</h3>
              <span className="text-xs font-medium text-stone-400 tabular-nums">{recommendedMet}/{recommended.length}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {recommended.map((name) => {
                const done = componentSet.has(name);
                return (
                  <div key={name} className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${done ? "bg-emerald-400" : "bg-stone-200"}`} />
                    {done ? (
                      <Link href={`/components/${name}`} className="text-xs text-stone-600 hover:text-amber-600 transition-colors truncate">
                        {name}
                      </Link>
                    ) : (
                      <span className="text-xs text-stone-400 truncate">{name}</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Config checklist */}
        <div className="border border-stone-200 rounded-2xl p-5">
          <h3 className="text-sm font-semibold text-stone-900 mb-3">Before you submit</h3>
          <div className="grid sm:grid-cols-2 gap-2.5">
            {[
              { done: templateId !== "my-template", label: "Template ID set in templateos.config.ts" },
              { done: templateName !== "My Template", label: "Template name set" },
              { done: templateDescription.length > 20, label: "Description written (20+ chars)" },
              { done: templateTags.length > 0, label: "Tags added" },
              { done: requiredMet === required.length, label: `All ${activeCategory} required components built` },
              { done: components.length >= required.length, label: "Minimum component count met" },
            ].map(({ done, label }) => (
              <div key={label} className="flex items-center gap-2.5">
                <div className={`w-4 h-4 rounded flex items-center justify-center flex-shrink-0 ${done ? "bg-emerald-500" : "bg-stone-200"}`}>
                  {done && (
                    <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <span className={`text-sm ${done ? "text-stone-700" : "text-stone-400"}`}>{label}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
