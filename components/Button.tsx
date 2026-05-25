interface ButtonProps {
  label: string;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  onClick?: () => void;
}

function Button({ label, variant = "primary", size = "md", disabled, onClick }: ButtonProps) {
  const base = "inline-flex items-center font-medium rounded-lg transition-colors disabled:opacity-50 disabled:pointer-events-none";
  const sizes = { sm: "h-8 px-3 text-xs", md: "h-10 px-4 text-sm", lg: "h-11 px-5 text-base" };
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700",
    secondary: "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50",
    ghost: "text-slate-600 hover:bg-slate-100",
  };
  return (
    <button className={`${base} ${sizes[size]} ${variants[variant]}`} disabled={disabled} onClick={onClick}>
      {label}
    </button>
  );
}

export default function ButtonDemo() {
  return (
    <div className="p-10 space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <Button label="Primary" variant="primary" />
        <Button label="Secondary" variant="secondary" />
        <Button label="Ghost" variant="ghost" />
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button label="Small" size="sm" />
        <Button label="Medium" size="md" />
        <Button label="Large" size="lg" />
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button label="Disabled" disabled />
        <Button label="Disabled secondary" variant="secondary" disabled />
      </div>
    </div>
  );
}
