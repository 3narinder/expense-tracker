import { Star } from "lucide-react";
import Reveal from "./Reveal";

const testimonials = [
  {
    quote:
      "The budget bars changing color before I overspend has probably saved me more than any app I've paid for.",
    name: "Priya S.",
    role: "Freelance designer",
  },
  {
    quote:
      "I finally stopped guessing where my paycheck went. The monthly AI summary reads like a friend explaining my own bank statement.",
    name: "Marcus T.",
    role: "Software engineer",
  },
  {
    quote:
      "Exporting to CSV at tax time saved me an entire evening of copy-pasting from my bank's website.",
    name: "Elena R.",
    role: "Small business owner",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 sm:py-32 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-(--color-gold)/5 rounded-full blur-3xl" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-(--color-text-main)">
            What people are saying
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08}>
              <div className="h-full rounded-2xl border border-(--color-border-main) bg-(--color-bg-surface) p-6 hover:shadow-xl hover:shadow-(--color-gold)/10 hover:-translate-y-1 transition-all duration-500 group">
                <div className="flex gap-0.5 text-(--color-gold)">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} size={14} fill="currentColor" strokeWidth={0} className="group-hover:scale-110 transition-transform" />
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-(--color-text-main)">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-5 flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-(--color-primary-soft) text-sm font-bold text-(--color-primary) group-hover:bg-(--color-primary) group-hover:text-(--color-primary-foreground) transition-colors">
                    {t.name[0]}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-(--color-text-main)">
                      {t.name}
                    </p>
                    <p className="text-xs text-(--color-text-muted)">{t.role}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
