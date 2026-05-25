import { useState } from "react";

interface Tab { label: string; badge?: number }

interface TabsProps {
  tabs: Tab[];
  active: number;
  onChange: (i: number) => void;
  variant?: "underline" | "pills" | "segmented";
}

function Tabs({ tabs, active, onChange, variant = "underline" }: TabsProps) {
  if (variant === "segmented") {
    return (
      <div className="inline-flex bg-stone-100 rounded-xl p-1 gap-0.5">
        {tabs.map((tab, i) => (
          <button
            key={i}
            onClick={() => onChange(i)}
            className={`inline-flex items-center gap-1.5 h-8 px-4 rounded-lg text-sm font-medium transition-all ${
              active === i
                ? "bg-white text-stone-900 shadow-sm"
                : "text-stone-500 hover:text-stone-700"
            }`}
          >
            {tab.label}
            {tab.badge != null && (
              <span className={`inline-flex items-center justify-center h-4 min-w-4 px-1 rounded-full text-[10px] font-semibold ${
                active === i ? "bg-amber-500 text-white" : "bg-stone-200 text-stone-600"
              }`}>
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>
    );
  }

  if (variant === "pills") {
    return (
      <div className="flex flex-wrap gap-1">
        {tabs.map((tab, i) => (
          <button
            key={i}
            onClick={() => onChange(i)}
            className={`inline-flex items-center gap-1.5 h-8 px-3.5 rounded-full text-sm font-medium transition-colors ${
              active === i
                ? "bg-amber-500 text-white"
                : "text-stone-600 hover:bg-stone-100"
            }`}
          >
            {tab.label}
            {tab.badge != null && (
              <span className={`inline-flex items-center justify-center h-4 min-w-4 px-1 rounded-full text-[10px] font-semibold ${
                active === i ? "bg-white/30 text-white" : "bg-stone-200 text-stone-600"
              }`}>
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>
    );
  }

  // underline (default)
  return (
    <div className="flex border-b border-stone-200">
      {tabs.map((tab, i) => (
        <button
          key={i}
          onClick={() => onChange(i)}
          className={`relative inline-flex items-center gap-1.5 h-10 px-4 text-sm font-medium transition-colors ${
            active === i
              ? "text-amber-600 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-amber-500 after:rounded-full"
              : "text-stone-500 hover:text-stone-800"
          }`}
        >
          {tab.label}
          {tab.badge != null && (
            <span className={`inline-flex items-center justify-center h-4 min-w-4 px-1 rounded-full text-[10px] font-semibold ${
              active === i ? "bg-amber-100 text-amber-700" : "bg-stone-100 text-stone-500"
            }`}>
              {tab.badge}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}

const PANEL_CONTENT: Record<number, string> = {
  0: "Overview content — key metrics, recent activity, and quick stats.",
  1: "Analytics content — charts, trends, and detailed breakdowns.",
  2: "Users content — member list, roles, and invite management.",
  3: "Settings content — billing, integrations, and account config.",
};

export default function TabsDemo() {
  const [t1, setT1] = useState(0);
  const [t2, setT2] = useState(0);
  const [t3, setT3] = useState(1);

  const tabs = [
    { label: "Overview" },
    { label: "Analytics", badge: 3 },
    { label: "Users", badge: 12 },
    { label: "Settings" },
  ];

  return (
    <div className="p-10 bg-white space-y-10">
      <div>
        <p className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-4">Underline</p>
        <Tabs tabs={tabs} active={t1} onChange={setT1} variant="underline" />
        <div className="mt-4 p-4 bg-stone-50 rounded-xl text-sm text-stone-600">
          {PANEL_CONTENT[t1]}
        </div>
      </div>
      <div>
        <p className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-4">Pills</p>
        <Tabs tabs={tabs} active={t2} onChange={setT2} variant="pills" />
        <div className="mt-4 p-4 bg-stone-50 rounded-xl text-sm text-stone-600">
          {PANEL_CONTENT[t2]}
        </div>
      </div>
      <div>
        <p className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-4">Segmented</p>
        <Tabs tabs={[{label:"Monthly"},{label:"Quarterly"},{label:"Annual"}]} active={t3} onChange={setT3} variant="segmented" />
      </div>
    </div>
  );
}
