import type { Metadata } from "next";
import { Inter, Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { SITE_URL, APP_NAME } from "@/lib/config";
import { ThemeProvider } from "@/lib/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

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
        url: "/hero_img.png",
        width: 1553,
        height: 1097,
        alt: "ExpenseAI — AI-powered expense tracking and budgeting",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/hero_img.png"],
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
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${ibmPlexMono.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col">
        <ThemeProvider defaultTheme="light" storageKey="expenseai-theme">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
