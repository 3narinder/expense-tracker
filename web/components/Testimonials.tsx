import { Star } from "lucide-react";
import Reveal from "./Reveal";

const testimonials = [
  {
    quote:
      "The budget bars changing color before I overspend has probably saved me more than any app I’ve paid for.",
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
      "Exporting to CSV at tax time saved me an entire evening of copy-pasting from my bank’s website.",
    name: "Elena R.",
    role: "Small business owner",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-(--color-text-main) sm:text-4xl">
            What people are saying
          </h2>
          <p className="mt-4 text-lg leading-8 text-(--color-text-muted)">
            A calm, dependable layer over the everyday work of managing money.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Reveal key={testimonial.name} delay={index * 0.08}>
              <div className="h-full rounded-[1.6rem] border border-(--color-border-main)/70 bg-(--color-bg-surface)/90 p-6 shadow-[0_20px_70px_-40px_rgba(15,23,42,0.22)]">
                <div className="flex gap-0.5 text-(--color-gold)">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star key={starIndex} size={14} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <p className="mt-4 text-sm leading-8 text-(--color-text-main)">&ldquo;{testimonial.quote}&rdquo;</p>
                <div className="mt-6 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-(--color-primary-soft) text-sm font-semibold text-(--color-primary)">{testimonial.name[0]}</span>
                  <div>
                    <p className="text-sm font-semibold text-(--color-text-main)">{testimonial.name}</p>
                    <p className="text-xs text-(--color-text-muted)">{testimonial.role}</p>
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
