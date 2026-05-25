import { useState } from "react";

// ─── Icons ────────────────────────────────────────────────────────────────────

const Icon = ({ d }: { d: string }) => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

const ICONS = {
  overview:   "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
  analytics:  "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
  users:      "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
  projects:   "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z",
  billing:    "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z",
  settings:   "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
  bell:       "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9",
  search:     "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
  chevron:    "M9 5l7 7-7 7",
  collapse:   "M11 19l-7-7 7-7M18 19l-7-7 7-7",
};

// ─── Sidebar ──────────────────────────────────────────────────────────────────

const NAV = [
  { id: "overview",  label: "Overview",   icon: ICONS.overview  },
  { id: "analytics", label: "Analytics",  icon: ICONS.analytics },
  { id: "users",     label: "Users",      badge: 12, icon: ICONS.users },
  { id: "projects",  label: "Projects",   icon: ICONS.projects  },
  { id: "billing",   label: "Billing",    icon: ICONS.billing   },
  { id: "settings",  label: "Settings",   icon: ICONS.settings  },
];

function Sidebar({ active, onSelect, collapsed, onToggle }: {
  active: string;
  onSelect: (id: string) => void;
  collapsed: boolean;
  onToggle: () => void;
}) {
  return (
    <aside className={`flex flex-col bg-stone-900 text-stone-300 transition-all duration-200 flex-shrink-0 ${collapsed ? "w-14" : "w-52"}`}>
      {/* Logo */}
      <div className="h-14 flex items-center px-3.5 border-b border-stone-800">
        <div className="w-7 h-7 bg-amber-500 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0">A</div>
        {!collapsed && <span className="ml-2.5 font-semibold text-stone-100 text-sm">Acme</span>}
        <button onClick={onToggle} className={`ml-auto text-stone-500 hover:text-stone-200 transition-colors ${collapsed ? "hidden" : ""}`}>
          <Icon d={ICONS.collapse} />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-3 px-2 space-y-0.5 overflow-y-auto">
        {NAV.map((item) => {
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelect(item.id)}
              title={collapsed ? item.label : undefined}
              className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm transition-colors ${
                isActive ? "bg-amber-500/20 text-amber-400" : "hover:bg-stone-800 hover:text-stone-100"
              }`}
            >
              <Icon d={item.icon} />
              {!collapsed && (
                <>
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge && (
                    <span className="text-[10px] font-semibold bg-amber-500/20 text-amber-400 rounded-full px-1.5 py-0.5">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </button>
          );
        })}
      </nav>

      {/* User */}
      <div className={`border-t border-stone-800 p-3 flex items-center gap-2.5 ${collapsed ? "justify-center" : ""}`}>
        <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-[10px] font-bold flex-shrink-0">JH</div>
        {!collapsed && (
          <div className="min-w-0">
            <p className="text-xs font-medium text-stone-200 truncate">John Hull</p>
            <p className="text-[10px] text-stone-500 truncate">john@acme.com</p>
          </div>
        )}
      </div>
    </aside>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────

function StatCard({ label, value, change }: { label: string; value: string; change: number }) {
  const up = change >= 0;
  return (
    <div className="bg-white rounded-xl border border-stone-200 p-5">
      <p className="text-xs font-medium text-stone-500 mb-3">{label}</p>
      <p className="text-2xl font-bold text-stone-900 mb-1.5">{value}</p>
      <span className={`inline-flex items-center gap-0.5 text-xs font-semibold ${up ? "text-emerald-600" : "text-red-500"}`}>
        {up ? "↑" : "↓"} {Math.abs(change)}% vs last month
      </span>
    </div>
  );
}

// ─── Users table ─────────────────────────────────────────────────────────────

const USERS = [
  { name: "Sarah Chen",    email: "sarah@vesper.ai",   plan: "Pro",  status: "active",   joined: "Jan 12" },
  { name: "Marcus Rivera", email: "m@paperclip.io",    plan: "Team", status: "active",   joined: "Jan 11" },
  { name: "Priya Kapoor",  email: "priya@orbit.dev",   plan: "Pro",  status: "active",   joined: "Jan 10" },
  { name: "Tom Walsh",     email: "tom@modal.co",      plan: "Free", status: "churned",  joined: "Jan 9"  },
  { name: "Lin Zhao",      email: "lin@synth.ai",      plan: "Pro",  status: "trial",    joined: "Jan 9"  },
];

const BADGE: Record<string, string> = {
  active:  "bg-emerald-100 text-emerald-700",
  churned: "bg-red-100 text-red-700",
  trial:   "bg-amber-100 text-amber-700",
};

const PLAN_BADGE: Record<string, string> = {
  Free: "bg-stone-100 text-stone-600",
  Pro:  "bg-amber-100 text-amber-700",
  Team: "bg-violet-100 text-violet-700",
};

function UsersTable() {
  return (
    <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
      <div className="px-5 py-4 border-b border-stone-100 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-stone-900">Recent signups</h3>
        <button className="text-xs text-amber-600 font-medium hover:text-amber-700">View all →</button>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-stone-100">
            {["User", "Plan", "Status", "Joined"].map((h) => (
              <th key={h} className="px-5 py-3 text-left text-xs font-medium text-stone-400 uppercase tracking-wider">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-stone-50">
          {USERS.map((u) => (
            <tr key={u.email} className="hover:bg-stone-50/50 transition-colors">
              <td className="px-5 py-3.5">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-[10px] font-bold flex-shrink-0">
                    {u.name.split(" ").map(n=>n[0]).join("")}
                  </div>
                  <div>
                    <p className="font-medium text-stone-900 text-xs">{u.name}</p>
                    <p className="text-stone-400 text-[11px]">{u.email}</p>
                  </div>
                </div>
              </td>
              <td className="px-5 py-3.5">
                <span className={`inline-flex items-center h-5 px-2 rounded-full text-[11px] font-medium ${PLAN_BADGE[u.plan]}`}>{u.plan}</span>
              </td>
              <td className="px-5 py-3.5">
                <span className={`inline-flex items-center h-5 px-2 rounded-full text-[11px] font-medium capitalize ${BADGE[u.status]}`}>{u.status}</span>
              </td>
              <td className="px-5 py-3.5 text-xs text-stone-400">{u.joined}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Activity feed ────────────────────────────────────────────────────────────

const ACTIVITY = [
  { icon: "🚀", text: "Deployed v2.4.1 to production", time: "2m ago" },
  { icon: "👤", text: "Sarah Chen upgraded to Pro", time: "14m ago" },
  { icon: "💳", text: "Invoice #1042 paid — $2,900", time: "1h ago" },
  { icon: "⚠️", text: "API error rate spike — resolved", time: "3h ago" },
  { icon: "📧", text: "Monthly digest sent to 2,847 users", time: "6h ago" },
];

function ActivityFeed() {
  return (
    <div className="bg-white rounded-xl border border-stone-200 p-5">
      <h3 className="text-sm font-semibold text-stone-900 mb-4">Activity</h3>
      <div className="space-y-3">
        {ACTIVITY.map((a, i) => (
          <div key={i} className="flex items-start gap-3">
            <span className="text-base flex-shrink-0 mt-0.5">{a.icon}</span>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-stone-700 leading-relaxed">{a.text}</p>
            </div>
            <span className="text-[11px] text-stone-400 flex-shrink-0">{a.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Page content by tab ─────────────────────────────────────────────────────

function OverviewContent() {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Monthly Revenue" value="$12,453" change={12.5} />
        <StatCard label="Active Users" value="2,847" change={8.2} />
        <StatCard label="Conversion" value="3.24%" change={-0.8} />
        <StatCard label="Churn Rate" value="0.8%" change={-0.2} />
      </div>
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2"><UsersTable /></div>
        <ActivityFeed />
      </div>
    </div>
  );
}

function PlaceholderContent({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-64 bg-white rounded-xl border border-dashed border-stone-200 text-center">
      <p className="text-stone-400 text-sm">{title}</p>
      <p className="text-stone-300 text-xs mt-1">Content goes here</p>
    </div>
  );
}

const CONTENT: Record<string, React.ReactNode> = {
  overview:  <OverviewContent />,
  analytics: <PlaceholderContent title="Analytics" />,
  users:     <PlaceholderContent title="User management" />,
  projects:  <PlaceholderContent title="Projects" />,
  billing:   <PlaceholderContent title="Billing & invoices" />,
  settings:  <PlaceholderContent title="Account settings" />,
};

const PAGE_TITLES: Record<string, string> = {
  overview: "Overview", analytics: "Analytics", users: "Users",
  projects: "Projects", billing: "Billing", settings: "Settings",
};

// ─── Main layout ──────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const [active, setActive] = useState("overview");
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-stone-50 overflow-hidden font-sans text-stone-900" style={{ fontFamily: "system-ui, sans-serif" }}>
      <Sidebar active={active} onSelect={setActive} collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />

      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top bar */}
        <header className="h-14 flex items-center justify-between px-5 bg-white border-b border-stone-200 flex-shrink-0">
          <div className="flex items-center gap-3">
            {collapsed && (
              <button onClick={() => setCollapsed(false)} className="text-stone-400 hover:text-stone-700 mr-1">
                <Icon d={ICONS.chevron} />
              </button>
            )}
            <h1 className="text-sm font-semibold text-stone-900">{PAGE_TITLES[active]}</h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="h-8 px-3 flex items-center gap-1.5 text-xs text-stone-500 bg-stone-100 rounded-lg hover:bg-stone-200 transition-colors">
              <Icon d={ICONS.search} />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden sm:inline text-[10px] text-stone-400 bg-white border border-stone-200 rounded px-1">⌘K</kbd>
            </button>
            <button className="relative w-8 h-8 flex items-center justify-center text-stone-500 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors">
              <Icon d={ICONS.bell} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-amber-500 rounded-full" />
            </button>
            <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-[10px] font-bold">JH</div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-5">
          {CONTENT[active]}
        </main>
      </div>
    </div>
  );
}
