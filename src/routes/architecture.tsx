import { createFileRoute } from "@tanstack/react-router";
import { Fragment, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Panel, SectionLabel, Chip } from "@/components/ui/panel";
import { Brain, Zap, RefreshCw, ChevronDown, Sparkles, Radio, Mic, Server, Database, Boxes, ArrowRight, LineChart, Layers } from "lucide-react";

export const Route = createFileRoute("/architecture")({
  head: () => ({
    meta: [
      { title: "Under the Hood · Architecture · Rogers Wireless" },
      { name: "description", content: "Daily churn brain, real-time assist orchestrator on Azure Container Apps, and closed-loop measurement — the Rogers Wireless retention platform." },
      { property: "og:title", content: "Under the Hood · Rogers Wireless" },
      { property: "og:description", content: "Runs on Azure you already own. XGBoost + SHAP · 174 features · Daily batch." },
    ],
  }),
  component: Architecture,
});

const PHASES = [
  {
    n: "01",
    tag: "Pre-Call",
    icon: Brain,
    title: "Pre-call brain · daily batch scoring",
    sub: "Scored overnight, explained with SHAP.",
    body: "Feature build runs nightly across 174 signals (contract, device, sentiment, usage, financial). XGBoost produces per-subscriber churn scores; SHAP attributions are cached to power screen-pops without a runtime model call.",
    services: [
      { name: "Azure Synapse", desc: "Feature engineering & nightly batch." },
      { name: "Azure ML", desc: "XGBoost training, SHAP export." },
      { name: "Cosmos DB", desc: "Score + attribution store (single-digit ms reads)." },
    ],
  },
  {
    n: "02",
    tag: "In-Call",
    hero: true,
    icon: Zap,
    title: "In-call assist · real-time on Azure Container Apps",
    sub: "Real-time hints and offers, live on the call.",
    body: "During the live call, speech is transcribed and an orchestrator streams hints, sentiment and the next-best offer to the agent — all running on Azure Container Apps.",
    services: [
      { name: "Azure Communication Services", desc: "Call rail and media handling." },
      { name: "Azure AI Speech", desc: "Streaming speech-to-text transcription." },
      { name: "Orchestrator API on Container Apps", desc: "FastAPI service coordinating hints, NBO and sentiment." },
      { name: "Azure AI Foundry", desc: "NBO selection, conversation hints and sentiment." },
      { name: "Azure Event Grid", desc: "Fan-out of transcript, hint and outcome events." },
      { name: "Application Insights", desc: "End-to-end latency and quality telemetry." },
    ],
  },
  {
    n: "03",
    tag: "Closed Loop",
    icon: RefreshCw,
    title: "Closed-loop measurement · retrain",
    sub: "Outcomes measured, fed back to retrain.",
    body: "Every save or loss is joined back to the offer, the arm and the holdout. Attribution feeds nightly Synapse jobs that refresh features and retrain the model against a randomised control.",
    services: [
      { name: "Azure Data Lake Storage", desc: "Outcome + holdout log, immutable." },
      { name: "Azure Synapse", desc: "Attribution + retrain pipelines." },
      { name: "Power BI", desc: "Program KPIs, cohort curves, exec review." },
    ],
  },
];

