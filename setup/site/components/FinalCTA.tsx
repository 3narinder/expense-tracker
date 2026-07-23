import { ArrowUpRight, BookOpen } from "lucide-react";
import { APP_URL, GITHUB_URL } from "@/lib/config";
import Reveal from "./Reveal";
import GithubIcon from "./GithubIcon";

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div
        aria-hidden
        className="absolute inset-0 bg-(--color-primary)"
      />
      <div
        aria-hidden
        className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-white/10 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-white/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-8">
        <Reveal>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white">
            Start tracking smarter today
          </h2>
          <p className="mt-5 text-lg text-white/80 max-w-xl mx-auto">
            No spreadsheets. No guesswork. Just a clear, AI-assisted view of
            your money.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a
              href={APP_URL}
              className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3.5 text-sm font-semibold text-(--color-primary) shadow-lg hover:bg-white/90 transition-colors"
            >
              Launch App
              <ArrowUpRight size={16} />
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              <GithubIcon size={16} />
              GitHub
            </a>
            <a
              href={`${GITHUB_URL}#readme`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              <BookOpen size={16} />
              Documentation
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
