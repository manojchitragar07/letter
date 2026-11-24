"use client";

import React, { useState } from "react";
import { LetterData, EnvelopeColorId } from "@/types/letter";
import { PaperCanvas } from "@/components/studio/PaperCanvas";
import { WaxSeal } from "@/components/stickers/WaxSeal";
import { AtmosphereEffects } from "@/components/effects/AtmosphereEffects";
import { soundEngine } from "@/lib/soundEngine";
import { SvgSticker } from "@/components/stickers/SvgStickers";
import { VintageVinylPlayer } from "./VintageVinylPlayer";
import {
  Volume2,
  VolumeX,
  Reply,
  Printer,
  RotateCcw,
  Sparkles,
  Heart,
  Feather,
  Home,
} from "lucide-react";
import Link from "next/link";

interface EnvelopeOpeningProps {
  letter: LetterData;
}

const ENVELOPE_COLORS: Record<EnvelopeColorId, { base: string; flap: string; shadow: string; border: string }> = {
  kraft: {
    base: "#C4A482",
    flap: "#B59573",
    shadow: "rgba(100, 70, 40, 0.35)",
    border: "#9E7A56",
  },
  cream: {
    base: "#F6F1E5",
    flap: "#EDE6D6",
    shadow: "rgba(120, 110, 95, 0.25)",
    border: "#DCD3C0",
  },
  burgundy: {
    base: "#5E1825",
    flap: "#4A111C",
    shadow: "rgba(50, 10, 18, 0.5)",
    border: "#3F0C16",
  },
  midnight: {
    base: "#182236",
    flap: "#111929",
    shadow: "rgba(10, 15, 30, 0.6)",
    border: "#0E1524",
  },
  sage: {
    base: "#8A9A86",
    flap: "#7A8A76",
    shadow: "rgba(60, 80, 60, 0.35)",
    border: "#677563",
  },
  rose: {
    base: "#D4A5A5",
    flap: "#C29191",
    shadow: "rgba(130, 80, 85, 0.35)",
    border: "#AD7B7B",
  },
};

