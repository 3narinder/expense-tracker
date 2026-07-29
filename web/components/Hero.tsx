import {
  ArrowLeftRight,
  ArrowUpRight,
  Sparkles,
  ShieldCheck,
  Target,
  Wallet,
} from "lucide-react";
import { GITHUB_URL } from "@/lib/config";
import Reveal from "./Reveal";
import GithubIcon from "./GithubIcon";
import AnimatedNumber from "./AnimatedNumber";
import LaunchAppLink from "./LaunchAppLink";
import ResponsiveImageFrame from "./ResponsiveImageFrame";

const quickPoints = [
  { icon: ArrowLeftRight, title: "Transaction tracking" },
  { icon: Target, title: "Budgets that watch themselves" },
  { icon: Wallet, title: "Multi-account view" },
];

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pb-24 pt-16 sm:pb-32 sm:pt-24">
      <div aria-hidden className="absolute inset-x-0 top-0 h-[38rem] bg-linear-to-b from-(--color-primary)/10 via-transparent to-transparent" />
      <div aria-hidden className="animate-float absolute -top-24 right-0 h-96 w-96 rounded-full bg-(--color-primary)/10 blur-3xl" />
      <div aria-hidden className="animate-float absolute bottom-0 left-0 h-80 w-80 rounded-full bg-(--color-gold)/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-[1.02fr_0.98fr] lg:gap-10">
          <Reveal>
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-(--color-border-main)/70 bg-(--color-bg-surface)/90 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-(--color-text-muted) shadow-sm">
                <Sparkles size={13} className="text-(--color-gold)" />
                AI-powered expense tracking
              </div>

              <h1 className="mt-6 font-display text-4xl font-semibold leading-[0.98] tracking-tight text-(--color-text-main) sm:text-5xl lg:text-[3.5rem]">
                Know exactly where
                <br />
                <span className="bg-linear-to-r from-(--color-primary) via-(--color-info) to-(--color-gold) bg-clip-text text-transparent">
                  your money goes.
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-(--color-text-muted)">
                ExpenseAI turns raw transactions into a clear picture of your finances — budgets that track themselves, categories you control, and AI summaries that tell you what actually matters each month.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <LaunchAppLink className="inline-flex items-center gap-2 rounded-full bg-(--color-primary) px-6 py-3.5 text-sm font-semibold text-(--color-primary-foreground) shadow-[0_18px_45px_-22px_var(--color-primary)] transition-all hover:-translate-y-0.5 hover:bg-(--color-primary-hover)">
                  Launch the app
                  <ArrowUpRight size={16} />
                </LaunchAppLink>
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-(--color-border-main)/70 bg-(--color-bg-surface)/90 px-6 py-3.5 text-sm font-semibold text-(--color-text-main) transition-all hover:-translate-y-0.5 hover:bg-(--color-bg-hover)"
                >
                  <GithubIcon size={16} />
                  View on GitHub
                </a>
              </div>

              <div className="mt-5 flex items-center gap-2 text-sm font-medium text-(--color-text-muted)">
                <ShieldCheck size={15} className="text-(--color-gold)" />
                Open-source · Authenticated, protected data · Multi-currency
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {quickPoints.map((point) => {
                  const Icon = point.icon;
                  return (
                    <div key={point.title} className="inline-flex items-center gap-2 rounded-full border border-(--color-border-main)/70 bg-(--color-bg-surface)/80 px-3 py-2 text-sm font-medium text-(--color-text-main)">
                      <Icon size={16} className="text-(--color-primary)" />
                      {point.title}
                    </div>
                  );
                })}
              </div>

              <div className="mt-10 rounded-[1.75rem] border border-(--color-border-main)/70 bg-(--color-bg-surface)/90 p-6 shadow-[0_25px_90px_-45px_rgba(15,23,42,0.35)]">
                <div className="mb-5 flex items-center gap-3">
                  <span className="h-px flex-1 bg-linear-to-r from-(--color-primary)/50 to-transparent" />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-(--color-text-muted)">
                    Tracked by our members
                  </span>
                </div>
                <dl className="grid gap-6 sm:grid-cols-3">
                  <div>
                    <dt className="text-xs font-medium uppercase tracking-[0.2em] text-(--color-text-muted)">Spend tracked</dt>
                    <dd className="mt-2 font-display text-2xl font-semibold text-(--color-text-main) sm:text-3xl">
                      <AnimatedNumber end={284900} prefix="$" />
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium uppercase tracking-[0.2em] text-(--color-text-muted)">Saved automatically</dt>
                    <dd className="mt-2 font-display text-2xl font-semibold text-(--color-text-main) sm:text-3xl">
                      <AnimatedNumber end={18240} prefix="$" />
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium uppercase tracking-[0.2em] text-(--color-text-muted)">Avg. monthly growth</dt>
                    <dd className="mt-2 font-display text-2xl font-semibold text-(--color-text-main) sm:text-3xl">
                      <AnimatedNumber end={12.4} decimals={1} suffix="%" />
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="relative">
              <div aria-hidden className="absolute inset-x-8 top-0 h-20 rounded-full bg-(--color-primary)/15 blur-3xl" />
              <ResponsiveImageFrame
                src="/hero_img.png"
                alt="ExpenseAI dashboard preview"
                aspectClassName="aspect-[1553/1097]"
                wrapperClassName="w-full"
                imageClassName="rounded-[1.15rem]"
                priority
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
