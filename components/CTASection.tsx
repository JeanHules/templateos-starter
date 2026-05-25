import { useState } from "react";

interface CTASectionProps {
  headline?: string;
  subheadline?: string;
  placeholder?: string;
  cta?: string;
}

function CTASection({
  headline = "Start building today",
  subheadline = "Join 12,000+ teams already shipping faster with Acme. No credit card required.",
  placeholder = "Enter your work email",
  cta = "Get early access",
}: CTASectionProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="py-24 px-5 bg-gradient-to-br from-amber-500 to-orange-500">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-bold text-white tracking-tight mb-4">{headline}</h2>
        <p className="text-amber-100 text-lg leading-relaxed mb-10">{subheadline}</p>

        {submitted ? (
          <div className="inline-flex items-center gap-2.5 bg-white/20 text-white rounded-full px-6 py-3 text-sm font-medium">
            <svg className="w-4 h-4 text-amber-200" viewBox="0 0 16 16" fill="none">
              <path d="M3 8.5L6.5 12L13 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            You're on the list — we'll be in touch!
          </div>
        ) : (
          <form
            onSubmit={(e) => { e.preventDefault(); if (email) setSubmitted(true); }}
            className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={placeholder}
              required
              className="flex-1 h-12 px-4 rounded-full text-sm bg-white/15 text-white placeholder-amber-200 border border-white/30 focus:outline-none focus:border-white focus:bg-white/20 backdrop-blur"
            />
            <button
              type="submit"
              className="h-12 px-6 bg-white text-amber-600 font-semibold text-sm rounded-full hover:bg-amber-50 transition-colors flex-shrink-0"
            >
              {cta}
            </button>
          </form>
        )}

        <p className="mt-4 text-xs text-amber-200">No spam ever. Unsubscribe in one click.</p>
      </div>
    </section>
  );
}

export default function CTASectionDemo() {
  return <CTASection />;
}
