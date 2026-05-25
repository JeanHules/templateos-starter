import { useState } from "react";

function CheckCircleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

// ── Variant A: Full-width section ─────────────────────────────────────────────

interface NewsletterSectionAProps {
  heading?: string;
  subheading?: string;
  placeholder?: string;
  buttonLabel?: string;
  privacyNote?: string;
}

function NewsletterSectionA({
  heading = "Stay in the loop",
  subheading = "Product updates, tips, and early access to new features — delivered to your inbox. We write when we have something worth saying.",
  placeholder = "you@company.com",
  buttonLabel = "Subscribe",
  privacyNote = "No spam. Unsubscribe any time.",
}: NewsletterSectionAProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  }

  return (
    <section className="py-24 px-5 bg-amber-50/50">
      <div className="mx-auto max-w-2xl text-center">
        {submitted ? (
          <div className="flex flex-col items-center gap-4 animate-fade-in">
            <CheckCircleIcon className="w-14 h-14 text-amber-500" />
            <h2 className="text-3xl font-bold text-stone-900">You're in!</h2>
            <p className="text-stone-600 text-lg">
              Thanks for subscribing. Expect something good in your inbox soon.
            </p>
          </div>
        ) : (
          <>
            <span className="inline-block text-xs font-semibold text-amber-600 uppercase tracking-widest mb-3">
              Newsletter
            </span>
            <h2 className="text-4xl font-bold text-stone-900 tracking-tight mb-4">{heading}</h2>
            <p className="text-lg text-stone-600 mb-10 leading-relaxed">{subheading}</p>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 justify-center">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={placeholder}
                required
                className="flex-1 min-w-0 px-4 py-3 rounded-xl border border-stone-200 bg-white text-stone-900 placeholder-stone-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent shadow-sm"
              />
              <button
                type="submit"
                className="flex-shrink-0 bg-amber-500 hover:bg-amber-600 text-white font-semibold text-sm px-6 py-3 rounded-xl transition-colors shadow-sm"
              >
                {buttonLabel}
              </button>
            </form>

            <p className="mt-4 text-xs text-stone-400">{privacyNote}</p>
          </>
        )}
      </div>
    </section>
  );
}

// ── Variant B: Compact card ────────────────────────────────────────────────────

const SUBSCRIBER_BENEFITS = [
  "Weekly product updates & release notes",
  "Early access to beta features",
  "Tips from teams who ship fast",
];

interface NewsletterCardProps {
  heading?: string;
  benefits?: string[];
  placeholder?: string;
  buttonLabel?: string;
}

function NewsletterCard({
  heading = "Get updates",
  benefits = SUBSCRIBER_BENEFITS,
  placeholder = "your@email.com",
  buttonLabel = "Subscribe free",
}: NewsletterCardProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  }

  return (
    <div className="bg-white border border-stone-200 rounded-2xl p-7 max-w-sm w-full shadow-sm">
      {submitted ? (
        <div className="flex flex-col items-center gap-3 py-4 text-center">
          <CheckCircleIcon className="w-10 h-10 text-amber-500" />
          <p className="font-bold text-stone-900">You're in!</p>
          <p className="text-sm text-stone-500">Check your inbox for a confirmation.</p>
        </div>
      ) : (
        <>
          <p className="font-bold text-stone-900 text-base mb-1">{heading}</p>
          <ul className="mb-5 space-y-2">
            {benefits.map((b) => (
              <li key={b} className="flex items-start gap-2 text-sm text-stone-600">
                <span className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-[10px] font-bold">
                  ✓
                </span>
                {b}
              </li>
            ))}
          </ul>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={placeholder}
              required
              className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-stone-900 placeholder-stone-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
            />
            <button
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold text-sm py-2.5 rounded-xl transition-colors"
            >
              {buttonLabel}
            </button>
          </form>
          <p className="mt-3 text-[11px] text-stone-400 text-center">No spam. Unsubscribe any time.</p>
        </>
      )}
    </div>
  );
}

// ── Demo ──────────────────────────────────────────────────────────────────────

export default function NewsletterSectionDemo() {
  return (
    <div className="bg-stone-50">
      <NewsletterSectionA />
      <section className="py-16 px-5 bg-white">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold text-stone-400 uppercase tracking-widest text-center mb-8">
            Compact card variant — sidebar / footer use
          </p>
          <div className="flex justify-center">
            <NewsletterCard />
          </div>
        </div>
      </section>
    </div>
  );
}
