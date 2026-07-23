import { ArrowUpRight, Sparkles } from "lucide-react";
import { APP_URL, GITHUB_URL } from "@/lib/config";
import Reveal from "./Reveal";
import GithubIcon from "./GithubIcon";
import { useEffect, useState, useRef } from "react";

// Animated number component
function AnimatedNumber({ end, duration = 2000 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return <span ref={ref}>{count}</span>;
}

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
              your money goes.
            </h1>

            <p className="mt-6 max-w-lg text-lg text-(--color-text-muted) leading-relaxed">
              ExpenseAI turns raw transactions into a clear picture of your
              finances — budgets that track themselves, categories you control,
              and AI summaries that tell you what actually matters each month.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={APP_URL}
                className="inline-flex items-center gap-2 rounded-lg bg-(--color-primary) px-6 py-3.5 text-sm font-semibold text-(--color-primary-foreground) shadow-lg shadow-(--color-primary)/25 hover:bg-(--color-primary-hover) transition-all hover:scale-105"
              >
                Launch the app
                <ArrowUpRight size={16} />
              </a>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-(--color-border-main) bg-(--color-bg-surface) px-6 py-3.5 text-sm font-semibold text-(--color-text-main) hover:bg-(--color-bg-hover) transition-all hover:scale-105"
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
                  <AnimatedNumber end={4} />
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-(--color-text-muted)">
                  AI insight types
                </dt>
                <dd className="mt-1 font-display text-2xl font-semibold text-(--color-text-main)">
                  <AnimatedNumber end={2} />
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-(--color-text-muted)">
                  Budget periods
                </dt>
                <dd className="mt-1 font-display text-2xl font-semibold text-(--color-text-main)">
                  <AnimatedNumber end={3} />
                </dd>
              </div>
            </dl>
          </Reveal>

          <Reveal delay={0.1} className="relative">
            <div className="animate-float absolute -top-16 -right-16 h-96 w-96 rounded-full bg-color-primary/10 blur-3xl" />
            
            {/* SKELETON PLACEHOLDER: Hero Dashboard Image */}
            <div className="relative rounded-2xl border border-(--color-border-main) bg-(--color-bg-surface) p-6 shadow-2xl">
              <div className="absolute inset-0 flex items-center justify-center bg-(--color-bg-muted)/50 rounded-2xl">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-(--color-primary-soft) flex items-center justify-center">
                    <svg className="w-8 h-8 text-(--color-primary)" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-(--color-text-muted)">Hero Dashboard Image</p>
                  <p className="text-xs text-(--color-text-ghost) mt-1">Recommended: 500x500px</p>
                </div>
              </div>
              
              {/* Uncomment to use actual image */}
              {/* 
              <Image
                src="/hero_img.png"
                alt="ExpenseAI Dashboard"
                width={500}
                height={500}
                className="rounded-2xl"
              />
              */}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
