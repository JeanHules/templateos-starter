import { useState } from "react";

/**
 * _cover.tsx — Screenshot cover for the TemplateOS marketplace listing.
 *
 * This file is excluded from the component submission (leading underscore).
 * Optimise it to look great at 1440×900. Show your template at its absolute best.
 *
 * Rules: self-contained, no imports from other local files.
 */

// ─── Design tokens ────────────────────────────────────────────────────────────

const AMBER = "#f97316";
const AMBER_DARK = "#ea580c";

// ─── Nav items ────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { id: "overview",  label: "Overview",  icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6", badge: null },
  { id: "analytics", label: "Analytics", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", badge: null },
  { id: "users",     label: "Users",     icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z", badge: "12" },
  { id: "billing",   label: "Billing",   icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z", badge: null },
  { id: "settings",  label: "Settings",  icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM15 12a3 3 0 11-6 0 3 3 0 016 0z", badge: null },
];

function NavIcon({ d }: { d: string }) {
  return (
    <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}

// ─── Stats ────────────────────────────────────────────────────────────────────

const STATS = [
  { label: "Monthly Revenue",  value: "$24,891",  delta: "+18.2%", up: true,  sub: "vs. last month" },
  { label: "Active Users",     value: "5,432",    delta: "+9.1%",  up: true,  sub: "vs. last month" },
  { label: "Conversion Rate",  value: "4.07%",    delta: "+0.6%",  up: true,  sub: "vs. last month" },
  { label: "Churn Rate",       value: "0.62%",    delta: "-0.3%",  up: false, sub: "vs. last month" },
];

// ─── Table rows ───────────────────────────────────────────────────────────────

const USERS_DATA = [
  { initials: "SC", name: "Sarah Chen",    email: "sarah@vesper.ai",   plan: "Team", status: "active",  mrr: "$290", joined: "Jan 14" },
  { initials: "MR", name: "Marcus Rivera", email: "m@paperclip.io",    plan: "Pro",  status: "active",  mrr: "$29",  joined: "Jan 13" },
  { initials: "PK", name: "Priya Kapoor",  email: "priya@orbit.dev",   plan: "Pro",  status: "active",  mrr: "$29",  joined: "Jan 12" },
  { initials: "TW", name: "Tom Walsh",     email: "tom@modal.co",      plan: "Free", status: "trial",   mrr: "–",    joined: "Jan 12" },
  { initials: "LZ", name: "Lin Zhao",      email: "lin@synth.ai",      plan: "Team", status: "active",  mrr: "$290", joined: "Jan 11" },
  { initials: "AK", name: "Alex Kim",      email: "alex@buildco.dev",  plan: "Pro",  status: "active",  mrr: "$29",  joined: "Jan 10" },
  { initials: "JB", name: "Jamie Baker",   email: "jamie@loopco.io",   plan: "Free", status: "churned", mrr: "–",    joined: "Jan 9"  },
];

const STATUS_CLS: Record<string, string> = {
  active:  "bg-emerald-100 text-emerald-700",
  trial:   "bg-amber-100 text-amber-700",
  churned: "bg-red-100 text-red-600",
};

const PLAN_CLS: Record<string, string> = {
  Free: "bg-stone-100 text-stone-600",
  Pro:  "bg-amber-100 text-amber-700",
  Team: "bg-violet-100 text-violet-700",
};

const AVATAR_COLORS: Record<string, string> = {
  SC: "bg-amber-100 text-amber-800",
  MR: "bg-orange-100 text-orange-800",
  PK: "bg-rose-100 text-rose-800",
  TW: "bg-sky-100 text-sky-800",
  LZ: "bg-teal-100 text-teal-800",
  AK: "bg-violet-100 text-violet-800",
  JB: "bg-stone-100 text-stone-700",
};

// ─── Activity ─────────────────────────────────────────────────────────────────

const ACTIVITY = [
  { emoji: "🚀", text: "v2.5.0 deployed to production", time: "2m ago" },
  { emoji: "👤", text: "Sarah Chen upgraded to Team", time: "18m ago" },
  { emoji: "💳", text: "Invoice #1047 paid — $2,900", time: "1h ago" },
  { emoji: "📈", text: "Conversion rate hit 4% milestone", time: "2h ago" },
  { emoji: "🔔", text: "5,000 active users milestone", time: "3h ago" },
  { emoji: "⚙️", text: "Webhook retry policy updated", time: "5h ago" },
];

// ─── Tiny sparkline ───────────────────────────────────────────────────────────

function Sparkline({ values, color }: { values: number[]; color: string }) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  const w = 64, h = 24, step = w / (values.length - 1);
  const pts = values
    .map((v, i) => `${i * step},${h - ((v - min) / range) * (h - 2) - 1}`)
    .join(" ");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none">
      <polyline points={pts} stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const SPARKLINES: Record<string, number[]> = {
  "Monthly Revenue": [14, 16, 15, 18, 17, 20, 22, 21, 24],
  "Active Users":    [32, 35, 37, 38, 40, 41, 45, 48, 54],
  "Conversion Rate": [3.2, 3.4, 3.3, 3.6, 3.5, 3.7, 3.9, 4.0, 4.1],
  "Churn Rate":      [1.2, 1.0, 0.9, 1.0, 0.8, 0.9, 0.7, 0.6, 0.6],
};

// ─── Cover layout ─────────────────────────────────────────────────────────────

export default function Cover() {
  const [active] = useState("overview");

  return (
    <div style={{ width: 1440, height: 900, overflow: "hidden", display: "flex", fontFamily: "system-ui,-apple-system,sans-serif", background: "#fafaf9" }}>

      {/* Sidebar */}
      <aside style={{ width: 220, background: "#1c1917", display: "flex", flexDirection: "column", flexShrink: 0 }}>
        {/* Logo */}
        <div style={{ height: 56, display: "flex", alignItems: "center", padding: "0 16px", borderBottom: "1px solid #292524" }}>
          <div style={{ width: 28, height: 28, background: AMBER, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 13, fontWeight: 700, flexShrink: 0 }}>A</div>
          <span style={{ marginLeft: 10, color: "#f5f5f4", fontWeight: 600, fontSize: 14 }}>Acme</span>
          <span style={{ marginLeft: "auto", background: "#292524", color: "#a8a29e", fontSize: 9, fontWeight: 600, borderRadius: 4, padding: "2px 6px" }}>PRO</span>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "12px 8px", display: "flex", flexDirection: "column", gap: 2 }}>
          {NAV_ITEMS.map((item) => {
            const isActive = item.id === active;
            return (
              <div key={item.id} style={{
                display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", borderRadius: 8,
                background: isActive ? "rgba(249,115,22,0.15)" : "transparent",
                color: isActive ? AMBER : "#a8a29e", fontSize: 13, fontWeight: isActive ? 500 : 400,
              }}>
                <NavIcon d={item.icon} />
                <span style={{ flex: 1 }}>{item.label}</span>
                {item.badge && (
                  <span style={{ background: "rgba(249,115,22,0.2)", color: AMBER, fontSize: 10, fontWeight: 600, borderRadius: 999, padding: "1px 6px" }}>{item.badge}</span>
                )}
              </div>
            );
          })}
        </nav>

        {/* Workspace */}
        <div style={{ padding: "12px 8px", borderTop: "1px solid #292524" }}>
          <div style={{ background: "#292524", borderRadius: 8, padding: "8px 10px", display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 24, height: 24, background: AMBER, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 10, fontWeight: 700 }}>A</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ color: "#e7e5e4", fontSize: 11, fontWeight: 600, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>Acme Inc.</div>
              <div style={{ color: "#78716c", fontSize: 10 }}>Pro plan</div>
            </div>
          </div>
        </div>

        {/* User */}
        <div style={{ padding: "10px 16px", borderTop: "1px solid #292524", display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 28, height: 28, borderRadius: 999, background: "#fef3c7", color: "#92400e", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700 }}>JH</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ color: "#e7e5e4", fontSize: 11, fontWeight: 500, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>John Hull</div>
            <div style={{ color: "#78716c", fontSize: 10, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>john@acme.com</div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

        {/* Top bar */}
        <header style={{ height: 56, background: "#fff", borderBottom: "1px solid #e7e5e4", display: "flex", alignItems: "center", padding: "0 24px", flexShrink: 0, gap: 12 }}>
          <div style={{ flex: 1 }}>
            <h1 style={{ margin: 0, fontSize: 15, fontWeight: 600, color: "#1c1917" }}>Overview</h1>
            <p style={{ margin: 0, fontSize: 11, color: "#a8a29e" }}>January 2025 · All workspaces</p>
          </div>
          {/* Search */}
          <div style={{ display: "flex", alignItems: "center", gap: 6, background: "#f5f5f4", borderRadius: 8, padding: "6px 10px", border: "1px solid #e7e5e4" }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#a8a29e" strokeWidth={2}><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
            <span style={{ fontSize: 12, color: "#a8a29e" }}>Search</span>
            <span style={{ marginLeft: 4, fontSize: 10, color: "#d6d3d1", background: "#fff", border: "1px solid #e7e5e4", borderRadius: 4, padding: "1px 4px" }}>⌘K</span>
          </div>
          {/* Actions */}
          <button style={{ height: 32, padding: "0 12px", background: AMBER, color: "#fff", border: "none", borderRadius: 999, fontSize: 12, fontWeight: 600, cursor: "default", display: "flex", alignItems: "center", gap: 5 }}>
            <span>+</span> New report
          </button>
          {/* Notifications */}
          <div style={{ position: "relative", width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", background: "#f5f5f4", borderRadius: 8, cursor: "default" }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#78716c" strokeWidth={1.75}><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
            <span style={{ position: "absolute", top: 6, right: 7, width: 6, height: 6, background: AMBER, borderRadius: 999, border: "1.5px solid #fff" }} />
          </div>
          <div style={{ width: 32, height: 32, borderRadius: 999, background: "#fef3c7", color: "#92400e", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700 }}>JH</div>
        </header>

        {/* Content */}
        <main style={{ flex: 1, overflow: "hidden", padding: 20, display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Stat cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
            {STATS.map((s) => (
              <div key={s.label} style={{ background: "#fff", borderRadius: 12, border: "1px solid #e7e5e4", padding: "16px 18px" }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 10 }}>
                  <p style={{ margin: 0, fontSize: 11, fontWeight: 500, color: "#a8a29e" }}>{s.label}</p>
                  <Sparkline values={SPARKLINES[s.label]} color={s.up ? "#10b981" : "#f97316"} />
                </div>
                <p style={{ margin: 0, fontSize: 24, fontWeight: 700, color: "#1c1917", letterSpacing: -0.5 }}>{s.value}</p>
                <div style={{ marginTop: 6, display: "flex", alignItems: "center", gap: 4 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: s.up ? "#059669" : "#ef4444" }}>{s.delta}</span>
                  <span style={{ fontSize: 11, color: "#a8a29e" }}>{s.sub}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Table + Activity */}
          <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 280px", gap: 12, overflow: "hidden", minHeight: 0 }}>

            {/* Users table */}
            <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #e7e5e4", overflow: "hidden", display: "flex", flexDirection: "column" }}>
              <div style={{ padding: "14px 18px", borderBottom: "1px solid #f5f5f4", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#1c1917" }}>Recent signups</span>
                <div style={{ display: "flex", gap: 6 }}>
                  <button style={{ height: 28, padding: "0 10px", fontSize: 11, color: "#78716c", background: "#f5f5f4", border: "none", borderRadius: 6, cursor: "default" }}>Export</button>
                  <button style={{ height: 28, padding: "0 10px", fontSize: 11, color: "#fff", background: AMBER, border: "none", borderRadius: 6, cursor: "default" }}>Invite user</button>
                </div>
              </div>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid #f5f5f4" }}>
                    {["User", "Plan", "Status", "MRR", "Joined"].map((h) => (
                      <th key={h} style={{ padding: "8px 18px", textAlign: "left", fontSize: 10, fontWeight: 600, color: "#a8a29e", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {USERS_DATA.map((u) => (
                    <tr key={u.email} style={{ borderBottom: "1px solid #fafaf9" }}>
                      <td style={{ padding: "10px 18px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <div style={{ width: 26, height: 26, borderRadius: 999, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, flexShrink: 0, ...{ className: undefined } }} className={AVATAR_COLORS[u.initials]}>
                            <span style={{ fontSize: 9, fontWeight: 700 }}>{u.initials}</span>
                          </div>
                          <div>
                            <p style={{ margin: 0, fontWeight: 500, color: "#1c1917", fontSize: 12 }}>{u.name}</p>
                            <p style={{ margin: 0, color: "#a8a29e", fontSize: 11 }}>{u.email}</p>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: "10px 18px" }}>
                        <span style={{ fontSize: 11, fontWeight: 500, borderRadius: 999, padding: "2px 8px", display: "inline-block" }} className={PLAN_CLS[u.plan]}>{u.plan}</span>
                      </td>
                      <td style={{ padding: "10px 18px" }}>
                        <span style={{ fontSize: 11, fontWeight: 500, borderRadius: 999, padding: "2px 8px", display: "inline-block" }} className={STATUS_CLS[u.status]}>{u.status}</span>
                      </td>
                      <td style={{ padding: "10px 18px", fontWeight: 500, color: "#1c1917" }}>{u.mrr}</td>
                      <td style={{ padding: "10px 18px", color: "#a8a29e" }}>{u.joined}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Activity */}
            <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #e7e5e4", padding: "14px 16px", overflow: "hidden", display: "flex", flexDirection: "column" }}>
              <p style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600, color: "#1c1917" }}>Activity</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {ACTIVITY.map((a, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, padding: "8px 0", borderBottom: i < ACTIVITY.length - 1 ? "1px solid #fafaf9" : "none" }}>
                    <span style={{ fontSize: 14, flexShrink: 0, marginTop: 1 }}>{a.emoji}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ margin: 0, fontSize: 11, color: "#44403c", lineHeight: 1.4 }}>{a.text}</p>
                      <p style={{ margin: 0, fontSize: 10, color: "#a8a29e", marginTop: 2 }}>{a.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
