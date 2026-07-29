"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";
import Logo from "./Logo";
import { GITHUB_URL } from "@/lib/config";
import LaunchAppLink from "./LaunchAppLink";

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
          ? "border-b border-(--color-border-main)/80 bg-(--color-bg-surface)/90 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8"
      >
        <Link href="#home" aria-label="ExpenseAI home" className="transition-transform hover:-translate-y-0.5">
          <Logo />
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-sm font-medium text-(--color-text-muted) transition-colors hover:text-(--color-text-main)"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-(--color-text-muted) transition-colors hover:text-(--color-text-main)"
          >
            GitHub
          </a>
          <LaunchAppLink className="inline-flex items-center gap-1.5 rounded-full bg-(--color-primary) px-4 py-2.5 text-sm font-semibold text-(--color-primary-foreground) shadow-[0_12px_30px_-18px_var(--color-primary)] transition-all hover:-translate-y-0.5 hover:bg-(--color-primary-hover)">
            Launch App
            <ArrowUpRight size={15} />
          </LaunchAppLink>
        </div>

        <button
          type="button"
          className="-mr-2 rounded-full p-2 text-(--color-text-main) md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-(--color-border-main)/80 bg-(--color-bg-surface) px-6 py-4 md:hidden">
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
              <LaunchAppLink className="flex items-center justify-center gap-1.5 rounded-full bg-(--color-primary) px-4 py-3 text-sm font-semibold text-(--color-primary-foreground)">
                Launch App <ArrowUpRight size={15} />
              </LaunchAppLink>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
