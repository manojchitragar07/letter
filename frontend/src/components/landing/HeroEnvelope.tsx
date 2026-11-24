"use client";

import React, { useState } from "react";
import { WaxSeal } from "@/components/stickers/WaxSeal";
import { SvgSticker } from "@/components/stickers/SvgStickers";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

export function HeroEnvelope() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsHovered(!isHovered)}
      className="relative w-full max-w-[460px] h-[340px] sm:h-[380px] mx-auto cursor-pointer select-none group perspective"
    >
      {/* Glow aura */}
      <div className="absolute inset-0 bg-gradient-to-tr from-amber-200/40 via-rose-200/30 to-burgundy/10 rounded-2xl filter blur-2xl transform scale-110 pointer-events-none" />

      {/* The Letter Sheet sliding upwards out of envelope */}
      <div
        style={{
          transform: isHovered
            ? "translateY(-110px) rotate(-1.5deg) scale(1.02)"
            : "translateY(15px) rotate(0deg) scale(0.95)",
          transition: "transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
          boxShadow: "0 15px 35px -10px rgba(60, 45, 30, 0.2)",
        }}
        className="absolute left-6 right-6 top-8 bg-[#F5EAD6] p-6 rounded-lg border border-[#A0886C]/40 z-10 overflow-hidden"
      >
        {/* Subtle paper grain */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none mix-blend-multiply"
          style={{
            backgroundImage: `radial-gradient(#88755E 0.75px, transparent 0.75px)`,
            backgroundSize: "14px 14px",
          }}
        />

        {/* Small sticker on letter */}
        <div className="absolute top-3 right-3 w-16 opacity-90 transform rotate-6">
          <SvgSticker id="svg:stamp-airmail" />
        </div>
        <div className="absolute bottom-4 left-3 w-14 opacity-80 transform -rotate-12">
          <SvgSticker id="svg:botanical-rose" />
        </div>

        {/* Sample heartfelt letter text preview */}
        <div className="relative z-10 space-y-2 text-[#3A2A1E]">
          <div className="flex justify-between text-[11px] font-serif text-stone-500">
            <span>To My Dearest</span>
            <span>Always & Forever</span>
          </div>
          <h4 className="font-serif font-bold text-base sm:text-lg tracking-wide text-stone-900 pt-1">
            Some feelings deserve more than a text...
          </h4>
          <p className="text-xs sm:text-sm font-handwriting leading-relaxed text-stone-700 pt-1">
            &ldquo;In a world of vanishing notifications, I wanted to write something that you could hold close, slow down for, and keep forever.&rdquo;
          </p>
          <div className="pt-2 text-right">
            <span className="font-signature text-2xl text-burgundy block -rotate-3">
              With all my love
            </span>
          </div>
        </div>
      </div>

      {/* Envelope Body (Back & Pouch) */}
      <div
        style={{
          boxShadow: "0 25px 50px -15px rgba(50, 30, 20, 0.35)",
        }}
        className="absolute bottom-0 left-0 right-0 h-[240px] sm:h-[260px] bg-[#C4A482] rounded-xl border border-[#9E7A56] overflow-hidden z-20"
      >
        {/* Envelope Paper Grain */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none mix-blend-multiply"
          style={{
            backgroundImage: `radial-gradient(#443322 0.75px, transparent 0.75px)`,
            backgroundSize: "12px 12px",
          }}
        />

        {/* Envelope Flap Shapes */}
        <div
          style={{
            borderLeft: "230px solid transparent",
            borderRight: "230px solid transparent",
            borderBottom: "160px solid #B59573",
          }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none filter drop-shadow(0 -3px 4px rgba(0,0,0,0.12))"
        />

        {/* Recipient Caligraphy on the Front */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pointer-events-none z-10">
          <span className="text-[10px] tracking-widest uppercase text-stone-700/80 font-serif mb-1">
            Personal Delivery
          </span>
          <span className="text-2xl sm:text-3xl font-handwriting font-bold text-stone-900 drop-shadow-sm">
            For Someone Special
          </span>
          <span className="text-[11px] font-serif italic text-stone-700/90 mt-1">
            Hover to peek inside
          </span>
        </div>

        {/* Wax Seal on envelope center */}
        <div
          style={{
            transform: isHovered
              ? "translate(-50%, -50%) scale(1.08)"
              : "translate(-50%, -50%) scale(1)",
            transition: "transform 0.4s ease-out",
          }}
          className="absolute top-[28%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-30"
        >
          <WaxSeal design="heart" color="burgundy" size={68} />
        </div>
      </div>
    </div>
  );
}
