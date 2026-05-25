import { useState } from "react";

type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";
type AvatarStatus = "online" | "offline" | "busy" | "away";

interface AvatarProps {
  initials: string;
  color?: string;
  size?: AvatarSize;
  status?: AvatarStatus;
  src?: string;
}

const SIZE_CLASSES: Record<AvatarSize, string> = {
  xs: "w-6 h-6 text-[9px]",
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-12 h-12 text-base",
  xl: "w-16 h-16 text-xl",
};

const STATUS_DOT_SIZE: Record<AvatarSize, string> = {
  xs: "w-1.5 h-1.5 border",
  sm: "w-2 h-2 border",
  md: "w-2.5 h-2.5 border-2",
  lg: "w-3 h-3 border-2",
  xl: "w-3.5 h-3.5 border-2",
};

const STATUS_COLOR: Record<AvatarStatus, string> = {
  online:  "bg-emerald-500",
  offline: "bg-stone-400",
  busy:    "bg-red-500",
  away:    "bg-amber-400",
};

const COLORS = [
  "bg-amber-100 text-amber-800",
  "bg-orange-100 text-orange-800",
  "bg-rose-100 text-rose-800",
  "bg-violet-100 text-violet-800",
  "bg-sky-100 text-sky-800",
  "bg-emerald-100 text-emerald-800",
  "bg-teal-100 text-teal-800",
];

function Avatar({ initials, color, size = "md", status, src }: AvatarProps) {
  const colorClass = color ?? COLORS[initials.charCodeAt(0) % COLORS.length];
  return (
    <div className="relative inline-flex flex-shrink-0">
      {src ? (
        <img src={src} alt={initials} className={`${SIZE_CLASSES[size]} rounded-full object-cover ring-2 ring-white`} />
      ) : (
        <div className={`${SIZE_CLASSES[size]} rounded-full ${colorClass} flex items-center justify-center font-semibold ring-2 ring-white`}>
          {initials}
        </div>
      )}
      {status && (
        <span className={`absolute bottom-0 right-0 rounded-full border-white ${STATUS_DOT_SIZE[size]} ${STATUS_COLOR[status]}`} />
      )}
    </div>
  );
}

interface AvatarGroupProps {
  items: { initials: string }[];
  max?: number;
  size?: AvatarSize;
}

function AvatarGroup({ items, max = 4, size = "md" }: AvatarGroupProps) {
  const visible = items.slice(0, max);
  const overflow = items.length - max;
  const overlapClass = size === "xs" ? "-ml-1.5" : size === "sm" ? "-ml-2" : "-ml-3";
  return (
    <div className="flex items-center">
      {visible.map((item, i) => (
        <div key={i} className={i > 0 ? overlapClass : ""}>
          <Avatar initials={item.initials} size={size} />
        </div>
      ))}
      {overflow > 0 && (
        <div className={`${SIZE_CLASSES[size]} ${overlapClass} rounded-full bg-stone-100 text-stone-600 flex items-center justify-center font-semibold text-xs ring-2 ring-white`}>
          +{overflow}
        </div>
      )}
    </div>
  );
}

export default function AvatarDemo() {
  const sizes: AvatarSize[] = ["xs", "sm", "md", "lg", "xl"];
  const statuses: AvatarStatus[] = ["online", "offline", "busy", "away"];

  return (
    <div className="p-10 bg-white space-y-8">
      <div>
        <p className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-3">Sizes</p>
        <div className="flex items-end gap-4">
          {sizes.map((s) => <Avatar key={s} initials="JH" size={s} />)}
        </div>
      </div>
      <div>
        <p className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-3">Status</p>
        <div className="flex items-center gap-4">
          {statuses.map((st) => (
            <div key={st} className="flex flex-col items-center gap-1.5">
              <Avatar initials="SC" size="md" status={st} />
              <span className="text-xs text-stone-500 capitalize">{st}</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <p className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-3">Colors</p>
        <div className="flex items-center gap-2">
          {["AB", "CD", "EF", "GH", "IJ", "KL", "MN"].map((i) => (
            <Avatar key={i} initials={i} size="md" />
          ))}
        </div>
      </div>
      <div>
        <p className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-3">Groups</p>
        <div className="space-y-3">
          <AvatarGroup items={[{initials:"AB"},{initials:"CD"},{initials:"EF"},{initials:"GH"},{initials:"IJ"},{initials:"KL"}]} max={4} />
          <AvatarGroup items={[{initials:"MN"},{initials:"OP"},{initials:"QR"}]} size="sm" />
        </div>
      </div>
    </div>
  );
}
