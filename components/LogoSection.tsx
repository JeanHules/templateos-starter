interface LogoItem {
  name: string;
  initials: string;
}

const DEFAULT_LOGOS: LogoItem[] = [
  { name: "Vercel", initials: "▲" },
  { name: "Stripe", initials: "S" },
  { name: "Linear", initials: "L" },
  { name: "Notion", initials: "N" },
  { name: "Figma", initials: "F" },
  { name: "Loom", initials: "Lo" },
];

interface LogoSectionProps {
  label?: string;
  logos?: LogoItem[];
}

function LogoSection({
  label = "Trusted by teams at the world's best companies",
  logos = DEFAULT_LOGOS,
}: LogoSectionProps) {
  return (
    <section className="py-16 px-5 border-y border-stone-100 bg-white">
      <div className="mx-auto max-w-5xl">
        <p className="text-center text-sm text-stone-400 mb-10">{label}</p>
        <div className="flex flex-wrap items-center justify-center gap-10">
          {logos.map((logo) => (
            <div
              key={logo.name}
              className="flex items-center gap-2 text-stone-400 hover:text-stone-600 transition-colors"
            >
              <span className="text-xl font-bold">{logo.initials}</span>
              <span className="text-base font-semibold tracking-tight">{logo.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function LogoSectionDemo() {
  return <LogoSection />;
}
