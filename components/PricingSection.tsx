import { useState } from "react";

interface PricingTier {
  name: string;
  monthlyPrice: number;
  annualPrice: number;
  description: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
}

const DEFAULT_TIERS: PricingTier[] = [
  {
    name: "Starter",
    monthlyPrice: 0,
    annualPrice: 0,
    description: "Perfect for solo makers and side projects.",
    features: ["Up to 3 projects", "5GB storage", "Basic analytics", "Community support"],
    cta: "Start for free",
  },
  {
    name: "Pro",
    monthlyPrice: 29,
    annualPrice: 23,
    description: "For growing teams who need more power.",
    features: ["Unlimited projects", "50GB storage", "Advanced analytics", "Priority support", "Custom domain", "Team collaboration"],
    cta: "Get started",
    highlighted: true,
  },
  {
    name: "Team",
    monthlyPrice: 79,
    annualPrice: 63,
    description: "For organizations shipping at scale.",
    features: ["Everything in Pro", "500GB storage", "Audit logs", "SSO / SAML", "Dedicated support", "SLA guarantee", "Custom integrations"],
    cta: "Contact sales",
  },
];

interface PricingSectionProps {
  tag?: string;
  headline?: string;
  subheadline?: string;
  tiers?: PricingTier[];
}

function PricingSection({
  tag = "Pricing",
  headline = "Simple, honest pricing",
  subheadline = "No hidden fees, no surprise bills. Pick the plan that fits your team.",
  tiers = DEFAULT_TIERS,
}: PricingSectionProps) {
  const [annual, setAnnual] = useState(false);

  return (
    <section className="py-24 px-5 bg-white" id="pricing">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-semibold text-amber-600 uppercase tracking-widest mb-3">{tag}</span>
          <h2 className="text-4xl font-bold text-stone-900 tracking-tight mb-4">{headline}</h2>
          <p className="text-lg text-stone-500 mb-8">{subheadline}</p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 bg-stone-100 rounded-full p-1">
            <button
              onClick={() => setAnnual(false)}
              className={`h-8 px-4 rounded-full text-sm font-medium transition-colors ${!annual ? "bg-white text-stone-900 shadow-sm" : "text-stone-500"}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`h-8 px-4 rounded-full text-sm font-medium transition-colors ${annual ? "bg-white text-stone-900 shadow-sm" : "text-stone-500"}`}
            >
              Annual
              <span className="ml-1.5 text-[10px] text-emerald-600 font-semibold">Save 20%</span>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-5 items-start">
          {tiers.map((tier) => {
            const price = annual ? tier.annualPrice : tier.monthlyPrice;
            return (
              <div
                key={tier.name}
                className={`rounded-2xl p-7 flex flex-col gap-6 ${
                  tier.highlighted
                    ? "bg-amber-500 text-white ring-4 ring-amber-500/20 shadow-xl shadow-amber-100"
                    : "bg-white border border-stone-200"
                }`}
              >
                <div>
                  <p className={`text-sm font-semibold mb-1 ${tier.highlighted ? "text-amber-100" : "text-stone-500"}`}>
                    {tier.name}
                  </p>
                  <div className="flex items-end gap-1 mb-2">
                    <span className={`text-4xl font-bold ${tier.highlighted ? "text-white" : "text-stone-900"}`}>
                      {price === 0 ? "Free" : `$${price}`}
                    </span>
                    {price > 0 && (
                      <span className={`text-sm mb-1 ${tier.highlighted ? "text-amber-200" : "text-stone-400"}`}>
                        /mo{annual && " billed annually"}
                      </span>
                    )}
                  </div>
                  <p className={`text-sm leading-relaxed ${tier.highlighted ? "text-amber-100" : "text-stone-500"}`}>
                    {tier.description}
                  </p>
                </div>

                <ul className="space-y-3 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <svg
                        className={`w-4 h-4 mt-0.5 flex-shrink-0 ${tier.highlighted ? "text-amber-200" : "text-emerald-500"}`}
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path d="M3 8.5L6.5 12L13 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className={tier.highlighted ? "text-amber-50" : "text-stone-700"}>{f}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#"
                  className={`block text-center h-10 leading-10 rounded-full text-sm font-semibold transition-colors ${
                    tier.highlighted
                      ? "bg-white text-amber-600 hover:bg-amber-50"
                      : "bg-amber-500 text-white hover:bg-amber-600"
                  }`}
                >
                  {tier.cta}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function PricingSectionDemo() {
  return (
    <div className="bg-white">
      <PricingSection />
    </div>
  );
}
