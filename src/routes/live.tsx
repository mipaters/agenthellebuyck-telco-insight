import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Panel, SectionLabel, Chip } from "@/components/ui/panel";
import { ArrowLeft, Wallet, Calendar, Smartphone, Wifi, Sparkles, Radio, Play, Pause, RotateCcw, AlertTriangle, Gift } from "lucide-react";

export const Route = createFileRoute("/live")({
  head: () => ({
    meta: [
      { title: "Live Call · Agent Assist · Churn Reduction Agent Assist" },
      { name: "description", content: "Real-time agent assist on the Churn Reduction Agent Assist call — live transcription, sentiment, and adaptive next-best offers." },
      { property: "og:title", content: "Live Call · Agent Assist" },
      { property: "og:description", content: "The copilot listens, hints, and adapts the offer in real time." },
    ],
  }),
  component: LiveCall,
});

type Line = { who: "AGENT" | "CUSTOMER" | "COPILOT"; text: string; t: number };

const SCRIPT: Line[] = [
  { who: "AGENT", text: "Hi Marcus, thanks for calling us. I can see you're on the Infinite 85 plan — how can I help today?", t: 3 },
  { who: "CUSTOMER", text: "Honestly I'm thinking of cancelling. My contract's almost up and Bell offered me a better deal.", t: 7 },
  { who: "COPILOT", text: "Cancel-intent detected · switch to retention track. Verify offer match before quoting.", t: 8 },
  { who: "AGENT", text: "I hear you — let me pull up what we can do to keep you with us.", t: 12 },
  { who: "CUSTOMER", text: "My phone is also acting up, three years old now. I'd want a new one but not at full price.", t: 17 },
  { who: "COPILOT", text: "Device overdue (847d). Loyalty Upgrade Bundle raises accept 46% · saves $2,040 MRC.", t: 18 },
  { who: "AGENT", text: "What if I renewed your term, upgraded you to the new flagship at $0 down, and added Home Internet with a loyalty credit?", t: 24 },
  { who: "CUSTOMER", text: "Hm. What would that run me a month?", t: 28 },
  { who: "COPILOT", text: "Quote $110/mo (+$25 uplift). Apply $15/mo credit x 12 to hold under Bell's offer.", t: 29 },
  { who: "AGENT", text: "$110 a month, and I'll add a $15 loyalty credit for the first year to keep you well under what Bell quoted.", t: 34 },
  { who: "CUSTOMER", text: "Okay, that actually works. Let's do it.", t: 38 },
  { who: "COPILOT", text: "Save confirmed · logging outcome to closed-loop measurement.", t: 39 },
];

