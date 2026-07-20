import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Panel, SectionLabel, Chip } from "@/components/ui/panel";
import {
  Users, DollarSign, ShieldCheck, TrendingUp, Activity, Gauge, ArrowUpRight, PhoneCall,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Retention Cockpit · Rogers Wireless Interactions Analytics" },
      { name: "description", content: "Predict, explain and save every subscriber worth saving — Rogers Wireless retention cockpit powered by real-time interaction analytics." },
      { property: "og:title", content: "Rogers Wireless · Retention Cockpit" },
      { property: "og:description", content: "Save every subscriber worth saving. Live churn scoring, SHAP explanations, and next-best offers." },
    ],
  }),
  component: Cockpit,
});

const HORIZONS = [
  { code: "H0", label: "Imminent", range: "0–7 days", count: 184, mrc: "$109K/mo", pct: 20, tone: "bg-primary" },
  { code: "H1", label: "Near-term", range: "8–30 days", count: 642, mrc: "$392K/mo", pct: 55, tone: "bg-primary/80" },
  { code: "H2", label: "Emerging", range: "31–90 days", count: 981, mrc: "$564K/mo", pct: 85, tone: "bg-amber" },
  { code: "H3", label: "Watch", range: "91+ days", count: 605, mrc: "$355K/mo", pct: 52, tone: "bg-amber/70" },
];

const SIGNALS = [
  { name: "Contract Lifecycle", code: "ctn_days_to_eoc", pct: 31 },
  { name: "Device Lifecycle", code: "ctn_days_since_hup", pct: 19 },
  { name: "CX Friction", code: "categ_ban_sentiment_30d", pct: 14 },
  { name: "Financial Value", code: "ban_flag_no_pay_90d", pct: 12 },
  { name: "Convergence", code: "categ_converged", pct: 10 },
  { name: "Port / Brand History", code: "categ_res_vc_bk_30d", pct: 8 },
  { name: "Digital Engagement", code: "categ_ban_num_app_dates_90d", pct: 6 },
];

const QUEUE = [
  { name: "Marcus Bélanger", ctn: "CTN-8A3F", prov: "ON", score: 0.38, top: "top 3%", signal: "Contract Expiry", horizon: "H1 · 8–30d", mrc: "$85/mo", nbo: "Loyalty Upgrade Bundle", status: "In Call", tone: "danger" },
  { name: "Priya Sharma", ctn: "CTN-7C19", prov: "BC", score: 0.37, top: "top 4%", signal: "Cancel Intent", horizon: "H0 · 0–7d", mrc: "$72/mo", nbo: "Same-day Retention Escalation", status: "Queued" },
  { name: "Diego Alvarez", ctn: "CTN-6F02", prov: "QC", score: 0.34, top: "top 6%", signal: "Device Overdue", horizon: "H1 · 8–30d", mrc: "$95/mo", nbo: "HUP + Home Internet Bundle", status: "Queued" },
  { name: "Aisha Nasser", ctn: "CTN-5D91", prov: "AB", score: 0.31, top: "top 8%", signal: "Negative Sentiment", horizon: "H0 · 0–7d", mrc: "$65/mo", nbo: "Care Escalation + $15 Credit", status: "Queued" },
  { name: "Ethan MacLeod", ctn: "CTN-4A22", prov: "NS", score: 0.28, top: "top 12%", signal: "Port Risk", horizon: "H2 · 31–90d", mrc: "$110/mo", nbo: "Retention Match Offer", status: "Queued" },
  { name: "Chloé Tremblay", ctn: "CTN-3B84", prov: "QC", score: 0.26, top: "top 14%", signal: "Contract Expiry", horizon: "H2 · 31–90d", mrc: "$78/mo", nbo: "Term Renewal + Data Boost", status: "Queued" },
];

