interface Stat {
  value: string;
  label: string;
  description?: string;
}

const DEFAULT_STATS: Stat[] = [
  { value: "12,000+", label: "Teams using Acme", description: "Across 60 countries" },
  { value: "99.9%", label: "Uptime SLA", description: "Every month, guaranteed" },
  { value: "4.9 / 5", label: "Customer rating", description: "From 2,400+ reviews" },
  { value: "$2.4B", label: "Revenue processed", description: "By teams on Acme" },
];

interface StatsSectionProps {
  tag?: string;
  headline?: string;
  stats?: Stat[];
}

function StatsSection({
  tag = "By the numbers",
  headline = "Built for teams who move fast",
  stats = DEFAULT_STATS,
}: StatsSectionProps) {
  return (
    <section className="py-24 px-5 bg-white">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-semibold text-amber-600 uppercase tracking-widest mb-3">{tag}</span>
          <h2 className="text-4xl font-bold text-stone-900 tracking-tight">{headline}</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center p-6 rounded-2xl bg-amber-50/60 border border-amber-100"
            >
              <p className="text-4xl font-bold text-stone-900 mb-1 tracking-tight">{stat.value}</p>
              <p className="text-sm font-semibold text-stone-700 mb-1">{stat.label}</p>
              {stat.description && (
                <p className="text-xs text-stone-400">{stat.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function StatsSectionDemo() {
  return <StatsSection />;
}
