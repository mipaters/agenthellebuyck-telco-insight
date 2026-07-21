import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Panel, SectionLabel, Chip } from "@/components/ui/panel";
import { ArrowLeft, Activity, Gauge, Wallet, Calendar, Smartphone, Wifi, MapPin, ChevronRight, PhoneCall } from "lucide-react";

export const Route = createFileRoute("/brief")({
  head: () => ({
    meta: [
      { title: "Subscriber 360 · Pre-call Brief · Agent Hellebuyck" },
      { name: "description", content: "Pre-call screen-pop with churn score, SHAP attribution, and full Subscriber 360 for Agent Hellebuyck retention agents." },
      { property: "og:title", content: "Subscriber 360 · Agent Hellebuyck" },
      { property: "og:description", content: "Churn 0.38 · top 3% · Contract expiry in 12 days. Explained by SHAP." },
    ],
  }),
  component: Brief,
});

const SHAP = [
  { i: 1, name: "Contract expiry", code: "ctn_days_to_eoc", val: 0.14, pct: 44, sign: "+", pos: 55, w: 20 },
  { i: 2, name: "Device overdue", code: "ctn_days_since_hup", val: 0.08, pct: 25, sign: "+", pos: 62, w: 14 },
  { i: 3, name: "Negative sentiment", code: "categ_ban_sentiment_30d", val: 0.05, pct: 16, sign: "+", pos: 75, w: 10 },
  { i: 4, name: "Not converged", code: "categ_converged", val: 0.03, pct: 9, sign: "+", pos: 82, w: 6 },
  { i: 5, name: "High MRC vs cohort", code: "aggregate signal", val: 0.01, pct: 3, sign: "+", pos: 88, w: 3 },
  { i: 6, name: "Digitally engaged", code: "categ_ban_num_app_dates_90d", val: -0.01, pct: 0, sign: "-", pos: 45, w: 4, neg: true },
];

