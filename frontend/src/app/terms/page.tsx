import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FileText, HeartHandshake } from "lucide-react";

export const metadata = {
  title: "Terms and Conditions | Dearly",
  description: "Terms of service and respectful communication standards on Dearly.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2B2621] flex flex-col">
      <Navbar />

      <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto w-full space-y-10">
        <div className="text-center space-y-2">
          <span className="text-xs font-serif uppercase tracking-widest text-burgundy font-semibold">
            Community Guidelines
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900">
            Terms of Service
          </h1>
          <p className="text-xs text-stone-500">Last updated: November 2026</p>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-stone-200/80 shadow-sm space-y-6 text-sm text-stone-700 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-serif font-bold text-stone-900">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing or using Dearly, you agree to these Terms. Dearly is intended for personal, thoughtful, and affectionate communication between individuals.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-serif font-bold text-stone-900">
              2. Acceptable Use
            </h2>
            <p>
              You agree not to use Dearly to transmit unlawful content, harassment, hate speech, threats, spam, or malicious material. We reserve the right to delete content that violates human dignity.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-serif font-bold text-stone-900">
              3. Content Ownership
            </h2>
            <p>
              You retain all rights to the personal text and images you compose. By generating a letter, you grant Dearly the necessary technical license to store and display your letter to anyone possessing the link.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-serif font-bold text-stone-900">
              4. Disclaimer of Warranty
            </h2>
            <p>
              Dearly is provided on an &ldquo;as is&rdquo; basis. While we strive for 100% uptime and archival durability, we encourage keeping personal backup copies of important writings.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
