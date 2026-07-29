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
    a: "Yes. From the Transactions page you can filter your data by date, category, account, or type, then export exactly what you’re viewing as a CSV file.",
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
    <div className="border-b border-(--color-border-main)/70 py-5 last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 text-left"
      >
        <span className="font-semibold text-(--color-text-main)">{q}</span>
        <ChevronDown
          size={18}
          className={`shrink-0 text-(--color-text-muted) transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div className={`grid overflow-hidden transition-all duration-300 ease-out ${open ? "mt-3 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
        <div className="overflow-hidden">
          <p className="pr-8 text-sm leading-8 text-(--color-text-muted)">{a}</p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="bg-(--color-bg-muted) py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <Reveal className="text-center">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-(--color-text-main) sm:text-4xl">
            Frequently asked questions
          </h2>
        </Reveal>

        <Reveal delay={0.08} className="mt-12 rounded-[2rem] border border-(--color-border-main)/70 bg-(--color-bg-surface)/90 px-6 shadow-[0_20px_70px_-38px_rgba(15,23,42,0.2)]">
          {faqs.map((faq) => (
            <FaqItem key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
