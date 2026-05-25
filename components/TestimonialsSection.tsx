interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  initials: string;
  color: string;
}

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    quote: "We switched from a bloated agency toolkit to Acme in a weekend. Our team ships twice as fast and the UI looks better than anything we built before.",
    name: "Sarah Chen",
    role: "CTO",
    company: "Vesper AI",
    initials: "SC",
    color: "bg-amber-100 text-amber-700",
  },
  {
    quote: "The components are genuinely beautiful. Our designer saw it and thought we hired a new agency. We didn't — just used Acme.",
    name: "Marcus Rivera",
    role: "Founder",
    company: "Paperclip",
    initials: "MR",
    color: "bg-orange-100 text-orange-700",
  },
  {
    quote: "I've tried every template out there. Nothing comes close to how polished and consistent Acme feels out of the box. It just works.",
    name: "Priya Kapoor",
    role: "Lead Engineer",
    company: "Orbit Labs",
    initials: "PK",
    color: "bg-rose-100 text-rose-700",
  },
];

interface TestimonialsSectionProps {
  tag?: string;
  headline?: string;
  testimonials?: Testimonial[];
}

function TestimonialsSection({
  tag = "Testimonials",
  headline = "Loved by builders everywhere",
  testimonials = DEFAULT_TESTIMONIALS,
}: TestimonialsSectionProps) {
  return (
    <section className="py-24 px-5 bg-amber-50/40">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-semibold text-amber-600 uppercase tracking-widest mb-3">{tag}</span>
          <h2 className="text-4xl font-bold text-stone-900 tracking-tight">{headline}</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-white rounded-2xl p-7 border border-stone-100 shadow-sm flex flex-col gap-5">
              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              {/* Quote */}
              <p className="text-stone-700 text-sm leading-relaxed flex-1">"{t.quote}"</p>
              {/* Author */}
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full ${t.color} flex items-center justify-center text-xs font-bold flex-shrink-0`}>
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-stone-900">{t.name}</p>
                  <p className="text-xs text-stone-500">{t.role}, {t.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function TestimonialsSectionDemo() {
  return (
    <div className="bg-amber-50/40">
      <TestimonialsSection />
    </div>
  );
}
