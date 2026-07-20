import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Panel, SectionLabel, Chip } from "@/components/ui/panel";
import { ShieldCheck, TrendingUp, Coins, Scale, Target, RefreshCw } from "lucide-react";

export const Route = createFileRoute("/measurement")({
  head: () => ({
    meta: [
      { title: "Closed-Loop Measurement · Rogers Wireless" },
      { name: "description", content: "Every save measured against a randomised holdout, attributed by offer arm, fed back to retrain the model." },
      { property: "og:title", content: "Closed-Loop Measurement · Rogers Wireless" },
      { property: "og:description", content: "31% save rate · $310 per save · 6.6× program return." },
    ],
  }),
  component: Measurement,
});

function Measurement() {
  return (
    <AppShell>
      <Chip tone="warn">Closed-Loop Measurement · Treatment vs Holdout</Chip>
      <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-5xl md:text-6xl leading-[1.02]">Closed-Loop Measurement</h1>
          <p className="mt-4 max-w-3xl text-muted-foreground">
            Every save is measured against a randomised holdout, attributed by offer arm, and fed back to retrain the model —
            <span className="text-primary font-medium"> 31%</span> save rate at <span className="text-primary font-medium">$310</span> per save, <span className="text-primary font-medium">6.6×</span> program return.
          </p>
        </div>
        <Chip tone="danger">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-dot mr-2 inline-block" />
          612 saves this cycle
        </Chip>
      </div>

      <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          { icon: ShieldCheck, k: "Save rate", v: "31%", s: "treatment · vs 22% randomised holdout" },
          { icon: TrendingUp, k: "Holdout lift", v: "+8.6 pts", s: "causal lift, holdout-adjusted" },
          { icon: Coins, k: "Cost per save", v: "$310", s: "blended across offer arms" },
          { icon: Scale, k: "Program ROI", v: "6.6×", s: "$524K MRC retained/mo · $6.29M annualised" },
        ].map((k) => (
          <Panel key={k.k} className="relative overflow-hidden">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/8 blur-2xl" />
            <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 text-primary">
                <k.icon className="h-3.5 w-3.5" />
              </span>
              {k.k}
            </div>
            <div className="mt-4 font-serif text-4xl text-foreground">{k.v}</div>
            <div className="mt-1 text-xs text-muted-foreground">{k.s}</div>
          </Panel>
        ))}
      </section>

      <section className="mt-6 grid gap-4 lg:grid-cols-[1.6fr_1fr]">
        <Panel>
          <SectionLabel icon={<Target className="h-3.5 w-3.5" />} right={<span>Cohort retention vs randomised control</span>}>
            Retention Curve · T+90
          </SectionLabel>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5"><span className="h-0.5 w-6 bg-primary" /> Copilot treatment</span>
            <span className="inline-flex items-center gap-1.5"><span className="h-0.5 w-6 border-t border-dashed border-muted-foreground" /> Randomised holdout</span>
          </div>

          <RetentionChart />

          <div className="mt-4 pt-4 border-t border-border/60 flex justify-between text-xs text-muted-foreground">
            <span>Subscribers retained 90 days post-intervention</span>
            <span className="font-mono text-primary">+8.6 pts at T+90</span>
          </div>
        </Panel>

        <Panel>
          <SectionLabel icon={<RefreshCw className="h-3.5 w-3.5" />}>Save Rate vs Holdout</SectionLabel>
          <div>
            <div className="flex items-baseline justify-between text-sm">
              <span className="font-medium">Copilot treatment</span>
              <span className="font-serif text-xl text-primary">31%</span>
            </div>
            <div className="mt-2 h-3 rounded-full bg-muted overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-rogers-deep via-primary to-amber" style={{ width: "62%" }} />
            </div>
          </div>
          <div className="mt-5">
            <div className="flex items-baseline justify-between text-sm">
              <span className="font-medium">Randomised holdout</span>
              <span className="font-serif text-xl text-muted-foreground">22%</span>
            </div>
            <div className="mt-2 h-3 rounded-full bg-muted overflow-hidden">
              <div className="h-full rounded-full bg-muted-foreground/50" style={{ width: "44%" }} />
            </div>
          </div>
          <div className="mt-5 inline-flex items-center gap-2 rounded-xl bg-primary/10 px-3 py-2 text-primary text-sm">
            <TrendingUp className="h-4 w-4" /> +8.6 pts holdout-adjusted lift
          </div>

          <div className="mt-6 divide-y divide-border/60 border-y border-border/60">
            {[
              { k: "Saves this cycle", v: "612" },
              { k: "MRC retained", v: "$524K/mo" },
              { k: "Annualised value", v: "$6.29M" },
            ].map((r) => (
              <div key={r.k} className="flex items-center justify-between py-3 text-sm">
                <span className="text-muted-foreground">{r.k}</span>
                <span className="font-mono font-medium text-foreground">{r.v}</span>
              </div>
            ))}
          </div>
        </Panel>
      </section>

      <Panel className="mt-6">
        <SectionLabel right={<span>Offer arm attribution · lift per $ spent</span>}>Offer Arm Performance</SectionLabel>
        <div className="grid gap-3 md:grid-cols-3">
          {[
            { name: "Loyalty Upgrade Bundle", saves: 214, lift: "+11.2 pts", cost: "$385", roi: "7.4×" },
            { name: "Term Renewal + Data Boost", saves: 187, lift: "+8.1 pts", cost: "$260", roi: "6.9×" },
            { name: "Care Escalation + Credit", saves: 96, lift: "+5.4 pts", cost: "$210", roi: "4.1×" },
            { name: "Device HUP Only", saves: 71, lift: "+6.8 pts", cost: "$330", roi: "5.2×" },
            { name: "Same-day Retention", saves: 32, lift: "+4.9 pts", cost: "$180", roi: "3.6×" },
            { name: "Convergence Add-On", saves: 12, lift: "+3.2 pts", cost: "$450", roi: "2.4×" },
          ].map((o) => (
            <div key={o.name} className="rounded-2xl border border-border bg-cream p-4">
              <div className="font-medium">{o.name}</div>
              <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                <Metric k="Saves" v={String(o.saves)} />
                <Metric k="Lift" v={o.lift} accent />
                <Metric k="Cost/save" v={o.cost} />
                <Metric k="ROI" v={o.roi} accent />
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </AppShell>
  );
}

function Metric({ k, v, accent }: { k: string; v: string; accent?: boolean }) {
  return (
    <div className="rounded-lg bg-background border border-border/60 px-2.5 py-1.5">
      <div className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground">{k}</div>
      <div className={"font-mono text-sm " + (accent ? "text-primary" : "text-foreground")}>{v}</div>
    </div>
  );
}

function RetentionChart() {
  // Two lines, treatment (solid) and holdout (dashed), 4 points t0..t90
  const w = 720, h = 260, pad = 40;
  const tPts = [100, 96, 93, 91];
  const cPts = [100, 92, 86, 82];
  const x = (i: number) => pad + (i * (w - pad * 2)) / 3;
  const y = (v: number) => pad + ((100 - v) / 22) * (h - pad * 2);
  const path = (arr: number[]) => arr.map((v, i) => `${i === 0 ? "M" : "L"}${x(i)},${y(v)}`).join(" ");

  return (
    <div className="mt-4 -mx-2 overflow-x-auto">
      <svg viewBox={`0 0 ${w} ${h + 30}`} className="w-full min-w-[560px]">
        <defs>
          <linearGradient id="fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="oklch(0.52 0.22 28)" stopOpacity="0.25" />
            <stop offset="1" stopColor="oklch(0.52 0.22 28)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[100, 95, 90, 85, 80].map((v) => (
          <g key={v}>
            <line x1={pad} x2={w - pad} y1={y(v)} y2={y(v)} stroke="currentColor" strokeOpacity="0.1" />
            <text x={8} y={y(v) + 4} fontSize="10" className="fill-muted-foreground font-mono">{v}%</text>
          </g>
        ))}
        {/* fill under treatment */}
        <path d={`${path(tPts)} L${x(3)},${y(80)} L${x(0)},${y(80)} Z`} fill="url(#fill)" />
        {/* holdout dashed */}
        <path d={path(cPts)} fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="6 5" className="text-muted-foreground" />
        {cPts.map((v, i) => <circle key={i} cx={x(i)} cy={y(v)} r="4" fill="var(--background)" stroke="currentColor" className="text-muted-foreground" strokeWidth="2" />)}
        {/* treatment */}
        <path d={path(tPts)} fill="none" stroke="oklch(0.52 0.22 28)" strokeWidth="3" strokeLinecap="round" />
        {tPts.map((v, i) => <circle key={i} cx={x(i)} cy={y(v)} r="5" fill="var(--background)" stroke="oklch(0.52 0.22 28)" strokeWidth="2.5" />)}
        {/* lift bracket */}
        <line x1={x(3) + 20} x2={x(3) + 20} y1={y(tPts[3])} y2={y(cPts[3])} stroke="oklch(0.52 0.22 28)" strokeWidth="1.5" />
        <text x={x(3) + 28} y={(y(tPts[3]) + y(cPts[3])) / 2 + 4} fontSize="13" className="fill-primary font-mono font-medium">+8.6 pts</text>

        {["T+0", "T+30", "T+60", "T+90"].map((l, i) => (
          <text key={l} x={x(i)} y={h + 15} textAnchor="middle" fontSize="11" className="fill-muted-foreground font-mono">{l}</text>
        ))}
      </svg>
    </div>
  );
}