function Architecture() {
  const [openIdx, setOpenIdx] = useState<number | null>(1);

  return (
    <AppShell>
      <Chip tone="warn">Under the Hood · Runs on Azure Container Apps</Chip>
      <div className="mt-3 flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-3xl">
          <h1 className="font-serif text-5xl md:text-6xl leading-[1.02]">Under the Hood</h1>
          <p className="mt-4 text-muted-foreground">
            Everything you just clicked runs on Azure you already own — a daily churn brain, a real-time assist orchestrator on Azure Container Apps, and a measurement loop that retrains the model.
            <span className="block mt-1 text-foreground">No new contact-centre platform, no per-seat tax.</span>
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Chip tone="danger"><Sparkles className="h-3 w-3 mr-1.5 inline" /> XGBoost + SHAP</Chip>
          <Chip><Database className="h-3 w-3 mr-1.5 inline" /> 174 features · Daily batch</Chip>
        </div>
      </div>

      <section className="mt-8">
        <div className="grid gap-4 lg:grid-cols-[1fr_auto_1fr_auto_1fr]">
          {PHASES.map((p, i) => (
            <Fragment key={p.n}>
              <div className={"rounded-2xl border p-5 " + (p.hero ? "border-primary/40 bg-cream" : "border-border bg-cream/60")}>
                <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <p.icon className="h-3.5 w-3.5" />
                  </span>
                  {p.tag}
                </div>
                <div className="mt-3 font-semibold text-foreground">{p.sub}</div>
                <div className="mt-2 text-[11px] font-mono text-muted-foreground">{p.services.length} Azure services</div>
              </div>
              {i < PHASES.length - 1 && (
                <div className="hidden lg:grid place-items-center text-primary"><ArrowRight className="h-6 w-6" /></div>
              )}
            </Fragment>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <RefreshCw className="h-3.5 w-3.5 text-primary" />
          Saved-or-lost outcomes from the closed loop retrain the pre-call brain — the cycle repeats every scoring run.
        </div>
      </section>

      <section className="mt-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[11px] font-mono uppercase tracking-[0.18em] text-foreground font-semibold">The Flow, Layer by Layer</h2>
          <span className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">3 phases · 12 Azure services · tap to expand</span>
        </div>
        <div className="space-y-3">
          {PHASES.map((p, i) => {
            const open = openIdx === i;
            return (
              <div key={p.n} className={"rounded-2xl border transition-all " + (open ? "border-primary/40 bg-cream" : "border-border bg-card")}>
                <button onClick={() => setOpenIdx(open ? null : i)} className="w-full flex items-center gap-4 p-5 text-left">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <p.icon className="h-5 w-5" />
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{p.n}</span>
                      <Chip>{p.tag}</Chip>
                      {p.hero && <Chip tone="danger">The Hero Moment</Chip>}
                    </div>
                    <div className="mt-1 font-semibold text-foreground">{p.title}</div>
                    <div className="text-sm text-muted-foreground">{p.sub}</div>
                  </div>
                  <ChevronDown className={"h-5 w-5 text-muted-foreground transition " + (open ? "rotate-180" : "")} />
                </button>
                {open && (
                  <div className="border-t border-border/60 p-5 md:p-6">
                    <p className="max-w-3xl text-sm text-muted-foreground leading-relaxed">{p.body}</p>
                    <div className="mt-5 grid gap-3 md:grid-cols-2">
                      {p.services.map((s) => (
                        <div key={s.name} className="rounded-xl bg-background border border-border/60 p-4">
                          <div className="flex items-center gap-2 font-medium text-foreground">
                            <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
                              <IconFor name={s.name} />
                            </span>
                            {s.name}
                          </div>
                          <p className="mt-1.5 text-sm text-muted-foreground">{s.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-10">
        <Panel>
          <SectionLabel icon={<Layers className="h-3.5 w-3.5" />}>Why It Ships</SectionLabel>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { k: "Sits on Azure you own", v: "No new contact-centre platform, no per-seat tax. Container Apps scales the orchestrator to call volume." },
              { k: "Explainable by default", v: "SHAP attributions ship with every score — QA, compliance and agents see the why, not just the number." },
              { k: "Measured, not claimed", v: "Randomised holdout runs alongside every offer arm. Lift is causal and reported per cycle." },
            ].map((r) => (
              <div key={r.k} className="rounded-2xl border border-border bg-cream p-5">
                <div className="text-[11px] font-mono uppercase tracking-widest text-primary">{r.k}</div>
                <p className="mt-2 text-sm text-foreground leading-relaxed">{r.v}</p>
              </div>
            ))}
          </div>
        </Panel>
      </section>
    </AppShell>
  );
}

function IconFor({ name }: { name: string }) {
  const n = name.toLowerCase();
  if (n.includes("speech")) return <Mic className="h-4 w-4" />;
  if (n.includes("communication")) return <Radio className="h-4 w-4" />;
  if (n.includes("foundry")) return <Sparkles className="h-4 w-4" />;
  if (n.includes("cosmos") || n.includes("lake") || n.includes("storage")) return <Database className="h-4 w-4" />;
  if (n.includes("synapse")) return <Boxes className="h-4 w-4" />;
  if (n.includes("power bi")) return <LineChart className="h-4 w-4" />;
  return <Server className="h-4 w-4" />;
}
