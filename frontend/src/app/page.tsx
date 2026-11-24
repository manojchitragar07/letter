import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
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
      <Navbar />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden">
          {/* Subtle warm background radial grain */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-40">
            <div className="absolute top-10 left-1/4 w-96 h-96 bg-rose-200/50 rounded-full filter blur-3xl" />
            <div className="absolute top-24 right-1/4 w-96 h-96 bg-amber-200/50 rounded-full filter blur-3xl" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              {/* Left Column: Headline & Value Prop */}
              <div className="lg:col-span-7 text-center lg:text-left space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-burgundy/10 text-burgundy text-xs font-semibold tracking-wide border border-burgundy/20">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Slow communication for moments that matter</span>
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-stone-900 tracking-tight leading-[1.12]">
                  Some feelings deserve <br />
                  <span className="italic font-normal text-burgundy">
                    more than a text.
                  </span>
                </h1>

                <p className="text-base sm:text-lg text-stone-600 font-sans max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  Turn your thoughts into beautiful letters. Write your message on vintage parchment, decorate with botanical illustrations and wax seals, and share a private link with someone you cherish.
                </p>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                  <Link
                    href="/studio"
                    className="w-full sm:w-auto px-7 py-3.5 bg-burgundy hover:bg-burgundy-dark text-white rounded-xl font-serif text-base font-semibold flex items-center justify-center gap-2.5 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
                  >
                    <PenTool className="w-4 h-4" />
                    <span>Write a Letter</span>
                  </Link>

                  <Link
                    href="#showcase"
                    className="w-full sm:w-auto px-6 py-3.5 bg-stone-100 hover:bg-stone-200/80 text-stone-800 rounded-xl font-serif text-base font-medium flex items-center justify-center gap-2 border border-stone-200 transition-colors"
                  >
                    <span>Explore Letters</span>
                    <ArrowRight className="w-4 h-4 text-stone-500" />
                  </Link>
                </div>

                {/* Subtext guarantees */}
                <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 text-xs text-stone-500 font-serif">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    No account required for receiver
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Heart className="w-4 h-4 text-rose-500" />
                    100% Private & Permanent
                  </span>
                </div>
              </div>

              {/* Right Column: Animated Interactive Envelope Showcase */}
              <div className="lg:col-span-5 flex justify-center">
                <HeroEnvelope />
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS SECTION */}
        <section id="how-it-works" className="py-20 bg-[#F4EFE6] border-y border-[#E3DFC9]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
              <span className="text-xs uppercase tracking-widest font-serif text-amber-900 font-semibold">
                The Journey
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900">
                How Dearly Works
              </h2>
              <p className="text-sm text-stone-600 leading-relaxed font-sans">
                Three simple steps to craft an unforgettable emotional experience.
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

        {/* EXPLORE THE POSSIBILITIES SECTION */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
              <span className="text-xs uppercase tracking-widest font-serif text-amber-900 font-semibold">
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
              <span className="text-xs uppercase tracking-widest font-serif text-amber-900 font-semibold">
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
