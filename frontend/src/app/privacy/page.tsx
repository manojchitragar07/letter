import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ShieldCheck, Lock, EyeOff, Trash2 } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Dearly",
  description: "How Dearly protects your personal letters, unguessable links, and privacy.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2B2621] flex flex-col">
      <Navbar />

      <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto w-full space-y-10">
        <div className="text-center space-y-2">
          <span className="text-xs font-serif uppercase tracking-widest text-burgundy font-semibold">
            Trust & Security
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900">
            Privacy Policy
          </h1>
          <p className="text-xs text-stone-500">Last updated: November 2026</p>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-stone-200/80 shadow-sm space-y-8 text-sm text-stone-700 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-serif font-bold text-stone-900 flex items-center gap-2">
              <Lock className="w-4 h-4 text-burgundy" />
              1. Private, Unguessable Letter URLs
            </h2>
            <p>
              Every letter created on Dearly is assigned a cryptographically random, unpredictable identifier (slug). Your letter is only accessible to those who possess the exact URL you share.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-serif font-bold text-stone-900 flex items-center gap-2">
              <EyeOff className="w-4 h-4 text-burgundy" />
              2. Zero Account Friction for Receivers
            </h2>
            <p>
              Your loved ones should never have to create an account, download an application, or navigate advertisements to read words meant for them. The receiver experience is 100% friction-free and ad-free.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-serif font-bold text-stone-900 flex items-center gap-2">
              <Trash2 className="w-4 h-4 text-burgundy" />
              3. Sender Control & Permanent Deletion
            </h2>
            <p>
              When you generate a letter, you are provided with a confidential management key. Through this portal, you can monitor read receipts or choose to permanently destroy your letter and its link at any time.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-serif font-bold text-stone-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-burgundy" />
              4. No Commercial Profiling
            </h2>
            <p>
              We do not sell personal letters, analyze them for advertising keywords, or track cross-site behavioral profiles. What you write is sacred to you and your recipient.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
