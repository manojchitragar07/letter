import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import { PenTool, Heart, Shield, Sparkles } from "lucide-react";

export const metadata = {
  title: "About Dearly | A Digital Letter Experience",
  description: "The philosophy of Dearly: slow communication, emotional craftsmanship, and keeping letters alive in a digital world.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2B2621] flex flex-col">
      <Navbar />

      <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full space-y-12">
        <div className="text-center space-y-4">
          <span className="text-xs font-serif uppercase tracking-widest text-burgundy font-semibold">
            Our Philosophy
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-stone-900 tracking-tight">
            Some feelings deserve more than a text.
          </h1>
          <p className="text-base text-stone-600 max-w-xl mx-auto font-serif italic">
            &ldquo;In an era of fleeting notifications and 5-second attention spans, we built Dearly to bring back the sacred ceremony of the handwritten letter.&rdquo;
          </p>
        </div>

        <div className="prose prose-stone max-w-none text-stone-700 space-y-6 text-sm sm:text-base leading-relaxed">
          <p>
            Think about the last time you received a real letter in the mail. The tactile sensation of the paper, the distinct personality of handwriting, the deliberate choice of words. You didn’t skim it while standing in line at the grocery store. You sat down. You took a breath. You felt it.
          </p>

          <p>
            Modern messaging apps were engineered for transaction: quick questions, logistical updates, memes, and thumbs-up emojis. But love, gratitude, deep friendship, and heartfelt apologies do not belong in a chat bubble that gets pushed down by an airline notification ten minutes later.
          </p>

          <div className="bg-amber-50/70 p-6 rounded-2xl border border-amber-200/80 my-8">
            <h3 className="font-serif font-bold text-stone-900 text-lg mb-2 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-800" />
              The Core Concept
            </h3>
            <p className="text-stone-800 font-serif italic text-base">
              Write your feelings. Design your letter. Share a link. Let someone feel it.
            </p>
          </div>

          <h2 className="text-2xl font-serif font-bold text-stone-900 pt-4">
            Digital Craftsmanship
          </h2>
          <p>
            Dearly is not a form builder or a card generator. It is a digital stationery atelier. Every letter is a bespoke canvas: warm deckled papers, authentic botanical illustrations, vintage postal stamps from Paris and Florence, washi tape strips, and customized wax seals.
          </p>
          <p>
            When your recipient opens their private link, they are not dropped into a generic dashboard. They encounter a sealed 3D envelope bearing their name. As they break the seal, the envelope flaps open with authentic paper acoustics, soothing ambient melodies start softly playing, and the original letter unfolds with 100% fidelity.
          </p>
        </div>

        <div className="pt-8 text-center">
          <Link
            href="/studio"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-burgundy hover:bg-burgundy-dark text-white rounded-xl font-serif font-semibold text-sm shadow-md transition-all hover:scale-105"
          >
            <PenTool className="w-4 h-4" />
            <span>Write a Letter to Someone You Love</span>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