function Cockpit() {
  return (
    <AppShell>
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl border border-border bg-cream p-8 md:p-12">
        <div className="grid gap-10 md:grid-cols-[1.15fr_1fr] items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-mono uppercase tracking-[0.18em] text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-dot" />
              Retention Cockpit · Daily Scoring Cycle
            </div>
            <h1 className="mt-5 font-serif text-5xl md:text-7xl leading-[1.02] text-foreground">
              Save every subscriber<br />worth saving.
            </h1>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
              The Interactions Analytics Platform reads every signal on the Rogers network —
              contract, device, sentiment and usage — to predict which subscribers will churn,
              explain why, and arm the agent with the next-best offer live on the call.
            </p>

            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 rounded-2xl border border-border bg-background/60 p-4">
              {[
                { k: "Subs at risk", v: "2,412", s: "this cycle" },
                { k: "MRC exposed", v: "$1.42M/mo", s: "recurring revenue" },
                { k: "Save rate", v: "31%", s: "vs 22% today" },
                { k: "Holdout lift", v: "+8.6 pts", s: "vs control" },
              ].map((m) => (
                <div key={m.k}>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{m.k}</div>
                  <div className="mt-1 font-serif text-2xl text-foreground">{m.v}</div>
                  <div className="text-[11px] text-muted-foreground">{m.s}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/brief"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground glow-rogers hover:brightness-110 transition"
              >
                Open today's top brief <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                to="/live"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium hover:bg-accent transition"
              >
                <PhoneCall className="h-4 w-4" /> Watch a live save
              </Link>
            </div>
          </div>

          {/* Radar */}
          <div className="relative aspect-square max-w-md justify-self-center w-full">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cream-deep to-cream bg-grid" />
            <div className="absolute inset-6 rounded-full border border-primary/20" />
            <div className="absolute inset-14 rounded-full border border-primary/25" />
            <div className="absolute inset-24 rounded-full border border-primary/30" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <span className="absolute inset-0 rounded-full border border-primary/40 animate-ping-slow" />
                <span className="absolute inset-0 rounded-full border border-primary/40 animate-ping-slow" style={{ animationDelay: "0.9s" }} />
                <div className="relative h-16 w-16 rounded-full bg-primary text-primary-foreground grid place-items-center glow-rogers">
                  <Activity className="h-7 w-7" />
                </div>
              </div>
            </div>
            {/* signal blips */}
            {[
              { t: "18%", l: "22%", s: 1.2 },
              { t: "68%", l: "78%", s: 0.9 },
              { t: "38%", l: "82%", s: 0.6 },
              { t: "75%", l: "28%", s: 1.4 },
              { t: "25%", l: "60%", s: 0.3 },
            ].map((b, i) => (
              <span key={i} className="absolute h-2 w-2 rounded-full bg-primary/80" style={{ top: b.t, left: b.l, animation: `pulse-dot ${b.s + 1}s ease-in-out ${b.s}s infinite` }} />
            ))}
            {/* bar chart */}
            <div className="absolute bottom-6 left-6 right-6 flex items-end gap-1 h-16 opacity-80">
              {[30, 42, 60, 38, 70, 90, 55, 78, 45, 62, 80, 50, 68, 40].map((h, i) => (
                <span key={i} className="flex-1 rounded-t bg-gradient-to-t from-primary to-amber" style={{ height: `${h}%` }} />
              ))}
            </div>
            <div className="absolute bottom-2 left-6 right-6 flex items-center justify-center gap-2 text-[10px] font-mono uppercase tracking-widest text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-dot" /> Live Network Signal · 1 save in progress
            </div>
          </div>
        </div>
      </section>

      {/* KPI Grid */}
      <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          { icon: Users, label: "Subscribers at risk", v: "2,412", s: "This scoring cycle · avg score 0.29" },
          { icon: DollarSign, label: "Monthly MRC exposed", v: "$1.42M", s: "$17.0M annualised at risk" },
          { icon: ShieldCheck, label: "Projected save rate", v: "31%", s: "with Copilot · 22% baseline today" },
          { icon: TrendingUp, label: "Holdout lift", v: "+8.6 pts", s: "vs randomised holdout control" },
        ].map((k) => (
          <Panel key={k.label} className="relative overflow-hidden">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/8 blur-2xl" />
            <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 text-primary">
                <k.icon className="h-3.5 w-3.5" />
              </span>
              {k.label}
            </div>
            <div className="mt-4 font-serif text-4xl text-foreground">{k.v}</div>
            <div className="mt-1 text-xs text-muted-foreground">{k.s}</div>
          </Panel>
        ))}
      </section>

      {/* Horizons + signals */}
      <section className="mt-6 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <Panel>
          <SectionLabel
            icon={<Activity className="h-3.5 w-3.5" />}
            right={<span>Subscribers at risk by predicted time-to-churn</span>}
          >
            Churn by Horizon
          </SectionLabel>
          <div className="space-y-5">
            {HORIZONS.map((h) => (
              <div key={h.code}>
                <div className="flex items-baseline justify-between text-sm">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center justify-center rounded-md bg-primary/10 text-primary text-[10px] font-mono font-semibold w-8 h-6">
                      {h.code}
                    </span>
                    <span className="font-medium text-foreground">{h.label}</span>
                    <span className="text-xs text-muted-foreground">{h.range}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-serif text-xl text-primary">{h.count}</span>
                    <span className="text-xs text-muted-foreground font-mono">{h.mrc}</span>
                  </div>
                </div>
                <div className="mt-2 h-2 rounded-full bg-muted overflow-hidden">
                  <div className={"h-full rounded-full " + h.tone} style={{ width: `${h.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 pt-4 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground">
            <span>Total flagged this cycle</span>
            <span className="font-mono">2,412 subscribers</span>
          </div>
        </Panel>

        <Panel>
          <SectionLabel icon={<Gauge className="h-3.5 w-3.5" />} right={<span>Global SHAP importance</span>}>
            Model Signal Drivers
          </SectionLabel>
          <div className="space-y-4">
            {SIGNALS.map((s) => (
              <div key={s.name}>
                <div className="flex items-baseline justify-between text-sm">
                  <span className="font-medium">{s.name}</span>
                  <span className="font-mono text-primary text-xs">{s.pct}%</span>
                </div>
                <div className="mt-1.5 h-1.5 rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-primary to-amber" style={{ width: `${s.pct * 3}%`, maxWidth: "100%" }} />
                </div>
                <div className="mt-1 text-[10px] font-mono text-muted-foreground">{s.code}</div>
              </div>
            ))}
          </div>
          <div className="mt-5 pt-4 border-t border-border/60 text-[11px] font-mono text-muted-foreground">
            174 features · 168 in model · XGBoost + SHAP · top 30 explain 85%+
          </div>
        </Panel>
      </section>

      {/* Queue */}
      <section className="mt-6">
        <Panel>
          <SectionLabel icon={<PhoneCall className="h-3.5 w-3.5" />} right={<span>Ranked by churn probability · 14 subscribers</span>}>
            Today's Retention Queue
          </SectionLabel>
          <div className="overflow-x-auto -mx-2">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                  <th className="px-3 py-3 text-left">Subscriber</th>
                  <th className="px-3 py-3 text-left">Churn risk</th>
                  <th className="px-3 py-3 text-left">Top signal</th>
                  <th className="px-3 py-3 text-left">MRC</th>
                  <th className="px-3 py-3 text-left">Recommended NBO</th>
                  <th className="px-3 py-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {QUEUE.map((row) => (
                  <tr key={row.ctn} className="hover:bg-cream/60 transition group">
                    <td className="px-3 py-4">
                      <Link to="/brief" className="block">
                        <div className="font-medium text-foreground group-hover:text-primary transition">{row.name}</div>
                        <div className="text-[11px] font-mono text-muted-foreground">{row.ctn} · {row.prov}</div>
                      </Link>
                    </td>
                    <td className="px-3 py-4">
                      <div className="font-serif text-lg text-primary">{row.score.toFixed(2)}</div>
                      <div className="text-[11px] text-muted-foreground">{row.top}</div>
                    </td>
                    <td className="px-3 py-4">
                      <div className="font-medium text-foreground text-sm">{row.signal}</div>
                      <div className="text-[11px] font-mono text-muted-foreground">{row.horizon}</div>
                    </td>
                    <td className="px-3 py-4 font-mono text-sm">{row.mrc}</td>
                    <td className="px-3 py-4 text-sm">{row.nbo}</td>
                    <td className="px-3 py-4">
                      <Chip tone={row.status === "In Call" ? "danger" : "default"}>{row.status}</Chip>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      </section>
    </AppShell>
  );
}
