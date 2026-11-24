import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LETTER_TEMPLATES } from "@/data/templates";
import { ArrowRight, PenTool, Sparkles } from "lucide-react";

export const metadata = {
  title: "Stationery Templates Gallery | Dearly",
  description: "Browse curated handcrafted stationery templates for love letters, best friends, apologies, and keepsakes.",
};

export default function TemplatesPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2B2621] flex flex-col">
      <Navbar />

      <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-burgundy/10 text-burgundy text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            Curated Stationery Designs
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-stone-900 tracking-tight">
            Stationery Template Gallery
          </h1>
          <p className="text-sm text-stone-600 leading-relaxed">
            Every letter style has its own soul. Choose the canvas that matches the emotion you want to send.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {LETTER_TEMPLATES.map((tmpl) => (
            <div
              key={tmpl.id}
              className="bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              {/* Paper Preview Header */}
              <div
                style={{ backgroundColor: tmpl.paperColor }}
                className="p-8 border-b border-stone-200 relative min-h-[260px] flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-black/10 text-stone-800">
                    {tmpl.tag}
                  </span>
                  <span className="text-xs font-serif text-stone-500">
                    {tmpl.fontFamily.replace("font-", "")}
                  </span>
                </div>

                <div className="my-6">
                  <h3
                    className={`text-lg font-serif font-bold mb-2 ${
                      tmpl.id === "dark-aesthetic" ? "text-amber-200" : "text-stone-900"
                    }`}
                  >
                    {tmpl.sampleTitle}
                  </h3>
                  <p
                    className={`text-xs line-clamp-3 leading-relaxed font-serif ${
                      tmpl.id === "dark-aesthetic" ? "text-stone-300" : "text-stone-600"
                    }`}
                  >
                    {tmpl.sampleBody}
                  </p>
                </div>

                <div className="text-right">
                  <span
                    className={`text-xl font-signature block ${
                      tmpl.id === "dark-aesthetic" ? "text-amber-300" : "text-burgundy"
                    }`}
                  >
                    {tmpl.sampleClosing}
                  </span>
                </div>
              </div>

              {/* Template details & CTA */}
              <div className="p-6 bg-white space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-serif font-bold text-stone-900 text-base">
                    {tmpl.name}
                  </h4>
                  <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                    {tmpl.description}
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-stone-100">
                  <span className="text-[11px] text-stone-400 font-serif">
                    Envelope: {tmpl.envelopeColor} • Seal: {tmpl.sealColor}
                  </span>
                  <Link
                    href={`/studio?template=${tmpl.id}`}
                    className="px-4 py-2 bg-burgundy hover:bg-burgundy-dark text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-all shadow-sm group-hover:scale-105"
                  >
                    <PenTool className="w-3.5 h-3.5" />
                    <span>Use Template</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
