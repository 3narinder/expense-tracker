import { ArrowUpRight, BookOpen } from "lucide-react";
import { GITHUB_URL } from "@/lib/config";
import Reveal from "./Reveal";
import GithubIcon from "./GithubIcon";
import LaunchAppLink from "./LaunchAppLink";

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div aria-hidden className="absolute inset-0 bg-linear-to-br from-(--color-violet) via-(--color-violet-bright) to-(--color-gold)" />
      <div aria-hidden className="absolute -right-16 top-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div aria-hidden className="absolute -bottom-20 left-0 h-80 w-80 rounded-full bg-white/10 blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-8">
        <Reveal>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Start tracking smarter today
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/80">
            No spreadsheets. No guesswork. Just a clear, AI-assisted view of your money.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <LaunchAppLink className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-(--color-violet) shadow-lg transition-colors hover:bg-white/90">
              Launch App
              <ArrowUpRight size={16} />
            </LaunchAppLink>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10">
              <GithubIcon size={16} />
              GitHub
            </a>
            <a href={`${GITHUB_URL}#readme`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10">
              <BookOpen size={16} />
              Documentation
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