function Brief() {
  return (
    <AppShell>
      <Link to="/" className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-primary transition">
        <ArrowLeft className="h-3.5 w-3.5" /> Back to Cockpit
      </Link>

      <div className="mt-6 flex flex-wrap items-start justify-between gap-6">
        <div>
          <Chip tone="warn">Pre-Call Brief · Screen-Pop</Chip>
          <h1 className="mt-3 font-serif text-5xl md:text-6xl leading-[1.02]">Subscriber 360</h1>
          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
            <span className="font-semibold text-foreground">Marcus Bélanger</span>
            <span className="font-mono text-xs text-muted-foreground">CTN-8A3F · BAN 4471 · ON</span>
            <Chip>PRIZM · Turbo Burbs</Chip>
          </div>
        </div>

        <Link
          to="/live"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground glow-rogers hover:brightness-110 transition"
        >
          <PhoneCall className="h-4 w-4" /> Start Live Call
          <span className="h-2 w-2 rounded-full bg-amber animate-pulse-dot ml-1" />
        </Link>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-[minmax(0,340px)_1fr]">
        {/* Churn risk */}
        <Panel tint>
          <SectionLabel icon={<Gauge className="h-3.5 w-3.5" />} right={<span>Daily model score</span>}>
            Churn Risk
          </SectionLabel>
          <div className="flex flex-col items-center">
            <div className="relative w-56 h-56">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="6" fill="none" className="text-muted" />
                <circle
                  cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="6" fill="none" strokeLinecap="round"
                  strokeDasharray={`${0.38 * 264} 264`} className="text-primary"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-serif text-6xl text-primary leading-none">0.38</span>
                <Chip tone="danger">top 3%</Chip>
              </div>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-background border border-border p-4 text-center">
              <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Risk percentile</div>
              <div className="mt-1 font-serif text-2xl text-primary">Top 3%</div>
            </div>
            <div className="rounded-xl bg-background border border-border p-4 text-center">
              <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Horizon</div>
              <div className="mt-1 font-serif text-2xl text-primary">Near-term</div>
              <div className="text-[11px] text-muted-foreground">8–30 days</div>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Chip tone="danger">Contract Expiry</Chip>
            <Chip>Device Overdue</Chip>
            <Chip>Service Friction</Chip>
          </div>
        </Panel>

        {/* SHAP */}
        <Panel>
          <SectionLabel icon={<Activity className="h-3.5 w-3.5" />} right={<span>Per-subscriber feature contributions</span>}>
            Why — SHAP Attribution
          </SectionLabel>

          <div className="space-y-3">
            <RowShap i="·" name="Base rate" code="" val="0.06" pct="—" bar={<div className="h-2.5 rounded-full bg-muted overflow-hidden"><div className="h-full bg-muted-foreground/40 w-[15%]" /></div>} />
            {SHAP.map((s) => (
              <RowShap
                key={s.i}
                i={String(s.i)}
                name={s.name}
                code={s.code}
                val={`${s.sign}${Math.abs(s.val).toFixed(2)}`}
                pct={s.pct ? `${s.pct}%` : "—"}
                bar={
                  <div className="relative h-2.5 rounded-full bg-muted overflow-hidden">
                    <div
                      className={"absolute top-0 h-full rounded-full " + (s.neg ? "bg-amber" : "bg-gradient-to-r from-primary to-primary-foreground/0 bg-primary")}
                      style={{ left: `${s.pos - s.w}%`, width: `${s.w * 2}%` }}
                    />
                  </div>
                }
                emphasize={s.i === 1}
              />
            ))}
            <div className="pt-3 border-t border-border/60">
              <RowShap
                i="="
                name="Model output"
                code=""
                val="0.38"
                pct="100%"
                bar={<div className="h-2.5 rounded-full bg-muted overflow-hidden"><div className="h-full rounded-full bg-gradient-to-r from-rogers-deep via-primary to-amber w-[76%]" /></div>}
                emphasize
              />
            </div>
          </div>
          <p className="mt-5 text-sm text-muted-foreground">
            Base rate 0.06 plus residual +0.02 resolves to a <span className="text-primary font-medium">0.38 churn score</span>. Contract expiry in 12 days is the dominant driver — the recommended play renews the term and converges the account.
          </p>
        </Panel>
      </div>

      {/* Subscriber profile */}
      <Panel className="mt-6">
        <SectionLabel icon={<Wallet className="h-3.5 w-3.5" />} right={<span>Tenure 28 months</span>}>
          Subscriber Profile
        </SectionLabel>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
          {[
            { icon: Wallet, k: "MRC", v: "$85/mo", s: "→ $110 with uplift" },
            { icon: Calendar, k: "Tenure", v: "28 mo", s: "since activation", accent: false },
            { icon: Calendar, k: "End of contract", v: "12 days", s: "free to port", accent: true },
            { icon: Smartphone, k: "Device age", v: "847 days", s: "since last upgrade", accent: true },
            { icon: Wifi, k: "Convergence", v: "Wireless only", s: "single product", accent: true },
            { icon: MapPin, k: "Segment", v: "Turbo Burbs", s: "PRIZM · ON" },
          ].map((f) => (
            <div key={f.k} className="rounded-xl bg-cream border border-border/60 p-4">
              <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                <f.icon className="h-3.5 w-3.5 text-primary" /> {f.k}
              </div>
              <div className={"mt-2 font-serif text-2xl " + (f.accent ? "text-primary" : "text-foreground")}>{f.v}</div>
              <div className="text-[11px] text-muted-foreground">{f.s}</div>
            </div>
          ))}
        </div>
      </Panel>

      {/* Next best offers */}
      <Panel className="mt-6">
        <SectionLabel right={<span>Ranked by expected save value</span>}>Recommended Next-Best Offers</SectionLabel>
        <div className="grid gap-3 md:grid-cols-3">
          {[
            { title: "Loyalty Upgrade Bundle", body: "New flagship device at $0 down, 24-month plan renewal, and Home Internet added to converge the account.", accept: "46%", save: "$2,040", tone: "primary" },
            { title: "Term Renewal + Data Boost", body: "Renew 24-month term; add 20GB Canada/US data with $10/mo loyalty credit for 12 months.", accept: "31%", save: "$1,280" },
            { title: "Care Escalation + Credit", body: "Loop in Tier-2 care to resolve open service ticket; apply $15/mo goodwill credit for 6 months.", accept: "22%", save: "$690" },
          ].map((o, i) => (
            <div key={o.title} className={"relative rounded-2xl border p-5 " + (i === 0 ? "border-primary/40 bg-cream" : "border-border bg-card")}>
              {i === 0 && <span className="absolute -top-2 left-4"><Chip tone="danger">Top recommendation</Chip></span>}
              <div className="font-serif text-xl text-foreground">{o.title}</div>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{o.body}</p>
              <div className="mt-4 flex items-center justify-between pt-3 border-t border-border/60">
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Accept</div>
                  <div className="font-mono text-sm text-primary">{o.accept}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Save value</div>
                  <div className="font-mono text-sm text-primary">{o.save}</div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </AppShell>
  );
}

function RowShap({ i, name, code, val, pct, bar, emphasize }: { i: string; name: string; code: string; val: string; pct: string; bar: React.ReactNode; emphasize?: boolean }) {
  return (
    <div className="grid grid-cols-[24px_minmax(180px,1fr)_minmax(0,2fr)_60px_44px] items-center gap-3">
      <span className={"text-[11px] font-mono " + (emphasize ? "text-primary" : "text-muted-foreground")}>{i}</span>
      <div>
        <div className={"text-sm " + (emphasize ? "font-semibold text-foreground" : "font-medium text-foreground")}>{name}</div>
        {code && <div className="text-[10px] font-mono text-muted-foreground">{code}</div>}
      </div>
      {bar}
      <span className={"text-right font-mono text-sm " + (val.startsWith("-") ? "text-amber" : emphasize ? "text-primary" : "text-primary")}>{val}</span>
      <span className="text-right font-mono text-[11px] text-muted-foreground">{pct}</span>
    </div>
  );
}