export function EnvelopeOpening({ letter }: EnvelopeOpeningProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isUnfolding, setIsUnfolding] = useState(false);
  const [isFullyUnfolded, setIsFullyUnfolded] = useState(false);
  const [hasBrokenSeal, setHasBrokenSeal] = useState(false);

  const envTheme = ENVELOPE_COLORS[letter.design.envelope.color] || ENVELOPE_COLORS.kraft;

  const handleOpenEnvelope = () => {
    if (isOpen) return;

    // 1. Break wax seal & play acoustic snap
    setHasBrokenSeal(true);
    soundEngine.playEnvelopeOpenSound();
    setIsOpen(true);

    // Call read status API
    try {
      fetch(`/api/letters/${letter.slug}/read`, { method: "POST" });
    } catch (e) {}

    // 2. Letter starts sliding out after 400ms
    setTimeout(() => {
      setIsUnfolding(true);
    }, 450);

    // 3. Play ambient soundtrack
    if (letter.design.atmosphere.audioTrack !== "none") {
      setTimeout(() => {
        soundEngine.playAtmosphere(letter.design.atmosphere.audioTrack);
      }, 750);
    }

    // 4. Fully unfold letter after 1100ms
    setTimeout(() => {
      setIsFullyUnfolded(true);
    }, 1150);
  };

  const handleCloseEnvelope = () => {
    soundEngine.stopAtmosphere();
    setIsFullyUnfolded(false);
    setIsUnfolding(false);
    setTimeout(() => {
      setIsOpen(false);
      setHasBrokenSeal(false);
    }, 500);
  };

  const replyUrl = `/studio?recipient=${encodeURIComponent(
    letter.senderName
  )}&salutation=${encodeURIComponent(`Dear ${letter.senderName},`)}`;

  return (
    <div className="relative min-h-screen bg-[#EDE7DD] flex flex-col items-center justify-center p-4 sm:p-8 overflow-x-hidden selection:bg-rose-200">
      {/* Warm Ambient Vignette Background */}
      <div className="fixed inset-0 pointer-events-none opacity-40 bg-[radial-gradient(circle_at_center,_transparent_40%,_rgba(60,45,30,0.18)_100%)]" />

      {/* Atmospheric Particles (Petals / Stars / Leaves) */}
      {isOpen && (
        <AtmosphereEffects effect={letter.design.atmosphere.effect} />
      )}

      {/* Vintage Vinyl Soundtrack Player (Bottom Right) */}
      {isOpen && (
        <VintageVinylPlayer currentTrack={letter.design.atmosphere.audioTrack} />
      )}

      {/* Fixed Top Left Home Button */}
      <div className="fixed top-4 left-4 z-50 flex items-center gap-2">
        <Link
          href="/"
          className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/85 hover:bg-white text-stone-700 hover:text-burgundy shadow-md backdrop-blur-md transition-all hover:scale-105 active:scale-95 text-xs font-serif font-medium border border-stone-200/60"
          title="Return to Dearly Home"
        >
          <Home className="w-4 h-4 text-burgundy" />
          <span className="font-serif font-bold text-stone-900">Dearly Home</span>
        </Link>
      </div>

      {/* Top Floating Controls */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
        {isFullyUnfolded && (
          <button
            onClick={handleCloseEnvelope}
            className="p-2.5 rounded-full bg-white/85 hover:bg-white text-stone-700 shadow-md backdrop-blur-md transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5 text-xs font-serif font-medium px-3"
            title="Re-seal into Envelope"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Re-seal</span>
          </button>
        )}
      </div>

      {/* UNOPENED ENVELOPE STAGE */}
      {!isFullyUnfolded && (
        <div className="relative flex flex-col items-center justify-center my-auto z-20 animate-fadeIn">
          {/* Subtle invitation prompt */}
          <div
            className={`text-center mb-8 transition-all duration-700 ${
              isOpen ? "opacity-0 -translate-y-6" : "opacity-100"
            }`}
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-800/5 text-stone-600 text-xs font-serif mb-2 border border-stone-800/10">
              <Feather className="w-3.5 h-3.5 text-amber-800" />
              <span>A private keepsake delivered to you</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-stone-900 tracking-tight">
              {letter.recipientName}
            </h1>

            <p className="text-xs sm:text-sm text-stone-600 mt-2.5 flex items-center justify-center gap-1.5 animate-pulse font-serif italic">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              Break the wax seal to unfold your letter
            </p>
          </div>

          {/* 3D Realistic Physical Envelope */}
          <div
            onClick={handleOpenEnvelope}
            style={{
              perspective: "1200px",
              boxShadow: `0 30px 60px -15px ${envTheme.shadow}`,
            }}
            className={`relative w-[340px] sm:w-[480px] md:w-[540px] h-[230px] sm:h-[310px] md:h-[350px] rounded-xl cursor-pointer transition-all duration-700 transform ${
              isOpen ? "scale-95 translate-y-16 opacity-30 pointer-events-none" : "hover:scale-[1.02]"
            }`}
          >
            {/* Envelope Base Body */}
            <div
              style={{
                backgroundColor: envTheme.base,
                borderColor: envTheme.border,
              }}
              className="absolute inset-0 rounded-xl overflow-hidden border shadow-lg"
            >
              {/* Paper grain texture */}
              <div
                className="absolute inset-0 opacity-15 pointer-events-none mix-blend-multiply"
                style={{
                  backgroundImage: `radial-gradient(#443322 0.75px, transparent 0.75px)`,
                  backgroundSize: "12px 12px",
                }}
              />

              {/* Envelope Flap Fold Lines */}
              <div
                style={{
                  borderLeft: "270px solid transparent",
                  borderRight: "270px solid transparent",
                  borderBottom: `190px solid ${envTheme.flap}`,
                  opacity: 0.85,
                }}
                className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none filter drop-shadow(0 -4px 6px rgba(0,0,0,0.12))"
              />

              {/* Postage Stamp on upper right */}
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6 w-16 sm:w-20 pointer-events-none filter drop-shadow-sm">
                <SvgSticker id={letter.design.envelope.stampDesign || "svg:stamp-airmail"} />
              </div>

              {/* Recipient's Name in Calligraphy on the Front */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8 pointer-events-none z-10">
                <span className="text-[10px] uppercase tracking-widest opacity-60 font-serif mb-1 text-stone-800">
                  Carefully sealed for
                </span>
                <span
                  className={`text-2xl sm:text-4xl font-bold tracking-wide drop-shadow-sm ${
                    letter.design.envelope.recipientCalligraphyFont || "font-handwriting"
                  }`}
                  style={{
                    color:
                      letter.design.envelope.color === "midnight" ||
                      letter.design.envelope.color === "burgundy"
                        ? "#F7F5EE"
                        : "#2B2621",
                  }}
                >
                  {letter.recipientName}
                </span>
                <span className="text-[11px] tracking-wider opacity-60 mt-1 font-serif text-stone-700">
                  Sent with affection by {letter.senderName}
                </span>
              </div>
            </div>

            {/* Top Triangular Flap with 3D Flip */}
            <div
              style={{
                transformOrigin: "top center",
                transform: isOpen ? "rotateX(180deg)" : "rotateX(0deg)",
                transition: "transform 0.85s cubic-bezier(0.4, 0, 0.2, 1)",
                zIndex: isOpen ? 1 : 25,
              }}
              className="absolute top-0 left-0 right-0 h-[140px] sm:h-[185px] pointer-events-none"
            >
              <div
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: "170px sm:borderLeft-270px solid transparent",
                  borderRight: "170px sm:borderRight-270px solid transparent",
                  borderTop: `140px solid ${envTheme.flap}`,
                  filter: "drop-shadow(0 6px 10px rgba(0,0,0,0.22))",
                }}
                className="w-full h-full flex justify-center"
              />
            </div>

            {/* Centered Wax Seal with fracture animation */}
            <div
              style={{
                transition: "transform 0.5s ease-out, opacity 0.5s ease-out",
                transform: hasBrokenSeal
                  ? "translate(-50%, -50%) scale(1.35) rotate(12deg)"
                  : "translate(-50%, -50%) scale(1) rotate(0deg)",
                opacity: hasBrokenSeal ? 0 : 1,
              }}
              className="absolute top-[52%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-30"
            >
              <WaxSeal
                design={letter.design.envelope.sealDesign}
                color={letter.design.envelope.sealColor}
                size={82}
                interactive={true}
              />
            </div>
          </div>
        </div>
      )}

      {/* FULLY UNFOLDED LETTER STAGE */}
      {isFullyUnfolded && (
        <div className="relative z-30 w-full max-w-[720px] mx-auto py-8 sm:py-12 animate-unfold">
          {/* Header Action Bar */}
          <div className="flex items-center justify-between mb-6 px-2 text-xs text-stone-600">
            <span className="font-serif italic text-sm">
              An epistolary gift from <strong className="text-stone-900 font-semibold">{letter.senderName}</strong>
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => window.print()}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/80 hover:bg-white text-stone-700 shadow-sm transition-all hover:scale-105"
                title="Print or Save as PDF"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Save Keepsake</span>
              </button>
            </div>
          </div>

          {/* The Exact Letter Canvas (100% Fidelity) */}
          <div className="rounded-xl overflow-hidden shadow-2xl">
            <PaperCanvas
              design={letter.design}
              senderName={letter.senderName}
              recipientName={letter.recipientName}
              letterTitle={letter.letterTitle}
              date={letter.date}
              salutation={letter.salutation}
              body={letter.body}
              closing={letter.closing}
              signatureName={letter.signatureName}
              signatureStyle={letter.signatureStyle}
              customSignatureUrl={letter.customSignatureUrl}
              readOnly={true}
            />
          </div>

          {/* Closing Receiver Actions Bar */}
          <div className="mt-12 p-8 bg-white/85 backdrop-blur-md rounded-2xl border border-stone-200/80 shadow-md text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto shadow-inner">
              <Heart className="w-6 h-6 fill-rose-600/20" />
            </div>

            <div>
              <h3 className="text-lg font-serif font-bold text-stone-900">
                A keepsake to stay with you
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto mt-1 leading-relaxed">
                Words written with care outlive every notification. You can reply with a letter of your own back to {letter.senderName}.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link
                href={replyUrl}
                className="px-6 py-3 bg-burgundy hover:bg-burgundy-dark text-white text-xs font-semibold rounded-xl flex items-center gap-2 shadow-sm transition-all hover:scale-105"
              >
                <Reply className="w-4 h-4" />
                <span>Write a Reply Letter</span>
              </Link>

              <button
                onClick={handleCloseEnvelope}
                className="px-5 py-3 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-medium rounded-xl flex items-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Fold Back into Envelope</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Unfolding Animation CSS */}
      <style jsx global>{`
        @keyframes unfold {
          0% {
            opacity: 0;
            transform: translateY(80px) scale(0.92);
          }
          100% {
            opacity: 1;
            transform: translateY(0px) scale(1);
          }
        }
        .animate-unfold {
          animation: unfold 0.85s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @media print {
          body {
            background: white !important;
          }
          .fixed,
          button,
          .shadow-2xl {
            box-shadow: none !important;
          }
        }
      `}</style>
    </div>
  );
}
