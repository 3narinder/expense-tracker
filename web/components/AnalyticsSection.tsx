import Reveal from "./Reveal";
import ResponsiveImageFrame from "./ResponsiveImageFrame";

export default function AnalyticsSection() {
  return (
    <section id="analytics" className="relative overflow-hidden py-24 sm:py-32">
      <div aria-hidden className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-(--color-warning)/8 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-(--color-violet)/25 bg-(--color-violet-soft) px-4 py-2 text-xs font-mono font-semibold uppercase tracking-[0.14em] text-(--color-violet)">
            <span className="h-1.5 w-1.5 rounded-full bg-(--color-violet) shadow-[0_0_8px_var(--color-violet)]" />
            Analytics
          </div>
          <h2 className="mt-8 font-display text-3xl font-semibold tracking-tight text-(--color-text-main) sm:text-4xl">
            See your spending, not just your statements
          </h2>
          <p className="mt-4 text-lg leading-8 text-(--color-text-muted)">
            Monthly trend lines and category breakdowns turn a list of transactions into a picture you can act on.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 lg:grid-cols-[1.3fr_0.7fr] lg:items-stretch">
          <Reveal>
            <div className="flex h-full flex-col rounded-2xl border border-(--color-border-main)/70 bg-(--color-bg-surface)/90 p-4 shadow-[0_22px_80px_-40px_rgba(124,108,246,0.3)] backdrop-blur-xl">
              {/*
              <ResponsiveImageFrame
                src="/chart_image.png"
                alt="Spending trends chart"
                aspectClassName="aspect-[1474/770]"
                wrapperClassName="h-full w-full"
                imageClassName="rounded-[1.15rem]"
              />
              */}
              <div className="aspect-[1474/770] h-full w-full rounded-2xl border-2 border-dashed border-(--color-border-muted) bg-(--color-bg-subtle)" />
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="flex h-full flex-col rounded-2xl border border-(--color-border-main)/70 bg-(--color-bg-surface)/90 p-4 shadow-[0_22px_80px_-40px_rgba(124,108,246,0.3)] backdrop-blur-xl">
              {/*
              <ResponsiveImageFrame
                src="/category_image.png"
                alt="Category breakdown"
                aspectClassName="aspect-[696/770]"
                wrapperClassName="h-full w-full"
                imageClassName="rounded-[1.15rem]"
              />
              */}
              <div className="aspect-[696/770] h-full w-full rounded-2xl border-2 border-dashed border-(--color-border-muted) bg-(--color-bg-subtle)" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
