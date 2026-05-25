interface Feature {
  icon: string;
  color: string;
  title: string;
  description: string;
}

const DEFAULT_FEATURES: Feature[] = [
  { icon: "⚡", color: "bg-amber-100 text-amber-700", title: "Blazing fast", description: "Built on a modern stack optimized for speed. Pages load in under 100ms, keeping users engaged." },
  { icon: "🔒", color: "bg-orange-100 text-orange-700", title: "Secure by default", description: "Enterprise-grade security out of the box. SOC 2 compliant with end-to-end encryption." },
  { icon: "🎨", color: "bg-rose-100 text-rose-700", title: "Fully customizable", description: "Every pixel is yours to own. Customize colors, fonts, and layouts without touching code." },
  { icon: "📈", color: "bg-teal-100 text-teal-700", title: "Built to scale", description: "From 10 to 10 million users. Infrastructure that grows with you, not against you." },
  { icon: "🤝", color: "bg-violet-100 text-violet-700", title: "Team collaboration", description: "Real-time collaboration with your entire team. Comments, reviews, and approvals built in." },
  { icon: "🔌", color: "bg-sky-100 text-sky-700", title: "Integrates everywhere", description: "Connect with 200+ tools your team already uses. Slack, Notion, GitHub, and more." },
];

interface FeatureSectionProps {
  tag?: string;
  headline?: string;
  subheadline?: string;
  features?: Feature[];
}

function FeatureSection({
  tag = "Features",
  headline = "Everything you need to ship",
  subheadline = "Stop stitching together tools. Acme brings together everything your team needs in one place.",
  features = DEFAULT_FEATURES,
}: FeatureSectionProps) {
  return (
    <section className="py-24 px-5 bg-white" id="features">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-semibold text-amber-600 uppercase tracking-widest mb-3">
            {tag}
          </span>
          <h2 className="text-4xl font-bold text-stone-900 tracking-tight mb-4">{headline}</h2>
          <p className="text-lg text-stone-500 max-w-xl mx-auto leading-relaxed">{subheadline}</p>
        </div>

        {/* Feature grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="group p-6 rounded-2xl border border-stone-100 hover:border-amber-200 hover:bg-amber-50/30 transition-all"
            >
              <div className={`w-11 h-11 rounded-xl ${f.color} flex items-center justify-center text-xl mb-4`}>
                {f.icon}
              </div>
              <h3 className="text-base font-semibold text-stone-900 mb-2">{f.title}</h3>
              <p className="text-sm text-stone-500 leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function FeatureSectionDemo() {
  return (
    <div className="bg-white">
      <FeatureSection />
    </div>
  );
}
