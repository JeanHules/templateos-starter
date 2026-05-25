interface HeroSectionProps {
  badge?: string;
  headline?: string;
  subheadline?: string;
  primaryCta?: string;
  secondaryCta?: string;
  socialProof?: string;
}

function HeroSection({
  badge = "✨ Introducing version 2.0",
  headline = "Build products your\ncustomers will love",
  subheadline = "Acme gives your team everything you need to move fast, ship confidently, and delight the people who matter most — your customers.",
  primaryCta = "Start for free",
  secondaryCta = "See how it works →",
  socialProof = "Trusted by 12,000+ teams worldwide",
}: HeroSectionProps) {
  return (
    <section className="bg-gradient-to-b from-amber-50 via-orange-50/40 to-white py-24 px-5">
      <div className="mx-auto max-w-3xl text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 text-xs font-medium px-3.5 py-1.5 rounded-full mb-8">
          <span>{badge}</span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl font-bold text-stone-900 tracking-tight leading-[1.1] mb-6 whitespace-pre-line">
          {headline}
        </h1>

        {/* Subheadline */}
        <p className="text-lg text-stone-600 leading-relaxed mb-10 max-w-2xl mx-auto">
          {subheadline}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
          <a
            href="#"
            className="inline-flex items-center h-12 px-7 bg-amber-500 text-white font-semibold rounded-full hover:bg-amber-600 transition-colors shadow-sm shadow-amber-200 text-sm"
          >
            {primaryCta}
          </a>
          <a
            href="#"
            className="inline-flex items-center h-12 px-6 text-stone-700 font-medium text-sm hover:text-amber-600 transition-colors"
          >
            {secondaryCta}
          </a>
        </div>

        {/* Social proof */}
        <p className="text-sm text-stone-500">{socialProof}</p>

        {/* App screenshot placeholder */}
        <div className="mt-16 mx-auto max-w-4xl rounded-2xl bg-white border border-stone-200 shadow-xl shadow-stone-100/80 overflow-hidden">
          <div className="border-b border-stone-200 px-4 py-3 flex items-center gap-2 bg-stone-50">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
            <div className="ml-3 flex-1 bg-white rounded-md h-6 border border-stone-200" />
          </div>
          <div className="h-64 bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center">
            <p className="text-stone-400 text-sm">App screenshot</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HeroSectionDemo() {
  return (
    <div className="bg-white">
      <HeroSection />
    </div>
  );
}
