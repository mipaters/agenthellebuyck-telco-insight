import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { LayoutGrid, UserRound, Headphones, LineChart, Layers, Moon, Sun, Radio, PlayCircle } from "lucide-react";
import { ExecWalkthrough } from "@/components/ExecWalkthrough";

const NAV = [
  { to: "/", label: "Cockpit", icon: LayoutGrid },
  { to: "/brief", label: "Brief", icon: UserRound },
  { to: "/live", label: "Live Call", icon: Headphones },
  { to: "/measurement", label: "Measurement", icon: LineChart },
  { to: "/architecture", label: "Architecture", icon: Layers },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [dark, setDark] = useState(false);
  const [tourOpen, setTourOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [dark]);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-3 group">
            <span className="relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Radio className="h-5 w-5" />
              <span className="absolute inset-0 rounded-full border border-primary/40 animate-ping-slow" />
            </span>
            <span className="leading-tight">
              <span className="block text-[15px] font-semibold tracking-tight">Agent Hellebuyck</span>
              <span className="block text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
                Interactions Analytics Platform
              </span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1 rounded-full border border-border bg-card/60 p-1">
            {NAV.map(({ to, label, icon: Icon }) => {
              const active =
                to === "/" ? pathname === "/" : pathname.startsWith(to);
              return (
                <Link
                  key={to}
                  to={to}
                  className={
                    "flex items-center gap-2 rounded-full px-4 py-1.5 text-sm transition-all " +
                    (active
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:text-foreground")
                  }
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setTourOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-1.5 text-xs font-medium text-primary-foreground hover:brightness-110 transition"
            >
              <PlayCircle className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Executive demo</span>
              <span className="sm:hidden">Demo</span>
            </button>
            <span className="hidden sm:inline-flex items-center gap-2 rounded-full bg-amber/20 px-3 py-1 text-[11px] font-mono uppercase tracking-widest text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-dot" />
              Live
            </span>
            <button
              onClick={() => setDark((d) => !d)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground hover:bg-accent transition"
              aria-label="Toggle theme"
            >
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          </div>
        </div>
        {/* mobile nav */}
        <nav className="md:hidden flex overflow-x-auto gap-1 px-4 pb-3">
          {NAV.map(({ to, label, icon: Icon }) => {
            const active = to === "/" ? pathname === "/" : pathname.startsWith(to);
            return (
              <Link key={to} to={to}
                className={"flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs " +
                  (active ? "border-primary/40 bg-primary/10 text-primary" : "border-border text-muted-foreground")}>
                <Icon className="h-3.5 w-3.5" /> {label}
              </Link>
            );
          })}
        </nav>
      </header>
      <main className="mx-auto max-w-[1400px] px-6 py-10">{children}</main>
      <footer className="border-t border-border/60 mt-16">
        <div className="mx-auto max-w-[1400px] px-6 py-6 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground font-mono">
          <span>Agent Hellebuyck · Interactions Analytics Platform</span>
          <span>Runs on Azure you already own · XGBoost + SHAP · 174 features</span>
        </div>
      </footer>
      {tourOpen && <ExecWalkthrough onClose={() => setTourOpen(false)} />}
    </div>
  );
}
