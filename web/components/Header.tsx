"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";
import Logo from "./Logo";
import { APP_URL, GITHUB_URL } from "@/lib/config";

const navItems = [
  { href: "#features", label: "Features" },
  { href: "#ai", label: "AI Insights" },
  { href: "#analytics", label: "Analytics" },
  { href: "#faq", label: "FAQ" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-(--color-bg-surface)/85 backdrop-blur-md border-b border-(--color-border-main) shadow-[0_1px_0_0_var(--color-border-main)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8"
      >
        <Link href="#home" aria-label="ExpenseAI home">
          <Logo />
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-sm font-medium text-(--color-text-muted) hover:text-(--color-text-main) transition-colors"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-(--color-text-muted) hover:text-(--color-text-main) transition-colors"
          >
            GitHub
          </a>
          <a
            href={APP_URL}
            className="inline-flex items-center gap-1.5 rounded-lg bg-(--color-primary) px-4 py-2.5 text-sm font-semibold text-(--color-primary-foreground) shadow-sm hover:bg-(--color-primary-hover) transition-colors"
          >
            Launch App
            <ArrowUpRight size={15} />
          </a>
        </div>

        <button
          type="button"
          className="md:hidden p-2 -mr-2 text-(--color-text-main)"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-(--color-border-main) bg-(--color-bg-surface) px-6 py-4">
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-2.5 text-sm font-medium text-(--color-text-main)"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block py-2.5 text-sm font-medium text-(--color-text-muted)"
              >
                GitHub
              </a>
            </li>
            <li className="pt-2">
              <a
                href={APP_URL}
                className="flex items-center justify-center gap-1.5 rounded-lg bg-(--color-primary) px-4 py-3 text-sm font-semibold text-(--color-primary-foreground)"
              >
                Launch App <ArrowUpRight size={15} />
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
