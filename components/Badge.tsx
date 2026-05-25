type BadgeVariant = "default" | "primary" | "success" | "warning" | "error" | "info" | "purple";
type BadgeSize = "sm" | "md";

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
}

const VARIANT_STYLES: Record<BadgeVariant, string> = {
  default:  "bg-stone-100 text-stone-700 ring-stone-200",
  primary:  "bg-amber-100 text-amber-800 ring-amber-200",
  success:  "bg-emerald-100 text-emerald-800 ring-emerald-200",
  warning:  "bg-yellow-100 text-yellow-800 ring-yellow-200",
  error:    "bg-red-100 text-red-700 ring-red-200",
  info:     "bg-sky-100 text-sky-800 ring-sky-200",
  purple:   "bg-violet-100 text-violet-800 ring-violet-200",
};

const DOT_STYLES: Record<BadgeVariant, string> = {
  default:  "bg-stone-400",
  primary:  "bg-amber-500",
  success:  "bg-emerald-500",
  warning:  "bg-yellow-500",
  error:    "bg-red-500",
  info:     "bg-sky-500",
  purple:   "bg-violet-500",
};

function Badge({ label, variant = "default", size = "md", dot = false }: BadgeProps) {
  const sizeClass = size === "sm" ? "h-5 px-2 text-[10px] gap-1" : "h-6 px-2.5 text-xs gap-1.5";
  return (
    <span className={`inline-flex items-center font-medium rounded-full ring-1 ${sizeClass} ${VARIANT_STYLES[variant]}`}>
      {dot && <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${DOT_STYLES[variant]}`} />}
      {label}
    </span>
  );
}

export default function BadgeDemo() {
  const variants: BadgeVariant[] = ["default", "primary", "success", "warning", "error", "info", "purple"];
  return (
    <div className="p-10 bg-white space-y-8">
      <div>
        <p className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-3">Variants</p>
        <div className="flex flex-wrap gap-2">
          {variants.map((v) => (
            <Badge key={v} label={v.charAt(0).toUpperCase() + v.slice(1)} variant={v} />
          ))}
        </div>
      </div>
      <div>
        <p className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-3">With dot</p>
        <div className="flex flex-wrap gap-2">
          <Badge label="Active" variant="success" dot />
          <Badge label="Pending" variant="warning" dot />
          <Badge label="Failed" variant="error" dot />
          <Badge label="Processing" variant="info" dot />
        </div>
      </div>
      <div>
        <p className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-3">Sizes</p>
        <div className="flex items-center gap-2">
          <Badge label="Small" size="sm" variant="primary" />
          <Badge label="Medium" size="md" variant="primary" />
        </div>
      </div>
      <div>
        <p className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-3">In context</p>
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-stone-800">Plan</span>
          <Badge label="Pro" variant="primary" />
        </div>
        <div className="mt-2 flex items-center gap-3">
          <span className="text-sm font-medium text-stone-800">Status</span>
          <Badge label="Active" variant="success" dot />
        </div>
        <div className="mt-2 flex items-center gap-3">
          <span className="text-sm font-medium text-stone-800">Invoice</span>
          <Badge label="Overdue" variant="error" dot />
        </div>
      </div>
    </div>
  );
}
