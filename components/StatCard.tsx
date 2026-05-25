interface StatCardProps {
  label: string;
  value: string;
  change?: number;
  changeLabel?: string;
  icon?: React.ReactNode;
  color?: "amber" | "emerald" | "sky" | "violet";
}

const COLOR_MAP = {
  amber:   { bg: "bg-amber-50",   icon: "bg-amber-100 text-amber-600",  badge: "text-amber-700 bg-amber-50" },
  emerald: { bg: "bg-emerald-50", icon: "bg-emerald-100 text-emerald-600", badge: "text-emerald-700 bg-emerald-50" },
  sky:     { bg: "bg-sky-50",     icon: "bg-sky-100 text-sky-600",      badge: "text-sky-700 bg-sky-50" },
  violet:  { bg: "bg-violet-50",  icon: "bg-violet-100 text-violet-600", badge: "text-violet-700 bg-violet-50" },
};

function StatCard({ label, value, change, changeLabel, icon, color = "amber" }: StatCardProps) {
  const c = COLOR_MAP[color];
  const isPositive = change != null && change >= 0;
  const isNegative = change != null && change < 0;

  return (
    <div className="bg-white rounded-2xl border border-stone-200 p-6 flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <p className="text-sm font-medium text-stone-500">{label}</p>
        {icon && (
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${c.icon}`}>
            {icon}
          </div>
        )}
      </div>
      <div>
        <p className="text-3xl font-bold text-stone-900 tracking-tight">{value}</p>
        {change != null && (
          <div className="flex items-center gap-1.5 mt-1.5">
            <span className={`inline-flex items-center gap-0.5 text-xs font-semibold ${isPositive ? "text-emerald-600" : "text-red-500"}`}>
              {isPositive ? (
                <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none"><path d="M6 10V2M2 6l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              ) : (
                <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none"><path d="M6 2v8M2 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              )}
              {Math.abs(change)}%
            </span>
            {changeLabel && <span className="text-xs text-stone-400">{changeLabel}</span>}
          </div>
        )}
      </div>
    </div>
  );
}

const DollarIcon = () => <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path d="M10.75 10.818v2.614A3.13 3.13 0 0011.888 13c.482-.315.612-.648.612-.875 0-.227-.13-.56-.612-.875a3.13 3.13 0 00-1.138-.432zM8.33 8.62c.053.055.115.11.184.164.208.16.46.284.736.363V6.603a2.45 2.45 0 00-.35.13c-.14.065-.27.143-.386.233-.377.292-.514.627-.514.909 0 .184.058.39.33.585z" /><path fillRule="evenodd" d="M1 4a1 1 0 011-1h16a1 1 0 011 1v8a1 1 0 01-1 1h-2.086a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-1.414 0L9.965 14.12A1 1 0 009.258 14H3a1 1 0 01-1-1V4zm8 4.994C9 9.604 9 10.714 9 10.714V11h.75v-.313c.048-.008.096-.018.143-.028.53-.113.997-.39 1.327-.778C11.553 9.484 11.75 9.02 11.75 8.5c0-.524-.197-.992-.53-1.38A3.18 3.18 0 009.75 6.5V6H9v.5c0 .006 0 .012 0 .018v-.004.004zm0-2.495V5h.75V4H9z" clipRule="evenodd" /></svg>;
const UsersIcon = () => <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path d="M7 8a3 3 0 100-6 3 3 0 000 6zM14.5 9a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM1.615 16.428a1.224 1.224 0 01-.569-1.175 6.002 6.002 0 0111.908 0c.058.467-.172.92-.57 1.174A9.953 9.953 0 017 18a9.953 9.953 0 01-5.385-1.572zM14.5 16h-.106c.07-.297.088-.611.048-.933a7.47 7.47 0 00-1.588-3.755 4.502 4.502 0 015.874 2.575c.092.319-.005.668-.288.84A7.496 7.496 0 0114.5 16z"/></svg>;
const ChartIcon = () => <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path d="M15.98 1.804a1 1 0 00-1.96 0l-.24 1.192.016.001a4.5 4.5 0 01.8 8.887l-.247 1.24A1 1 0 0015.32 14h.003a1 1 0 00.983-.815l.235-1.176a4.5 4.5 0 00-.801-8.887l.24-1.318zM4.02 1.804a1 1 0 011.96 0l.24 1.192-.016.001a4.5 4.5 0 00-.8 8.887l.247 1.24A1 1 0 014.68 14h-.003a1 1 0 01-.983-.815L3.46 11.01a4.5 4.5 0 01.8-8.888L4.02 1.804z"/></svg>;
const ArrowIcon = () => <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.577 4.878a.75.75 0 01.919-.53l4.78 1.281a.75.75 0 01.531.919l-1.281 4.78a.75.75 0 01-1.449-.387l.81-3.022a19.407 19.407 0 00-5.594 5.203.75.75 0 01-1.139.093L7 10.06l-4.72 4.72a.75.75 0 01-1.06-1.061l5.25-5.25a.75.75 0 011.06 0l3.074 3.073a20.923 20.923 0 015.545-4.931l-3.042-.815a.75.75 0 01-.53-.918z" clipRule="evenodd" /></svg>;

export default function StatCardDemo() {
  return (
    <div className="p-10 bg-stone-50">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Monthly Revenue" value="$12,453" change={12.5} changeLabel="vs last month" icon={<DollarIcon />} color="amber" />
        <StatCard label="Active Users" value="2,847" change={8.2} changeLabel="vs last month" icon={<UsersIcon />} color="emerald" />
        <StatCard label="Conversion Rate" value="3.24%" change={-0.8} changeLabel="vs last month" icon={<ChartIcon />} color="sky" />
        <StatCard label="Avg Session" value="4m 32s" change={5.1} changeLabel="vs last month" icon={<ArrowIcon />} color="violet" />
      </div>
    </div>
  );
}
