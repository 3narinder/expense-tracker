import type { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-6 py-20 lg:px-8">
          <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-(--color-text-main)">
            {title}
          </h1>
          <p className="mt-2 text-sm text-(--color-text-muted)">
            Last updated: {updated}
          </p>
          <div className="prose prose-neutral mt-10 max-w-none space-y-6 text-(--color-text-main) [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mt-10 [&_h2]:mb-3 [&_p]:text-(--color-text-muted) [&_p]:leading-relaxed [&_li]:text-(--color-text-muted)">
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
