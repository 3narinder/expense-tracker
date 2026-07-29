import Link from "next/link";
import Logo from "./Logo";
import GithubIcon from "./GithubIcon";
import { GITHUB_URL } from "@/lib/config";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-(--color-border-main) bg-(--color-bg-surface)">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Logo />
            <p className="mt-3 max-w-xs text-sm text-(--color-text-muted)">
              A clear, AI-assisted view of your income, expenses, and
              budgets.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-(--color-text-muted) hover:text-(--color-text-main) transition-colors"
            >
              <GithubIcon size={15} />
              GitHub
            </a>
            <Link href="/privacy" className="text-(--color-text-muted) hover:text-(--color-text-main) transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-(--color-text-muted) hover:text-(--color-text-main) transition-colors">
              Terms
            </Link>
            <Link href="/contact" className="text-(--color-text-muted) hover:text-(--color-text-main) transition-colors">
              Contact
            </Link>
          </div>
        </div>

        <div className="mt-10 border-t border-(--color-border-muted) pt-6 text-center text-xs text-(--color-text-ghost)">
          © {year} ExpenseAI. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
