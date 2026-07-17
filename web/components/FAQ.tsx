"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Reveal from "./Reveal";

const faqs = [
  {
    q: "Is ExpenseAI free to use?",
    a: "ExpenseAI offers a basic plan for tracking transactions, budgets, and categories. AI insight generation is available on basic, personal, and premium plans, each with a different daily limit for generating new insights.",
  },
  {
    q: "What currencies does ExpenseAI support?",
    a: "You can set your primary currency to USD, INR, EUR, or GBP when you create your account, and every amount across the app is formatted accordingly.",
  },
  {
    q: "How do the AI insights work?",
    a: "Once you have enough transaction history, you can generate a monthly summary or a savings-tips report. Each analysis produces a financial health score and specific recommendations based on your actual spending.",
  },
  {
    q: "Can I export my data?",
    a: "Yes. From the Transactions page you can filter your data by date, category, account, or type, then export exactly what you're viewing as a CSV file.",
  },
  {
    q: "How do budgets work?",
    a: "Create a budget for one or more categories, choose a weekly, monthly, or quarterly period, and ExpenseAI tracks your spending against it automatically, with a progress bar that changes color as you approach the limit.",
  },
  {
    q: "Is my financial data secure?",
    a: "All budgeting, transaction, and insight data sits behind authenticated, protected routes tied to your account.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-(--color-border-main) py-5">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 text-left"
      >
        <span className="font-semibold text-(--color-text-main)">{q}</span>
        <ChevronDown
          size={18}
          className={`shrink-0 text-(--color-text-muted) transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`grid transition-all duration-300 ease-out ${
          open ? "grid-rows-[1fr] mt-3 opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="text-sm leading-relaxed text-(--color-text-muted) pr-8">
            {a}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="py-24 sm:py-32 bg-(--color-bg-muted)">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <Reveal className="text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-(--color-text-main)">
            Frequently asked questions
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-12 rounded-2xl border border-(--color-border-main) bg-(--color-bg-surface) px-6">
          {faqs.map((f) => (
            <FaqItem key={f.q} q={f.q} a={f.a} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
