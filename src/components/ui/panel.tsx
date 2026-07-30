import type { ReactNode } from "react";

export function Panel({
  children,
  className = "",
  tint = false,
  id,
}: {
  children: ReactNode;
  className?: string;
  tint?: boolean;
  id?: string;
}) {
  return (
    <div
      id={id}
      className={
        "rounded-2xl border border-border p-6 " +
        (tint ? "bg-cream" : "bg-card") +
        " " +
        className
      }
    >
      {children}
    </div>
  );
}

export function SectionLabel({
  icon,
  children,
  right,
}: {
  icon?: ReactNode;
  children: ReactNode;
  right?: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between mb-5">
      <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.18em] text-foreground">
        {icon && (
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 text-primary">
            {icon}
          </span>
        )}
        <span className="font-semibold">{children}</span>
      </div>
      {right && <div className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">{right}</div>}
    </div>
  );
}

export function Chip({ children, tone = "default" }: { children: ReactNode; tone?: "default" | "danger" | "warn" | "ok" }) {
  const tones: Record<string, string> = {
    default: "bg-muted text-muted-foreground",
    danger: "bg-primary/10 text-primary",
    warn: "bg-amber/20 text-primary",
    ok: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  };
  return (
    <span className={"inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium " + tones[tone]}>
      {children}
    </span>
  );
}
