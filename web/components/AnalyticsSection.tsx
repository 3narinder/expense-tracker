import { BarChart3, PieChart } from "lucide-react";
import Reveal from "./Reveal";
import Image from "next/image";

const categoryBreakdown = [
  { name: "Housing", value: 38, color: "var(--color-primary)" },
  { name: "Food", value: 24, color: "var(--color-warning)" },
  { name: "Transport", value: 16, color: "var(--color-info)" },
  { name: "Other", value: 22, color: "var(--color-text-ghost)" },
];

export default function AnalyticsSection() {
  const circumference = 2 * Math.PI * 32;

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

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-2xl border border-border-main bg-bg-surface p-6 hover:shadow-xl hover:shadow-primary/10 transition-all duration-500">
              <Image
                src="/chart_image.png"
                alt="Chart"
                width={400}
                height={300}
              />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="h-full rounded-2xl border border-(--color-border-main) bg-(--color-bg-surface) p-6 hover:shadow-xl hover:shadow-(--color-warning)/10 transition-all duration-500">
              <Image
                src="/category_image.png"
                alt="Category breakdown"
                width={400}
                height={300}
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
