import Reveal from "./Reveal";
import ResponsiveImageFrame from "./ResponsiveImageFrame";

export default function AnalyticsSection() {
  return (
    <section id="analytics" className="py-24 sm:py-32 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-warning/5 rounded-full blur-3xl" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-(--color-text-main)">
            See your spending, not just your statements
          </h2>
          <p className="mt-4 text-lg text-text-muted">
            Monthly trend lines and category breakdowns turn a list of
            transactions into a picture you can act on.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 lg:grid-cols-[1.35fr_0.65fr] lg:items-start">
          <Reveal>
            <div className="h-full rounded-[1.5rem] border border-(--color-border-main)/60 bg-(--color-bg-surface) p-3 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.25)] sm:p-4 lg:p-5">
              <ResponsiveImageFrame
                src="/chart_image.png"
                alt="Spending trends chart"
                aspectClassName="aspect-[2.2/1] sm:aspect-[2.6/1] lg:aspect-[2.9/1]"
                wrapperClassName="w-full border-0 bg-transparent shadow-none"
                imageClassName="rounded-[1.1rem]"
              />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="h-full rounded-[1.5rem] border border-(--color-border-main)/60 bg-(--color-bg-surface) p-3 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.25)] sm:p-4 lg:p-5">
              <ResponsiveImageFrame
                src="/category_image.png"
                alt="Category breakdown"
                aspectClassName="aspect-[3/4] sm:aspect-[4/5] lg:aspect-[4/5]"
                wrapperClassName="mx-auto w-full max-w-[320px] border-0 bg-transparent shadow-none"
                imageClassName="rounded-[1.1rem]"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
