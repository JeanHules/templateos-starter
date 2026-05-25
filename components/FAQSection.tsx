import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const DEFAULT_FAQS: FAQItem[] = [
  { question: "Do I need a credit card to sign up?", answer: "Nope. You can start with our free plan immediately, no credit card needed. Only upgrade when you're ready." },
  { question: "Can I change my plan later?", answer: "Yes, absolutely. You can upgrade, downgrade, or cancel your plan at any time from your account settings. Changes take effect immediately." },
  { question: "How does the annual billing work?", answer: "With annual billing, you pay for a full year upfront and get a 20% discount compared to monthly billing. You'll receive one invoice per year." },
  { question: "What happens when I hit my project limit?", answer: "We'll notify you before you hit the limit. You can either upgrade your plan or archive old projects to stay within the limit." },
  { question: "Is my data secure?", answer: "We take security seriously. All data is encrypted in transit and at rest. We're SOC 2 Type II compliant and undergo regular third-party security audits." },
  { question: "Can I export my data?", answer: "Yes. You can export all your data at any time in standard formats (JSON, CSV). We believe your data belongs to you." },
];

interface FAQSectionProps {
  tag?: string;
  headline?: string;
  faqs?: FAQItem[];
}

function FAQSection({
  tag = "FAQ",
  headline = "Questions? We have answers.",
  faqs = DEFAULT_FAQS,
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 px-5 bg-stone-50">
      <div className="mx-auto max-w-2xl">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-semibold text-amber-600 uppercase tracking-widest mb-3">{tag}</span>
          <h2 className="text-4xl font-bold text-stone-900 tracking-tight">{headline}</h2>
        </div>

        <div className="space-y-2">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`rounded-2xl border transition-colors ${isOpen ? "border-amber-200 bg-white" : "border-stone-200 bg-white hover:border-stone-300"}`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                >
                  <span className="text-sm font-semibold text-stone-900 pr-4">{faq.question}</span>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${isOpen ? "bg-amber-100 text-amber-600" : "bg-stone-100 text-stone-500"}`}>
                    <svg className={`w-3 h-3 transition-transform ${isOpen ? "rotate-45" : ""}`} viewBox="0 0 12 12" fill="none">
                      <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                </button>
                {isOpen && (
                  <div className="px-6 pb-6">
                    <p className="text-sm text-stone-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function FAQSectionDemo() {
  return (
    <div className="bg-stone-50">
      <FAQSection />
    </div>
  );
}