function LiveCall() {
  const [playing, setPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const start = useRef<number | null>(null);

  useEffect(() => {
    if (!playing) return;
    const tick = () => {
      if (start.current == null) start.current = performance.now() - elapsed * 1000;
      setElapsed((performance.now() - start.current) / 1000);
      raf.current = requestAnimationFrame(tick);
    };
    const raf = { current: 0 as number };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing]);

  const reset = () => { setPlaying(false); setElapsed(0); start.current = null; };
  const shown = SCRIPT.filter((l) => l.t <= elapsed);
  const sentiment = elapsed < 8 ? -0.4 : elapsed < 20 ? -0.2 : elapsed < 30 ? 0.1 : 0.6;
  const done = elapsed > 40;
  const mmss = `${String(Math.floor(elapsed / 60)).padStart(2, "0")}:${String(Math.floor(elapsed % 60)).padStart(2, "0")}`;

  return (
    <AppShell>
      <Link to="/brief" className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-primary transition">
        <ArrowLeft className="h-3.5 w-3.5" /> Back to Subscriber 360
      </Link>
      <div className="mt-3">
        <Chip tone="warn">In-Call · Real-time on Azure Container Apps</Chip>
      </div>
      <h1 className="mt-3 font-serif text-5xl md:text-6xl leading-[1.02]">Live Call · Agent Assist</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Marcus Bélanger · <span className="font-mono text-xs">CTN-8A3F</span> · churn <span className="text-primary font-medium">0.38</span> · contract ends in <span className="text-primary font-medium">12 days</span>. The copilot listens, hints, and adapts the offer in real time.
      </p>

      <div className="mt-8 grid gap-4 lg:grid-cols-[300px_1fr_320px]">
        {/* Left column: subscriber summary + sentiment */}
        <div id="tour-assist" className="space-y-4">
          <Panel tint>
            <div className="flex items-center justify-between">
              <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">On the line</div>
              <Chip tone="danger">Churn 0.38 · top 3%</Chip>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <div className="h-11 w-11 rounded-full bg-primary text-primary-foreground grid place-items-center font-semibold">MB</div>
              <div>
                <div className="font-semibold">Marcus Bélanger</div>
                <div className="text-[11px] font-mono text-muted-foreground">CTN-8A3F · BAN 4471 · ON</div>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              {[
                { icon: Wallet, k: "Monthly charge", v: "$85 → $110" },
                { icon: Calendar, k: "End of contract", v: "12 days", em: true },
                { icon: Smartphone, k: "Device age", v: "847 days", em: true },
                { icon: Wifi, k: "Convergence", v: "Wireless only" },
              ].map((r) => (
                <div key={r.k} className="rounded-xl bg-background border border-border/60 p-3">
                  <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                    <r.icon className="h-3.5 w-3.5 text-primary" /> {r.k}
                  </div>
                  <div className={"mt-1 text-sm font-semibold " + (r.em ? "text-primary" : "text-foreground")}>{r.v}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Chip>Contract Expiry</Chip>
              <Chip>Device Overdue</Chip>
              <Chip>Cancel Intent</Chip>
            </div>
          </Panel>

          <Panel>
            <SectionLabel right={<span className={sentiment > 0.3 ? "text-emerald-600" : sentiment < -0.2 ? "text-primary" : "text-muted-foreground"}>{sentiment > 0.3 ? "Positive" : sentiment < -0.2 ? "Negative" : "Neutral"}</span>}>
              Customer Sentiment
            </SectionLabel>
            <div className="relative h-2 rounded-full bg-gradient-to-r from-primary via-amber to-emerald-500">
              <div
                className="absolute -top-1 h-4 w-4 rounded-full border-4 border-background bg-foreground transition-all"
                style={{ left: `calc(${((sentiment + 1) / 2) * 100}% - 8px)` }}
              />
            </div>
            <div className="mt-2 flex justify-between text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
              <span>Negative</span><span>Neutral</span><span>Positive</span>
            </div>
            <div className="mt-3 text-xs text-muted-foreground">
              {done ? "Positive close · save confirmed" : shown.length ? "Listening to conversation…" : "Waiting for call to start…"}
            </div>
          </Panel>
        </div>

        {/* Center: transcript */}
        <Panel id="tour-transcript" className="min-h-[560px] flex flex-col">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-border/60">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-mono uppercase tracking-widest text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-dot" />
                {playing ? "Live" : done ? "Wrap-up" : "Ready"}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-[11px] font-mono">
                <Radio className="h-3 w-3 text-primary" /> {mmss}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPlaying((p) => !p)}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground hover:brightness-110"
              >
                {playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                {playing ? "Pause" : elapsed > 0 ? "Resume" : "Start call"}
              </button>
              <button
                onClick={reset}
                className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-sm hover:bg-accent"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Restart
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto py-6 space-y-4">
            {shown.length === 0 && (
              <div className="h-full grid place-items-center text-center py-12">
                <div>
                  <div className="mx-auto h-14 w-14 rounded-full bg-primary/10 grid place-items-center">
                    <Radio className="h-6 w-6 text-primary" />
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">Press <span className="font-medium text-foreground">Start call</span> to watch a simulated retention save unfold with live copilot hints.</p>
                </div>
              </div>
            )}
            {shown.map((l, i) => <TranscriptLine key={i} line={l} />)}
            {playing && !done && (
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono pl-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-dot" />
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-dot" style={{ animationDelay: "0.2s" }} />
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-dot" style={{ animationDelay: "0.4s" }} />
                streaming STT…
              </div>
            )}
          </div>
        </Panel>

        {/* Right: AI Assist + NBO */}
        <div className="space-y-4">
          <Panel tint>
            <SectionLabel icon={<Sparkles className="h-3.5 w-3.5" />} right={<span>Azure AI Foundry · RAG</span>}>
              AI Assist
            </SectionLabel>
            <div className="space-y-3">
              {shown.filter((l) => l.who === "COPILOT").slice(-3).reverse().map((l, i) => (
                <div key={i} className="rounded-xl border border-primary/25 bg-background p-3 text-sm">
                  <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-primary">
                    <Sparkles className="h-3 w-3" /> Hint
                  </div>
                  <p className="mt-1.5 text-foreground">{l.text}</p>
                </div>
              ))}
              {shown.filter((l) => l.who === "COPILOT").length === 0 && (
                <p className="text-xs text-muted-foreground text-center py-4">
                  AI assist surfaces hints, compliance cues and the next-best offer as the conversation unfolds.
                </p>
              )}
            </div>
          </Panel>

          <Panel>
            <SectionLabel icon={<Gift className="h-3.5 w-3.5" />} right={<span className="text-primary">46% accept</span>}>
              Recommended Next Best Offer
            </SectionLabel>
            <div className="font-serif text-2xl text-primary leading-tight">Loyalty Upgrade Bundle</div>
            <p className="mt-2 text-sm text-muted-foreground">
              New flagship device at $0 down, a 24-month plan renewal, and Home Internet added to converge the account.
            </p>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {[
                { k: "MRC retained", v: "$85" },
                { k: "Lifts to", v: "$110" },
                { k: "Save value", v: "$2,040" },
              ].map((c) => (
                <div key={c.k} className="rounded-lg bg-cream border border-border/60 p-2.5 text-center">
                  <div className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground">{c.k}</div>
                  <div className="font-mono text-sm text-primary">{c.v}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-xl border border-amber/40 bg-amber/10 p-3">
              <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-primary">
                <AlertTriangle className="h-3.5 w-3.5" /> Adaptive escalation armed
              </div>
              <p className="mt-1.5 text-xs text-foreground">Add a one-time $15/mo loyalty credit for 12 months.</p>
              <p className="mt-1 text-[11px] text-muted-foreground">Added retention cost $180 · triggered by cancel-intent</p>
            </div>
          </Panel>
        </div>
      </div>
    </AppShell>
  );
}

function TranscriptLine({ line }: { line: Line }) {
  if (line.who === "COPILOT") {
    return (
      <div className="ml-8 rounded-xl border border-primary/30 bg-primary/5 px-4 py-2.5">
        <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-primary">
          <Sparkles className="h-3 w-3" /> Copilot
        </div>
        <p className="mt-1 text-sm text-foreground">{line.text}</p>
      </div>
    );
  }
  const isAgent = line.who === "AGENT";
  return (
    <div className={"flex gap-3 " + (isAgent ? "" : "flex-row-reverse")}>
      <div className={"h-8 w-8 shrink-0 rounded-full grid place-items-center text-xs font-semibold " + (isAgent ? "bg-muted text-muted-foreground" : "bg-primary text-primary-foreground")}>
        {isAgent ? "AG" : "MB"}
      </div>
      <div className={"max-w-[75%] rounded-2xl px-4 py-2.5 " + (isAgent ? "bg-muted text-foreground rounded-tl-sm" : "bg-primary/10 text-foreground rounded-tr-sm")}>
        <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-0.5">{line.who}</div>
        <p className="text-sm leading-relaxed">{line.text}</p>
      </div>
    </div>
  );
}
