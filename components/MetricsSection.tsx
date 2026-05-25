import { useState, useEffect, useRef } from "react";

interface Metric {
  displayValue: string;
  numericTarget: number;
  prefix: string;
  suffix: string;
  label: string;
  description: string;
}

const METRICS: Metric[] = [
  {
    displayValue: "10,000+",
    numericTarget: 10000,
    prefix: "",
    suffix: "+",
    label: "Teams worldwide",
    description: "From solo founders to enterprise orgs — teams of every size rely on Acme to ship faster.",
  },
  {
    displayValue: "98%",
    numericTarget: 98,
    prefix: "",
    suffix: "%",
    label: "Satisfaction score",
    description: "Measured across 12,000+ support interactions. We obsess over every experience.",
  },
  {
    displayValue: "$2.4B",
    numericTarget: 2.4,
    prefix: "$",
    suffix: "B",
    label: "Processed",
    description: "Our customers process billions in revenue each year through workflows built on Acme.",
  },
  {
    displayValue: "140",
    numericTarget: 140,
    prefix: "",
    suffix: "",
    label: "Countries",
    description: "Acme is truly global — used on every continent, with first-class localization support.",
  },
];

const LOGOS = [
  "Meridian",
  "Lumen Co.",
  "Orbit Labs",
  "Vesper AI",
  "Paperclip",
  "Stackwise",
];

function useCountUp(target: number, duration: number, started: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started) return;
    let startTime: number | null = null;
    const isFloat = target < 100 && !Number.isInteger(target);

    function tick(timestamp: number) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * target;
      setCount(isFloat ? Math.round(current * 10) / 10 : Math.floor(current));
      if (progress < 1) requestAnimationFrame(tick);
      else setCount(target);
    }

    const frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, duration, started]);

  return count;
}

interface MetricCardProps {
  metric: Metric;
  started: boolean;
}

function MetricCard({ metric, started }: MetricCardProps) {
  const count = useCountUp(metric.numericTarget, 1800, started);
  const isFloat = metric.numericTarget < 100 && !Number.isInteger(metric.numericTarget);
  const displayCount = isFloat ? count.toFixed(1) : count.toLocaleString();

  return (
    <div className="flex flex-col items-center text-center px-6 py-8">
      <p className="text-5xl font-extrabold text-amber-500 tracking-tight mb-2 tabular-nums">
        {metric.prefix}{displayCount}{metric.suffix}
      </p>
      <p className="text-base font-semibold text-stone-900 mb-2">{metric.label}</p>
      <p className="text-sm text-stone-500 leading-relaxed max-w-[200px]">{metric.description}</p>
    </div>
  );
}

interface MetricsSectionProps {
  heading?: string;
  metrics?: Metric[];
  logos?: string[];
}

function MetricsSection({
  heading = "Numbers that speak for themselves",
  metrics = METRICS,
  logos = LOGOS,
}: MetricsSectionProps) {
  const [started, setStarted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-5 bg-amber-50/40">
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-stone-900 tracking-tight">{heading}</h2>
        </div>

        {/* Metrics row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 divide-x-0 lg:divide-x divide-stone-200 bg-white rounded-2xl border border-stone-200 shadow-sm mb-14">
          {metrics.map((metric) => (
            <MetricCard key={metric.label} metric={metric} started={started} />
          ))}
        </div>

        {/* Logo band */}
        <div>
          <p className="text-center text-xs font-semibold text-stone-400 uppercase tracking-widest mb-8">
            Trusted by teams at
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-5">
            {logos.map((logo) => (
              <span
                key={logo}
                className="text-stone-400 font-semibold text-base tracking-tight hover:text-stone-600 transition-colors cursor-default"
              >
                {logo}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function MetricsSectionDemo() {
  return (
    <div className="bg-amber-50/40">
      <MetricsSection />
    </div>
  );
}
