import {
  ArrowLeftRight,
  ArrowUpRight,
  Sparkles,
  ShieldCheck,
  Target,
  Wallet,
  TrendingUp,
  Star,
} from "lucide-react";
import { GITHUB_URL } from "@/lib/config";
import Reveal from "./Reveal";
import GithubIcon from "./GithubIcon";
import AnimatedNumber from "./AnimatedNumber";
import LaunchAppLink from "./LaunchAppLink";

const quickPoints = [
  { icon: ArrowLeftRight, title: "Transaction tracking" },
  { icon: Target, title: "Budgets that watch themselves" },
  { icon: Wallet, title: "Multi-account view" },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden min-h-screen py-24 sm:py-32"
    >
      {/* Ambient background gradients */}
      <div
        aria-hidden
        className="fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 82% 12%, rgba(124,108,246,0.20), transparent 60%), radial-gradient(45% 40% at 12% 85%, rgba(240,182,77,0.10), transparent 60%), radial-gradient(80% 60% at 50% 100%, rgba(124,108,246,0.08), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12">
          <Reveal>
            <div className="max-w-2xl">
              {/* Eyebrow badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-(--color-gold)/25 bg-(--color-gold-soft) px-4 py-2 text-xs font-mono font-semibold uppercase tracking-[0.14em] text-(--color-gold)">
                <span className="h-1.5 w-1.5 rounded-full bg-(--color-gold) shadow-[0_0_8px_var(--color-gold)]" />
                AI-powered expense tracking
              </div>

              {/* Headline */}
              <h1 className="mt-8 font-display text-4xl font-semibold leading-[1.03] tracking-tight text-(--color-text-main) sm:text-5xl lg:text-[4rem]">
                Know exactly where
                <br />
                <span className="bg-linear-to-r from-(--color-violet-bright) via-(--color-violet) to-(--color-gold) bg-clip-text text-transparent">
                  your money goes.
                </span>
              </h1>

              {/* Subheadline */}
              <p className="mt-6 max-w-xl text-lg leading-8 text-(--color-text-muted)">
                ExpenseAI turns raw transactions into a clear picture of your
                finances — budgets that track themselves, categories you
                control, and AI summaries that tell you what actually matters
                each month.
              </p>

              {/* CTAs */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <LaunchAppLink className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-(--color-violet-bright) to-(--color-violet) px-6 py-3.5 text-sm font-semibold text-(--color-primary-foreground) shadow-[0_10px_30px_-8px_rgba(124,108,246,0.55)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_34px_-8px_rgba(124,108,246,0.7)]">
                  Launch the app
                  <ArrowUpRight size={16} />
                </LaunchAppLink>
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-(--color-border-main) bg-(--color-bg-surface)/90 px-6 py-3.5 text-sm font-semibold text-(--color-text-main) transition-all hover:-translate-y-0.5 hover:border-(--color-border-focus) hover:bg-(--color-bg-hover)"
                >
                  <GithubIcon size={16} />
                  View on GitHub
                </a>
              </div>

              {/* Trust indicators */}
              <div className="mt-6 flex items-center gap-3 text-sm font-medium text-(--color-text-muted)">
                <ShieldCheck size={15} className="text-(--color-gold)" />
                Open-source · Authenticated, protected data · Multi-currency
              </div>

              {/* Quick points */}
              <div className="mt-8 flex flex-wrap gap-3">
                {quickPoints.map((point) => {
                  const Icon = point.icon;
                  return (
                    <div
                      key={point.title}
                      className="inline-flex items-center gap-2 rounded-full border border-(--color-border-main)/70 bg-(--color-bg-surface)/80 px-4 py-2 text-sm font-medium text-(--color-text-main)"
                    >
                      <Icon size={16} className="text-(--color-violet)" />
                      {point.title}
                    </div>
                  );
                })}
              </div>

              {/* Stats card */}
              <div className="mt-10 rounded-2xl border border-(--color-border-main)/70 bg-(--color-bg-surface)/90 p-6 shadow-[0_25px_90px_-45px_rgba(15,23,42,0.35)] backdrop-blur-xl">
                <div className="mb-5 flex items-center gap-3">
                  <span className="h-px flex-1 bg-linear-to-r from-(--color-violet)/50 to-transparent" />
                  <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.2em] text-(--color-text-muted)">
                    Tracked by our members
                  </span>
                </div>
                <dl className="grid gap-6 sm:grid-cols-3">
                  <div>
                    <dt className="text-xs font-mono font-medium uppercase tracking-[0.2em] text-(--color-text-muted)">
                      Spend tracked
                    </dt>
                    <dd className="mt-2 font-display text-2xl font-semibold text-(--color-text-main) sm:text-3xl">
                      <AnimatedNumber end={284900} prefix="$" />
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-mono font-medium uppercase tracking-[0.2em] text-(--color-text-muted)">
                      Saved automatically
                    </dt>
                    <dd className="mt-2 font-display text-2xl font-semibold text-(--color-text-main) sm:text-3xl">
                      <AnimatedNumber end={18240} prefix="$" />
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-mono font-medium uppercase tracking-[0.2em] text-(--color-text-muted)">
                      Avg. monthly growth
                    </dt>
                    <dd className="mt-2 font-display text-2xl font-semibold text-(--color-text-main) sm:text-3xl">
                      <AnimatedNumber end={12.4} decimals={1} suffix="%" />
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </Reveal>

          {/* Dashboard mock - glass panel with floating chips */}
          <Reveal delay={0.08}>
            <div className="relative flex justify-center items-center perspective-1600">
              {/* Floating chip - savings */}
              <div className="absolute -top-4 -left-4 hidden lg:flex animate-float items-center gap-3 rounded-xl border border-(--color-border-main) bg-(--color-bg-surface)/90 p-3 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.6)] backdrop-blur-xl" style={{ animationDelay: "-1.5s" }}>
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-(--color-emerald-soft) text-(--color-emerald)">
                  <TrendingUp size={16} />
                </div>
                <div>
                  <div className="text-sm font-semibold text-(--color-text-main)">Savings rate 30.8%</div>
                  <div className="text-xs text-(--color-text-ghost)">Trending up this month</div>
                </div>
              </div>

              {/* Floating chip - AI insight */}
              <div className="absolute -bottom-4 -right-4 hidden lg:flex animate-float items-center gap-3 rounded-xl border border-(--color-border-main) bg-(--color-bg-surface)/90 p-3 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.6)] backdrop-blur-xl" style={{ animationDelay: "-3s" }}>
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-(--color-gold-soft) text-(--color-gold)">
                  <Star size={14} fill="currentColor" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-(--color-text-main)">Insight refreshed</div>
                  <div className="text-xs text-(--color-text-ghost)">AI analysis complete</div>
                </div>
              </div>

              {/* Main dashboard panel */}
              <div className="relative w-full max-w-[560px] rounded-2xl border border-(--color-border-main) bg-(--color-bg-surface)/90 p-6 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] backdrop-blur-2xl animate-float">
                {/* Panel header */}
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <div className="font-display text-xl font-semibold text-(--color-text-main)">Dashboard</div>
                    <div className="text-xs text-(--color-text-ghost)">Overview · This month</div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-(--color-text-ghost)">Total balance</div>
                    <div className="font-mono text-lg font-medium text-(--color-text-main) mt-1">₹1,05,749.79</div>
                  </div>
                </div>

                {/* Premium badge with shimmer */}
                <div className="mb-4 inline-flex items-center gap-2 rounded-lg border border-(--color-gold)/30 bg-linear-to-r from-(--color-gold-soft) to-transparent px-3 py-2 relative overflow-hidden">
                  <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent animate-gold-shimmer" />
                  <Sparkles size={14} className="text-(--color-gold)" />
                  <span className="text-xs font-semibold text-[#f5d9a8]">Premium</span>
                  <span className="h-3 w-px bg-(--color-gold)/30" />
                  <span className="font-mono text-xs text-(--color-text-muted)">AI insights <span className="text-(--color-text-main)">100/100</span></span>
                </div>

                {/* KPI row */}
                <div className="mb-4 grid grid-cols-3 gap-2">
                  <div className="rounded-xl bg-(--color-bg-subtle) border border-(--color-border-muted) p-3">
                    <div className="text-[10.5px] text-(--color-text-ghost)">Income</div>
                    <div className="font-mono text-sm font-medium text-(--color-emerald) mt-1">₹28,000</div>
                  </div>
                  <div className="rounded-xl bg-(--color-bg-subtle) border border-(--color-border-muted) p-3">
                    <div className="text-[10.5px] text-(--color-text-ghost)">Expenses</div>
                    <div className="font-mono text-sm font-medium text-(--color-danger) mt-1">₹19,368</div>
                  </div>
                  <div className="rounded-xl bg-(--color-bg-subtle) border border-(--color-border-muted) p-3">
                    <div className="text-[10.5px] text-(--color-text-ghost)">Net</div>
                    <div className="font-mono text-sm font-medium text-(--color-emerald) mt-1">₹8,631</div>
                  </div>
                </div>

                {/* AI summary card */}
                <div className="mb-4 flex items-center gap-4 rounded-xl bg-(--color-violet-soft) border border-(--color-violet)/22 p-4">
                  <div className="relative h-16 w-16 shrink-0">
                    <svg className="h-full w-full -rotate-90" viewBox="0 0 64 64">
                      <circle cx="32" cy="32" r="28" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6" />
                      <circle cx="32" cy="32" r="28" fill="none" stroke="var(--color-emerald)" strokeWidth="6" strokeLinecap="round" strokeDasharray="175.9" strokeDashoffset="35" className="animate-[draw_1.6s_0.4s_cubic-bezier(.2,.8,.2,1)_forwards]" style={{ filter: "drop-shadow(0 0 6px rgba(52,211,153,0.5))" }} />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center font-mono text-lg font-medium">80</div>
                  </div>
                  <div className="flex-1 min-w-0">
                  <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-(--color-violet-bright)">AI summary · Healthy</div>
                    <div className="text-sm leading-6 text-(--color-text-muted) mt-1">
                      High savings rate, but <span className="text-(--color-text-main) font-medium">Rent</span> is a large share of spend.
                    </div>
                  </div>
                </div>

                {/* Mini chart */}
                <div className="flex items-end gap-1.5 h-14 px-1">
                  <div className="flex-1 rounded-t-sm bg-linear-to-t from-(--color-violet) to-(--color-violet-bright) opacity-85" style={{ height: "70%" }} />
                  <div className="flex-1 rounded-t-sm bg-linear-to-t from-(--color-violet) to-(--color-violet-bright) opacity-85" style={{ height: "68%" }} />
                  <div className="flex-1 rounded-t-sm bg-linear-to-t from-(--color-violet) to-(--color-violet-bright) opacity-85" style={{ height: "48%" }} />
                  <div className="flex-1 rounded-t-sm bg-linear-to-t from-(--color-violet) to-(--color-violet-bright) opacity-85" style={{ height: "66%" }} />
                  <div className="flex-1 rounded-t-sm bg-linear-to-t from-(--color-violet) to-(--color-violet-bright) opacity-85" style={{ height: "64%" }} />
                  <div className="flex-1 rounded-t-sm bg-linear-to-t from-(--color-violet) to-(--color-violet-bright) opacity-85" style={{ height: "38%" }} />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
