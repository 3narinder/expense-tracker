import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import AISection from "@/components/AISection";
import BudgetSection from "@/components/BudgetSection";
import TransactionsSection from "@/components/TransactionsSection";
import AnalyticsSection from "@/components/AnalyticsSection";
import WhyChoose from "@/components/WhyChoose";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        <Hero />
        <Features />
        <AISection />
        <BudgetSection />
        <TransactionsSection />
        <AnalyticsSection />
        <WhyChoose />
        <Testimonials />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
