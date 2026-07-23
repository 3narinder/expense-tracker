import { ArrowUpRight, Sparkles } from "lucide-react";
import { APP_URL, GITHUB_URL } from "@/lib/config";
import Reveal from "./Reveal";
import GithubIcon from "./GithubIcon";
import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden pt-16 pb-24 sm:pt-24 sm:pb-32"
    >
      <div
        aria-hidden
        className="absolute -top-32 right-0 h-96 w-96 rounded-full bg-color-primary/10 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute top-40 -left-24 h-72 w-72 rounded-full bg-gold/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-(--color-border-main) bg-(--color-bg-surface) px-3.5 py-1.5 text-xs font-semibold text-(--color-text-muted) shadow-sm">
              <Sparkles size={13} className="text-(--color-primary)" />
              AI-powered expense tracking
            </div>

            <h1 className="mt-6 font-display text-4xl sm:text-5xl lg:text-[3.4rem] font-semibold tracking-tight text-(--color-text-main) leading-[1.08]">
              Know exactly where
              <br />
              <span className="bg-gradient-to-r from-(--color-primary) via-(--color-info) to-(--color-gold) bg-clip-text text-transparent">
                your money goes.
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-lg text-(--color-text-muted) leading-relaxed">
              ExpenseAI turns raw transactions into a clear picture of your
              finances — budgets that track themselves, categories you control,
              and AI summaries that tell you what actually matters each month.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={APP_URL}
                className="inline-flex items-center gap-2 rounded-lg bg-(--color-primary) px-6 py-3.5 text-sm font-semibold text-(--color-primary-foreground) shadow-lg shadow-(--color-primary)/25 hover:bg-(--color-primary-hover) transition-all hover:-translate-y-0.5"
              >
                Launch the app
                <ArrowUpRight size={16} />
              </a>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-(--color-border-main) bg-(--color-bg-surface) px-6 py-3.5 text-sm font-semibold text-(--color-text-main) hover:bg-(--color-bg-hover) transition-all hover:-translate-y-0.5"
              >
                <GithubIcon size={16} />
                View on GitHub
              </a>
            </div>

            <dl className="mt-12 grid grid-cols-3 gap-6 max-w-md">
              <div>
                <dt className="text-xs font-medium text-(--color-text-muted)">
                  Currencies
                </dt>
                <dd className="mt-1 font-display text-2xl font-semibold text-(--color-text-main)">
                  4
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-(--color-text-muted)">
                  AI insight types
                </dt>
                <dd className="mt-1 font-display text-2xl font-semibold text-(--color-text-main)">
                  2
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-(--color-text-muted)">
                  Budget periods
                </dt>
                <dd className="mt-1 font-display text-2xl font-semibold text-(--color-text-main)">
                  3
                </dd>
              </div>
            </dl>
          </Reveal>

          <Reveal delay={0.1} className="relative">
            <div className="animate-float absolute -top-16 -right-16 h-96 w-96 rounded-full bg-color-primary/10 blur-3xl" />
            <div className="relative overflow-hidden rounded-2xl border border-(--color-border-main) bg-(--color-bg-surface) p-3 shadow-2xl shadow-(--color-primary)/10 ring-1 ring-white/60">
              <div className="rounded-xl bg-linear-to-br from-(--color-bg-surface) via-(--color-primary-soft)/35 to-(--color-info-soft)/35 p-3">
                <div className="mb-3 flex items-center justify-between rounded-lg border border-(--color-border-main) bg-white/80 px-3 py-2 backdrop-blur-sm">
                  <span className="text-xs font-semibold text-(--color-text-muted)">
                    Live dashboard preview
                  </span>
                  <span className="rounded-full bg-(--color-success-soft) px-2 py-0.5 text-[10px] font-bold text-(--color-success-foreground)">
                    PRO
                  </span>
                </div>
                <Image
                  src="/hero_img.png"
                  alt="ExpenseAI Dashboard"
                  width={500}
                  height={500}
                  className="rounded-xl"
                  priority
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
