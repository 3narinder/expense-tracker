import type { Metadata } from "next";
import "./globals.css";
import { SITE_URL, APP_NAME } from "@/lib/config";

const title = "ExpenseAI — AI-Powered Expense Tracker & Budgeting App";
const description =
  "Track transactions, manage budgets, and get AI-generated financial insights with ExpenseAI. Multi-currency support, custom categories, CSV export, and monthly health scores.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: `%s — ${APP_NAME}`,
  },
  description,
  keywords: [
    "expense tracker",
    "budgeting app",
    "AI finance insights",
    "personal finance app",
    "budget tracker",
    "money management app",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: APP_NAME,
    title,
    description,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ExpenseAI — AI-powered expense tracking and budgeting",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: APP_NAME,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    description,
    url: SITE_URL,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
