import { useEffect, useLayoutEffect, useState } from "react";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, CheckCircle2, Compass, PlayCircle, X } from "lucide-react";

type Step = {
  route: string;
  target: string | null;
  chapter: string;
  title: string;
  body: string;
  bullets?: string[];
};

export const WALKTHROUGH_STEPS: Step[] = [
  {
    route: "/",
    target: null,
    chapter: "Welcome",
    title: "Executive walkthrough",
    body:
      "Agent Hellebuyck predicts which subscribers are about to leave, explains why in plain language, and arms the agent with the right offer in the moment. This 9-stop tour follows one subscriber from daily score to measured save.",
    bullets: [
      "Pre-call: score, rank and explain churn risk",
      "In-call: real-time assist and next-best offer",
      "Closed loop: holdout-measured lift feeds retraining",
    ],
  },
  {
    route: "/",
    target: "tour-hero",
    chapter: "Stop 1 · The premise",
    title: "Save every subscriber worth saving",
    body:
      "Every scoring cycle ranks the base by churn probability and expected value, so retention spend goes where it actually changes an outcome — not to subscribers who were never leaving.",
  },
  {
    route: "/",
    target: "tour-kpis",
    chapter: "Stop 2 · Program pulse",
    title: "Executive KPIs at a glance",
    body:
      "Subscribers at risk, monthly recurring charge exposed, projected save rate and holdout-adjusted lift — the four numbers that tell you whether the program is working today.",
  },
  {
    route: "/",
    target: "tour-horizons",
    chapter: "Stop 3 · Risk and drivers",
    title: "Horizons plus model signals",
    body:
      "Risk is split into H0/H1/H2 time-to-churn horizons so outreach is sequenced by urgency, while global SHAP importance shows which of the 174 features are driving the base-level risk.",
  },
  {
    route: "/",
    target: "tour-queue",
    chapter: "Stop 4 · The work queue",
    title: "Today's retention queue",
    body:
      "The ranked call list: each subscriber carries a score, top signal, horizon, MRC at risk and a recommended next-best offer, ready to hand to an agent.",
  },
  {
    route: "/brief",
    target: "tour-shap",
    chapter: "Stop 5 · Subscriber 360",
    title: "Why this subscriber, in plain English",
    body:
      "The pre-call brief turns the model score into per-subscriber SHAP attribution — contract expiry, device age, care history, sentiment — so the agent opens the call already knowing the story.",
  },
  {
    route: "/brief",
    target: "tour-nbo",
    chapter: "Stop 6 · Next-best offer",
    title: "Offers ranked by expected save value",
    body:
      "Each candidate offer carries a predicted accept rate and expected retained value, so the agent leads with the cheapest offer that actually saves the account.",
  },
  {
    route: "/live",
    target: "tour-transcript",
    chapter: "Stop 7 · The live call",
    title: "Real-time assist in the moment",
    body:
      "As the conversation unfolds, the transcript is scored live: sentiment tracks, risk signals surface, and the copilot prompts the agent with hints and compliance cues without slowing the call.",
    bullets: ["Press play to run the simulated interaction"],
  },
  {
    route: "/measurement",
    target: "tour-retention",
    chapter: "Stop 8 · Proof, not vibes",
    title: "Measured against a randomised holdout",
    body:
      "Treatment vs holdout retention curves give causal lift — +8.6 points at T+90, a 31% save rate at $310 per save, and a 6.6× program return attributed by offer arm.",
  },
  {
    route: "/architecture",
    target: "tour-arch",
    chapter: "Wrap-up",
    title: "It runs on infrastructure you already own",
    body:
      "Pre-call, in-call and closed loop map onto standard Azure services — no new platform. Saved-or-lost outcomes flow back to retrain the model on the next scoring run.",
  },
];

