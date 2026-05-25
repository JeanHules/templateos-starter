import { useState } from "react";

function CheckCircleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg className="w-5 h-5 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg className="w-5 h-5 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg className="w-5 h-5 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  );
}

interface ContactMethod {
  label: string;
  value: string;
  subvalue?: string;
  icon: React.ReactNode;
}

const CONTACT_METHODS: ContactMethod[] = [
  { label: "Email", value: "hello@acme.so", subvalue: "We reply within one business day.", icon: <MailIcon /> },
  { label: "Phone", value: "+1 (415) 555-0182", subvalue: "Mon–Fri, 9am–6pm PT.", icon: <PhoneIcon /> },
  { label: "Office", value: "340 Pine Street, Suite 800", subvalue: "San Francisco, CA 94104", icon: <MapPinIcon /> },
];

interface FormState {
  name: string;
  email: string;
  company: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

interface ContactSectionProps {
  heading?: string;
  subtext?: string;
}

function ContactSection({
  heading = "Get in touch",
  subtext = "Have a question, need a demo, or just want to say hi? We're a small team and every message goes to a real person.",
}: ContactSectionProps) {
  const [form, setForm] = useState<FormState>({ name: "", email: "", company: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  function validate(): boolean {
    const next: FormErrors = {};
    if (!form.name.trim()) next.name = "Name is required.";
    if (!form.email.trim()) next.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Enter a valid email address.";
    if (!form.message.trim()) next.message = "Please tell us how we can help.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (validate()) setSubmitted(true);
  }

  function update(field: keyof FormState) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      if (errors[field as keyof FormErrors]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    };
  }

  const inputBase =
    "w-full px-4 py-3 rounded-xl border bg-white text-stone-900 placeholder-stone-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-colors";

  return (
    <section className="py-24 px-5 bg-stone-50">
      <div className="mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left column */}
          <div>
            <span className="inline-block text-xs font-semibold text-amber-600 uppercase tracking-widest mb-3">
              Contact
            </span>
            <h2 className="text-4xl font-bold text-stone-900 tracking-tight mb-4">{heading}</h2>
            <p className="text-lg text-stone-600 leading-relaxed mb-10">{subtext}</p>

            <div className="flex flex-col gap-6">
              {CONTACT_METHODS.map((method) => (
                <div key={method.label} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center">
                    {method.icon}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-0.5">
                      {method.label}
                    </p>
                    <p className="text-sm font-semibold text-stone-900">{method.value}</p>
                    {method.subvalue && <p className="text-sm text-stone-500">{method.subvalue}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column */}
          <div className="bg-white rounded-2xl border border-stone-200 p-8 shadow-sm">
            {submitted ? (
              <div className="flex flex-col items-center gap-4 py-10 text-center">
                <CheckCircleIcon className="w-14 h-14 text-amber-500" />
                <h3 className="text-2xl font-bold text-stone-900">Message received!</h3>
                <p className="text-stone-600 text-base leading-relaxed max-w-xs">
                  Thanks for reaching out. Someone from our team will get back to you within one business day.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1.5">
                      Name <span className="text-amber-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={update("name")}
                      placeholder="Alex Johnson"
                      className={`${inputBase} ${errors.name ? "border-red-400 ring-1 ring-red-400" : "border-stone-200"}`}
                    />
                    {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1.5">
                      Email <span className="text-amber-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={update("email")}
                      placeholder="alex@company.com"
                      className={`${inputBase} ${errors.email ? "border-red-400 ring-1 ring-red-400" : "border-stone-200"}`}
                    />
                    {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">
                    Company <span className="text-stone-400 font-normal">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={form.company}
                    onChange={update("company")}
                    placeholder="Acme Inc."
                    className={`${inputBase} border-stone-200`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">
                    How can we help? <span className="text-amber-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={update("message")}
                    placeholder="Tell us what you're working on..."
                    className={`${inputBase} resize-none ${errors.message ? "border-red-400 ring-1 ring-red-400" : "border-stone-200"}`}
                  />
                  {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold text-sm py-3 rounded-xl transition-colors shadow-sm mt-1"
                >
                  Send message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ContactSectionDemo() {
  return (
    <div className="bg-stone-50">
      <ContactSection />
    </div>
  );
}
