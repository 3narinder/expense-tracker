import type { Metadata } from "next";
import { Mail } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GithubIcon from "@/components/GithubIcon";
import { GITHUB_URL } from "@/lib/config";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch about ExpenseAI.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-2xl px-6 py-20 text-center lg:px-8">
          <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-(--color-text-main)">
            Get in touch
          </h1>
          <p className="mt-4 text-lg text-(--color-text-muted)">
            Found a bug, have a feature request, or want to contribute?
            We&apos;d love to hear from you.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="mailto:hello@expenseai.app"
              className="inline-flex items-center gap-2 rounded-lg bg-(--color-primary) px-6 py-3.5 text-sm font-semibold text-(--color-primary-foreground) hover:bg-(--color-primary-hover) transition-colors"
            >
              <Mail size={16} />
              hello@expenseai.app
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-(--color-border-main) bg-(--color-bg-surface) px-6 py-3.5 text-sm font-semibold text-(--color-text-main) hover:bg-(--color-bg-hover) transition-colors"
            >
              <GithubIcon size={16} />
              Open an issue on GitHub
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