export function ExecWalkthrough({ onClose }: { onClose: () => void }) {
  const [i, setI] = useState(0);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const step = WALKTHROUGH_STEPS[i];
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (pathname !== step.route) navigate({ to: step.route });
  }, [i, step.route, pathname, navigate]);

  useLayoutEffect(() => {
    if (!step.target || pathname !== step.route) {
      setRect(null);
      return;
    }
    const measure = () => {
      const el = document.getElementById(step.target as string);
      if (!el) return setRect(null);
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      requestAnimationFrame(() => setRect(el.getBoundingClientRect()));
    };
    measure();
    const t = setTimeout(measure, 400);
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, true);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure, true);
    };
  }, [i, step.target, step.route, pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setI((p) => Math.min(p + 1, WALKTHROUGH_STEPS.length - 1));
      if (e.key === "ArrowLeft") setI((p) => Math.max(p - 1, 0));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const next = () => (i < WALKTHROUGH_STEPS.length - 1 ? setI(i + 1) : onClose());
  const prev = () => i > 0 && setI(i - 1);

  const pad = 12;
  const cardW = 400;
  const tooltipTop = rect
    ? rect.bottom + pad + 280 > window.innerHeight
      ? Math.max(pad, rect.top - 280)
      : rect.bottom + pad
    : 0;
  const tooltipLeft = rect
    ? Math.min(Math.max(pad, rect.left), Math.max(pad, window.innerWidth - cardW - pad))
    : 0;

  return (
    <div className="fixed inset-0 z-[70]" role="dialog" aria-modal="true">
      <svg className="pointer-events-auto absolute inset-0 h-full w-full" onClick={next}>
        <defs>
          <mask id="walkthrough-mask">
            <rect width="100%" height="100%" fill="white" />
            {rect && (
              <rect
                x={Math.max(0, rect.left - 8)}
                y={Math.max(0, rect.top - 8)}
                width={rect.width + 16}
                height={rect.height + 16}
                rx={16}
                fill="black"
              />
            )}
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="rgba(18, 12, 12, 0.72)" mask="url(#walkthrough-mask)" />
        {rect && (
          <rect
            x={Math.max(0, rect.left - 8)}
            y={Math.max(0, rect.top - 8)}
            width={rect.width + 16}
            height={rect.height + 16}
            rx={16}
            fill="none"
            stroke="var(--color-primary)"
            strokeWidth={2}
            className="pointer-events-none"
          />
        )}
      </svg>

      <div
        className="pointer-events-auto absolute w-[400px] max-w-[calc(100vw-24px)] rounded-2xl border border-primary/40 bg-card p-5 shadow-2xl"
        style={
          rect
            ? { top: tooltipTop, left: tooltipLeft }
            : { top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 460 }
        }
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.18em] text-primary">
            <Compass className="h-3.5 w-3.5" /> {step.chapter}
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground" aria-label="Close walkthrough">
            <X className="h-4 w-4" />
          </button>
        </div>
        <h3 className="mt-2 font-serif text-2xl leading-tight text-foreground">{step.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
        {step.bullets && (
          <ul className="mt-3 space-y-1.5">
            {step.bullets.map((b) => (
              <li key={b} className="flex items-start gap-2 text-xs">
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-4 flex items-center justify-center gap-1">
          {WALKTHROUGH_STEPS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              className={
                "h-1.5 rounded-full transition-all " +
                (idx === i ? "w-6 bg-primary" : "w-1.5 bg-muted hover:bg-muted-foreground/40")
              }
              aria-label={`Go to stop ${idx + 1}`}
            />
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <button onClick={onClose} className="text-[11px] text-muted-foreground hover:text-foreground">
            Skip walkthrough
          </button>
          <div className="flex items-center gap-2">
            {i > 0 && (
              <button
                onClick={prev}
                className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-xs font-medium hover:bg-accent"
              >
                <ChevronLeft className="h-3.5 w-3.5" /> Back
              </button>
            )}
            <button
              onClick={next}
              className="inline-flex items-center gap-1 rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground hover:brightness-110"
            >
              {i === 0 ? (
                <>
                  <PlayCircle className="h-3.5 w-3.5" /> Start tour
                </>
              ) : i === WALKTHROUGH_STEPS.length - 1 ? (
                <>
                  Finish <CheckCircle2 className="h-3.5 w-3.5" />
                </>
              ) : (
                <>
                  Next <ChevronRight className="h-3.5 w-3.5" />
                </>
              )}
            </button>
          </div>
        </div>
        <div className="mt-2 text-center text-[10px] font-mono text-muted-foreground">
          Stop {i + 1} of {WALKTHROUGH_STEPS.length} · ← → to navigate
        </div>
      </div>
    </div>
  );
}
