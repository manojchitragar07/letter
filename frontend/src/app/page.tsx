import React from "react";
import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { SkyHero } from "@/components/landing/SkyHero";
import { HeroEnvelope } from "@/components/landing/HeroEnvelope";
import { LETTER_TEMPLATES } from "@/data/templates";
import { fetchAllPublicLetters } from "@/lib/api";
import {
  PenTool,
  Sparkles,
  Heart,
  Share2,
  Mail,
  ShieldCheck,
  ArrowRight,
  Music,
  Stamp,
  Palette,
  ExternalLink,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const letters = await fetchAllPublicLetters();
  const showcaseLetters = letters.slice(0, 3);

  const occasions = [
    {
      title: "Love Letters",
      tagline: "For words too deep for blue bubbles.",
      templateId: "romantic-pink",
      color: "from-rose-100 to-pink-50",
      accent: "text-rose-800",
    },
    {
      title: "Letters to Best Friends",
      tagline: "Inside jokes, shared summers, and gratitude.",
      templateId: "classic-ruled",
      color: "from-amber-100 to-orange-50",
      accent: "text-amber-800",
    },
    {
      title: "Apology Letters",
      tagline: "Honest reflection when texts feel too cold.",
      templateId: "minimal-white",
      color: "from-stone-200 to-stone-50",
      accent: "text-stone-800",
    },
    {
      title: "Birthday Wishes",
      tagline: "A keepsake they will revisit for years.",
      templateId: "scrapbook-style",
      color: "from-yellow-100 to-amber-50",
      accent: "text-amber-900",
    },
    {
      title: "Thank You Letters",
      tagline: "Deep gratitude made tangible and lasting.",
      templateId: "vintage-parchment",
      color: "from-orange-100 to-amber-50",
      accent: "text-amber-900",
    },
    {
      title: "Letters to Family",
      tagline: "To parents, grandparents, and siblings.",
      templateId: "floral-stationery",
      color: "from-emerald-100 to-green-50",
      accent: "text-emerald-900",
    },
    {
      title: "Unsent Letters",
      tagline: "For thoughts you finally need to put into words.",
      templateId: "handmade-paper",
      color: "from-stone-200 to-amber-50",
      accent: "text-stone-900",
    },
    {
      title: "Just Because",
      tagline: "Because someone was on your mind today.",
      templateId: "dark-aesthetic",
      color: "from-slate-900 to-indigo-950 text-white",
      accent: "text-amber-300",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2B2621] flex flex-col">
      {/* 1. SKY HERO (Exact layout & aesthetic from reference image + letter elements) */}
      <SkyHero />

      <main className="flex-1">
        {/* INTERACTIVE ENVELOPE SPOTLIGHT */}
        <section className="py-20 bg-[#FAF7F2] relative overflow-hidden border-b border-[#E7E0D0]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-burgundy/10 text-burgundy text-xs font-semibold tracking-wide border border-burgundy/20">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Interactive Unfolding Ceremony</span>
                </div>

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-stone-900 tracking-tight leading-tight">
                  Letters designed to be <br />
                  <span className="italic font-normal text-burgundy">
                    opened with wonder.
                  </span>
                </h2>

                <p className="text-sm sm:text-base text-stone-600 font-sans max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  When you share your private link, your recipient doesn&apos;t just receive a message. They experience a sealed wax envelope breaking open, paper unfolding gracefully, and vinyl melodies playing in the background.
                </p>

                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                  <Link
                    href="/studio"
                    className="px-6 py-3.5 bg-burgundy hover:bg-burgundy-dark text-white rounded-xl font-serif text-sm font-semibold flex items-center gap-2 shadow-lg transition-all hover:scale-105"
                  >
                    <PenTool className="w-4 h-4" />
                    <span>Create Your Letter Now</span>
                  </Link>
                  <Link
                    href="/templates"
                    className="px-6 py-3.5 bg-white hover:bg-stone-50 text-stone-800 rounded-xl font-serif text-sm font-medium flex items-center gap-2 border border-stone-200 transition-colors shadow-sm"
                  >
                    <span>Browse 8 Templates</span>
                    <ArrowRight className="w-4 h-4 text-stone-500" />
                  </Link>
                </div>
              </div>

              {/* Interactive Envelope Preview */}
              <div className="lg:col-span-5 flex justify-center">
                <HeroEnvelope />
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS SECTION */}
        <section id="how-it-works" className="py-20 bg-[#F4EFE6] border-b border-[#E3DFC9]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
              <span className="text-xs uppercase tracking-widest font-mono text-amber-900 font-semibold">
                The Journey
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900">
                How Dearly Works
              </h2>
              <p className="text-sm text-stone-600 leading-relaxed font-sans">
                Three simple steps to craft an unforgettable emotional keepsake.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="bg-white p-8 rounded-2xl border border-stone-200/80 shadow-sm hover:shadow-md transition-shadow relative">
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center font-serif text-lg font-bold mb-6 border border-amber-200/50">
                  01
                </div>
                <h3 className="text-lg font-serif font-bold text-stone-900 mb-2">
                  Write Your Feelings
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Enter our dedicated letter studio. Type your heartfelt message, personal memories, or confession with tailored typography and editorial fonts.
                </p>
              </div>

              {/* Step 2 */}
              <div className="bg-white p-8 rounded-2xl border border-stone-200/80 shadow-sm hover:shadow-md transition-shadow relative">
                <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-800 flex items-center justify-center font-serif text-lg font-bold mb-6 border border-rose-200/50">
                  02
                </div>
                <h3 className="text-lg font-serif font-bold text-stone-900 mb-2">
                  Make It Beautiful
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Choose handmade paper textures, drag and drop pressed flowers, vintage stamps, and washi tapes. Pick an envelope color and stamp with a personalized wax seal.
                </p>
              </div>

              {/* Step 3 */}
              <div className="bg-white p-8 rounded-2xl border border-stone-200/80 shadow-sm hover:shadow-md transition-shadow relative">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-serif text-lg font-bold mb-6 border border-emerald-200/50">
                  03
                </div>
                <h3 className="text-lg font-serif font-bold text-stone-900 mb-2">
                  Share Your Private Link
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Generate a private, unpredictable URL and QR code. When your recipient opens the link, they experience an interactive 3D envelope-opening ceremony with background music.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* OCCASIONS SECTION */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
              <span className="text-xs uppercase tracking-widest font-mono text-amber-900 font-semibold">
                Occasions
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900">
                Explore the Possibilities
              </h2>
              <p className="text-sm text-stone-600">
                Whatever you have to say, there is a letter waiting to be written.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {occasions.map((occ) => (
                <Link
                  key={occ.title}
                  href={`/studio?template=${occ.templateId}`}
                  className={`p-6 rounded-2xl bg-gradient-to-br ${occ.color} border border-black/5 hover:border-black/15 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group flex flex-col justify-between h-44`}
                >
                  <div>
                    <h3 className="font-serif font-bold text-lg mb-1 group-hover:text-burgundy transition-colors">
                      {occ.title}
                    </h3>
                    <p className="text-xs opacity-75 leading-relaxed">
                      {occ.tagline}
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-xs font-semibold pt-4">
                    <span className="group-hover:underline">Write this letter</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* EMOTIONAL SHOWCASE SECTION */}
        <section id="showcase" className="py-20 bg-[#F4EFE6] border-t border-[#E3DFC9]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
              <span className="text-xs uppercase tracking-widest font-mono text-amber-900 font-semibold">
                Curated Keepsakes
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900">
                Emotional Showcase
              </h2>
              <p className="text-sm text-stone-600 leading-relaxed font-sans">
                Experience how letters feel to the receiver. Click any letter below to open its envelope and hear its melody.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {showcaseLetters.map((ltr) => (
                <div
                  key={ltr.id}
                  className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div
                    style={{ backgroundColor: ltr.design.paperColor }}
                    className="p-6 border-b border-stone-200/80 relative min-h-[220px] flex flex-col justify-between"
                  >
                    <div className="flex justify-between items-start text-[11px] text-stone-500 font-serif">
                      <span>To: <strong>{ltr.recipientName}</strong></span>
                      <span>From: <strong>{ltr.senderName}</strong></span>
                    </div>

                    <div className="my-4">
                      <h4 className="font-serif font-bold text-stone-900 text-base mb-1">
                        {ltr.letterTitle || "A Dearly Letter"}
                      </h4>
                      <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed font-serif">
                        {ltr.body}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="font-signature text-xl text-burgundy block">
                        {ltr.signatureName}
                      </span>
                    </div>
                  </div>

                  {/* Showcase Card Footer */}
                  <div className="p-4 bg-stone-50 flex items-center justify-between">
                    <span className="text-[11px] text-stone-500 font-serif">
                      Template: {ltr.design.templateId.replace("-", " ")}
                    </span>
                    <Link
                      href={`/letter/${ltr.slug}`}
                      className="px-3.5 py-1.5 bg-burgundy hover:bg-burgundy-dark text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
                    >
                      <span>Open Envelope</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CALL TO ACTION BANNER */}
        <section className="py-20 bg-burgundy text-white text-center relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 relative z-10">
            <h2 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight">
              Give someone a letter they will keep forever.
            </h2>
            <p className="text-sm sm:text-base text-rose-100 max-w-xl mx-auto leading-relaxed">
              No subscriptions, no receiver sign-ups. Just your heart on handcrafted digital stationery.
            </p>
            <div className="pt-2">
              <Link
                href="/studio"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#FAF7F2] hover:bg-white text-burgundy font-serif font-bold text-base rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-0.5"
              >
                <PenTool className="w-4 h-4" />
                <span>Start Writing Your Letter</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
