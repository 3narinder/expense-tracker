import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How ExpenseAI collects, uses, and protects your data.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="July 15, 2026">
      <p>
        This is a template privacy policy for the ExpenseAI marketing site.
        Replace this page with your own policy before taking the app to
        production, ideally reviewed by counsel familiar with the
        jurisdictions your users are in.
      </p>

      <h2>Information we collect</h2>
      <p>
        The ExpenseAI application collects the account information you
        provide at registration (such as username, email, and preferred
        currency) along with the transactions, categories, and budgets you
        create while using the app.
      </p>

      <h2>How we use information</h2>
      <p>
        Data you enter is used to power the dashboards, budgets, and AI
        insights inside the app. We do not sell your financial data.
      </p>

      <h2>AI-generated insights</h2>
      <p>
        When you request an AI insight, a summary of your transaction data
        is processed to generate the report shown in your account. Insight
        history is stored so you can review it later.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy can be sent through the contact page.
      </p>
    </LegalPage>
  );
}
