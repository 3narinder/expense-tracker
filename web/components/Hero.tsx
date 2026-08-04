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
        <div className="grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
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
                      Spend
                    </dt>
                    <dd className="mt-2 font-display text-2xl font-semibold text-(--color-text-main) sm:text-3xl">
                      <AnimatedNumber end={284900} prefix="$" />
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-mono font-medium uppercase tracking-[0.2em] text-(--color-text-muted)">
                      Saved
                    </dt>
                    <dd className="mt-2 font-display text-2xl font-semibold text-(--color-text-main) sm:text-3xl">
                      <AnimatedNumber end={18240} prefix="$" />
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-mono font-medium uppercase tracking-[0.2em] text-(--color-text-muted)">
                      Avg.growth
                    </dt>
                    <dd className="mt-2 font-display text-2xl font-semibold text-(--color-text-main) sm:text-3xl">
                      <AnimatedNumber end={12.4} decimals={1} suffix="%" />
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </Reveal>

          {/* Dashboard placeholder — fills its full grid column so it actually
              reads as the dominant visual element, matching the real hero
              image's landscape ratio (1553x1097, see layout.tsx OpenGraph
              metadata) instead of the old mismatched portrait ratio. */}
          <Reveal delay={0.08}>
            <div className="relative flex justify-center items-center">
              {/*
              <ResponsiveImageFrame
                src="/Dashboard_Hero.png"
                alt="ExpenseAI dashboard preview"
                aspectClassName="aspect-[16/10]"
                wrapperClassName="w-full rounded-2xl"
                priority
              />
              */}
              <div className="aspect-[16/10] w-full rounded-2xl border-2 border-dashed border-(--color-border-muted) bg-(--color-bg-subtle)" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
