"use client";

import { useEffect, useState, useRef } from "react";

interface AnimatedNumberProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  /** Number of decimal places to render, e.g. 1 for "12.4%" */
  decimals?: number;
  /**
   * Visual treatment for the number:
   * - "gold": animated gradient shimmer — reserve this for a single
   *   showcase stat so it keeps its impact instead of feeling repetitive
   *   when every number does it.
   * - "violet": solid brand color, no shimmer — neutral/informational stats.
   * - "success": solid success-green, no shimmer — positive/growth stats.
   */
  tone?: "gold" | "violet" | "success";
}

const TONE_CLASSES: Record<NonNullable<AnimatedNumberProps["tone"]>, string> = {
  gold: "bg-linear-to-br from-(--color-gold) via-[#f4d999] to-(--color-gold) bg-clip-text text-transparent drop-shadow-[0_0_16px_rgba(212,175,90,0.35)]",
  violet: "text-(--color-violet-bright)",
  success: "text-(--color-success)",
};

export default function AnimatedNumber({
  end,
  duration = 2000,
  prefix = "",
  suffix = "",
  decimals = 0,
  tone = "gold",
}: AnimatedNumberProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let frame: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(easeOutQuart * end);
      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [isVisible, end, duration]);

  const formatted = count.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  const isGold = tone === "gold";

  return (
    <span
      ref={ref}
      className={`relative inline-flex items-baseline tabular-nums font-display ${TONE_CLASSES[tone]}`}
      style={
        isGold
          ? {
              backgroundSize: "200% auto",
              animation: "expenseai-gold-shimmer 3.5s ease-in-out infinite",
            }
          : undefined
      }
    >
      {prefix}
      {formatted}
      {suffix}
      {isGold && (
        <style jsx>{`
          @keyframes expenseai-gold-shimmer {
            0% {
              background-position: 0% center;
            }
            50% {
              background-position: 100% center;
            }
            100% {
              background-position: 0% center;
            }
          }
        `}</style>
      )}
    </span>
  );
}
