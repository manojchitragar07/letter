"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SkyIllustration } from "./SkyIllustration";
import { ArrowRight, PenTool, Sparkles, Mail, Heart, Menu, X } from "lucide-react";

export function SkyHero() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <section className="relative w-full bg-gradient-to-b from-[#1E648B] via-[#2A779E] to-[#3989AF] text-[#FAF7F2] overflow-hidden flex flex-col justify-between min-h-screen">
      {/* 1. PAINTERLY CANVAS / PAPER GRAIN TEXTURE */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `radial-gradient(#FFFFFF 1px, transparent 1px)`,
          backgroundSize: "18px 18px",
        }}
      />

      {/* Atmospheric Horizon Glow */}
      <div className="absolute bottom-28 left-0 right-0 h-48 bg-gradient-to-t from-[#DFBD76]/30 via-[#CCA156]/15 to-transparent pointer-events-none" />

      {/* 2. TOP NAVIGATION BAR (Matching reference image) */}
      <header className="relative z-30 w-full px-6 py-6 md:px-12 md:py-8 flex items-center justify-between">
        {/* Left Links */}
        <nav className="hidden md:flex items-center gap-10 text-[11px] font-sans font-semibold tracking-[0.25em] uppercase text-[#FAF7F2]/90">
          <Link
            href="#showcase"
            className="hover:text-white transition-colors hover:underline underline-offset-8"
          >
            Stories
          </Link>
          <Link
            href="/studio"
            className="hover:text-white transition-colors hover:underline underline-offset-8"
          >
            Journal
          </Link>
        </nav>

        {/* Center Botanical Branch Logo */}
        <Link href="/" className="flex items-center gap-2 group mx-auto md:mx-0">
          <svg
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 text-[#FAF7F2] drop-shadow-sm group-hover:scale-110 transition-transform"
          >
            {/* Delicate Botanical Twig / Olive Leaf */}
            <path
              d="M10 32 C 16 26, 22 18, 30 8"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
            />
            {/* Leaves */}
            <path
              d="M16 24 C 14 18, 18 16, 21 21 C 21 21, 18 24, 16 24 Z"
              fill="currentColor"
              opacity="0.9"
            />
            <path
              d="M20 20 C 23 15, 27 16, 26 21 C 25 21, 22 21, 20 20 Z"
              fill="currentColor"
              opacity="0.9"
            />
            <path
              d="M23 15 C 22 9, 26 8, 29 13 C 28 14, 25 15, 23 15 Z"
              fill="currentColor"
              opacity="0.9"
            />
            <path
              d="M27 11 C 31 7, 35 9, 33 13 C 32 13, 29 12, 27 11 Z"
              fill="currentColor"
              opacity="0.9"
            />
            <path
              d="M12 28 C 8 26, 9 21, 14 24 Z"
              fill="currentColor"
              opacity="0.9"
            />
          </svg>
          <span className="font-serif font-semibold tracking-widest text-sm text-[#FAF7F2]">
            DEARLY
          </span>
        </Link>

        {/* Right Links */}
        <div className="hidden md:flex items-center gap-10 text-[11px] font-sans font-semibold tracking-[0.25em] uppercase text-[#FAF7F2]/90">
          <Link
            href="/about"
            className="hover:text-white transition-colors hover:underline underline-offset-8"
          >
            About
          </Link>
          <Link
            href="/templates"
            className="hover:text-white transition-colors hover:underline underline-offset-8"
          >
            Contact
          </Link>

          {/* Action Button */}
          <Link
            href="/studio"
            className="px-4 py-2 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/30 text-white text-[11px] font-medium tracking-wider flex items-center gap-2 transition-all hover:scale-105"
          >
            <PenTool className="w-3 h-3" />
            <span>Write a Letter</span>
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-white/90 hover:text-white"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden relative z-40 bg-[#1E648B]/95 backdrop-blur-md px-6 py-6 border-b border-white/20 space-y-4">
          <Link
            href="/studio"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full py-3 bg-[#FAF7F2] text-[#1E648B] rounded-xl text-xs font-serif font-bold flex items-center justify-center gap-2 shadow-lg"
          >
            <PenTool className="w-4 h-4" />
            <span>Write a Letter</span>
          </Link>
          <div className="grid grid-cols-2 gap-3 pt-2 text-xs font-serif">
            <Link
              href="#showcase"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-[#FAF7F2] hover:text-white"
            >
              Stories & Letters
            </Link>
            <Link
              href="/templates"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-[#FAF7F2] hover:text-white"
            >
              Stationery Templates
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-[#FAF7F2] hover:text-white"
            >
              Our Story
            </Link>
            <Link
              href="/privacy"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-[#FAF7F2] hover:text-white"
            >
              Privacy & Sealed
            </Link>
          </div>
        </div>
      )}

      {/* 3. HERO BODY: Left Typography + Right Boy & Dog Scene */}
      <div className="relative z-20 flex-1 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full pt-4 pb-12 lg:pt-8 lg:pb-16 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          {/* Left Column: Bold Lowercase Typography & Cursive Subtext */}
          <div className="lg:col-span-6 space-y-7 text-left">
            {/* Subtle Postal Airmail Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-[#FAF7F2] text-[11px] font-mono tracking-wider">
              <Mail className="w-3 h-3 text-rose-300" />
              <span>A DIGITAL LETTER EXPERIENCE</span>
            </div>

            {/* Monumental Headline */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-sans font-bold tracking-tight text-[#FAF7F2] leading-[0.98] drop-shadow-md">
              look up. <br />
              stay curious.
            </h1>

            {/* Handwritten Subtitle in Cursive Script */}
            <p className="font-handwriting text-2xl sm:text-3xl md:text-4xl text-[#FAF7F2]/95 leading-snug drop-shadow-sm max-w-xl">
              notes on wonder, companionship, <br />
              and the quiet kind of courage.
            </p>

            {/* Action Links */}
            <div className="pt-2 flex flex-wrap items-center gap-5">
              <Link
                href="/studio"
                className="group inline-flex items-center gap-2.5 text-xs sm:text-sm font-sans font-semibold tracking-[0.2em] uppercase text-[#FAF7F2] hover:text-white pb-1 border-b-2 border-white/40 hover:border-white transition-all"
              >
                <span>Write a Letter</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
              </Link>

              <Link
                href="#showcase"
                className="group inline-flex items-center gap-2 text-xs sm:text-sm font-sans font-medium tracking-[0.2em] uppercase text-[#FAF7F2]/75 hover:text-white pb-1 border-b border-white/20 hover:border-white/60 transition-all"
              >
                <span>Read the Latest</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Column: Handcrafted Boy, Dog & Golden Ridge Illustration */}
          <div className="lg:col-span-6 flex justify-center items-end relative">
            <SkyIllustration />
          </div>
        </div>
      </div>

      {/* 4. BOTTOM SHELF / PARCHMENT DOCK (Matches reference image) */}
      <div className="relative z-30 w-full bg-[#F7F2E4] text-[#2B2621] rounded-t-[28px] md:rounded-t-[40px] shadow-[0_-15px_40px_rgba(15,40,60,0.18)] border-t border-[#DFD6C0]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8 md:py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 divide-y sm:divide-y-0 lg:divide-x divide-[#E2D8C0]">
            {/* Card 1: JOURNAL */}
            <div className="lg:pr-8 flex items-start gap-4 pt-6 sm:pt-0 first:pt-0 group">
              {/* Botanical Rose Icon */}
              <div className="w-12 h-14 flex-shrink-0 text-stone-700 pt-0.5">
                <svg
                  viewBox="0 0 40 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full transform group-hover:scale-110 transition-transform"
                >
                  {/* Delicate Botanical Rose Line Art */}
                  <path
                    d="M20 18 C 16 14, 18 8, 22 6 C 26 8, 28 14, 24 18 Z"
                    stroke="currentColor"
                    strokeWidth="1.3"
                  />
                  <path
                    d="M19 12 C 17 10, 20 7, 23 9 C 25 11, 23 14, 21 14 Z"
                    stroke="currentColor"
                    strokeWidth="1.1"
                  />
                  {/* Stem */}
                  <path
                    d="M21 18 C 21 28, 20 38, 20 46"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                  {/* Leaves */}
                  <path
                    d="M20 28 C 14 26, 12 30, 16 34 C 18 34, 20 31, 20 28 Z"
                    stroke="currentColor"
                    strokeWidth="1.2"
                  />
                  <path
                    d="M20 36 C 26 34, 28 38, 24 42 C 22 42, 20 39, 20 36 Z"
                    stroke="currentColor"
                    strokeWidth="1.2"
                  />
                </svg>
              </div>

              <div className="space-y-1.5 flex-1">
                <h3 className="font-mono text-xs font-bold tracking-[0.2em] uppercase text-stone-800">
                  Journal
                </h3>
                <p className="font-typewriter text-xs text-stone-600 leading-relaxed">
                  Words, sketches, <br />
                  and the in-betweens.
                </p>
                <Link
                  href="/studio"
                  className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold tracking-widest uppercase text-stone-700 hover:text-burgundy pt-1 transition-colors"
                >
                  <span>Explore</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Card 2: PLACES / STATIONERY */}
            <div className="lg:px-8 flex items-start gap-4 pt-6 sm:pt-0 group">
              {/* Mountain Peaks Icon */}
              <div className="w-14 h-12 flex-shrink-0 text-stone-700 pt-1">
                <svg
                  viewBox="0 0 52 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full transform group-hover:scale-110 transition-transform"
                >
                  {/* Main mountain */}
                  <path
                    d="M4 32 L 24 8 L 44 32 Z"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinejoin="round"
                  />
                  {/* Mountain ridge line */}
                  <path
                    d="M24 8 L 22 18 L 26 24 L 24 32"
                    stroke="currentColor"
                    strokeWidth="1.2"
                  />
                  {/* Small companion peak */}
                  <path
                    d="M32 20 L 42 12 L 50 32"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinejoin="round"
                  />
                  {/* Subtle hatching */}
                  <line x1="16" y1="24" x2="22" y2="28" stroke="currentColor" strokeWidth="0.8" />
                  <line x1="18" y1="20" x2="23" y2="22" stroke="currentColor" strokeWidth="0.8" />
                </svg>
              </div>

              <div className="space-y-1.5 flex-1">
                <h3 className="font-mono text-xs font-bold tracking-[0.2em] uppercase text-stone-800">
                  Places
                </h3>
                <p className="font-typewriter text-xs text-stone-600 leading-relaxed">
                  Field notes from <br />
                  somewhere beautiful.
                </p>
                <Link
                  href="/templates"
                  className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold tracking-widest uppercase text-stone-700 hover:text-burgundy pt-1 transition-colors"
                >
                  <span>Discover</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Card 3: MOMENTS */}
            <div className="lg:px-8 flex items-start gap-4 pt-6 sm:pt-0 group">
              {/* Vintage Camera Icon */}
              <div className="w-12 h-12 flex-shrink-0 text-stone-700 pt-1">
                <svg
                  viewBox="0 0 44 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full transform group-hover:scale-110 transition-transform"
                >
                  {/* Camera Body */}
                  <rect
                    x="4"
                    y="10"
                    width="36"
                    height="22"
                    rx="3"
                    stroke="currentColor"
                    strokeWidth="1.4"
                  />
                  {/* Top pentaprism / shutter */}
                  <path d="M14 10 L 16 6 L 28 6 L 30 10" stroke="currentColor" strokeWidth="1.3" />
                  <circle cx="9" cy="8" r="1.5" fill="currentColor" />
                  {/* Center Lens */}
                  <circle cx="22" cy="21" r="7" stroke="currentColor" strokeWidth="1.4" />
                  <circle cx="22" cy="21" r="3.5" stroke="currentColor" strokeWidth="1" />
                  {/* Viewfinder */}
                  <rect x="31" y="13" width="5" height="4" rx="0.5" stroke="currentColor" strokeWidth="1" />
                </svg>
              </div>

              <div className="space-y-1.5 flex-1">
                <h3 className="font-mono text-xs font-bold tracking-[0.2em] uppercase text-stone-800">
                  Moments
                </h3>
                <p className="font-typewriter text-xs text-stone-600 leading-relaxed">
                  Little things <br />
                  worth remembering.
                </p>
                <Link
                  href="#showcase"
                  className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold tracking-widest uppercase text-stone-700 hover:text-burgundy pt-1 transition-colors"
                >
                  <span>Browse</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Card 4: QUOTE & KEEP GOING */}
            <div className="lg:pl-8 flex flex-col justify-between pt-6 sm:pt-0">
              <div className="space-y-1">
                {/* Quotation mark */}
                <span className="font-serif text-3xl text-stone-400 font-bold leading-none block">
                  &ldquo;
                </span>
                <p className="font-typewriter text-xs text-stone-700 leading-relaxed">
                  The sky isn&apos;t the limit. <br />
                  It&apos;s the beginning.
                </p>
              </div>

              {/* Handwritten Signature: keep going */}
              <div className="pt-3 text-right flex items-center justify-end gap-2">
                <span className="font-signature text-2xl text-stone-800 -rotate-2">
                  keep going.
                </span>
                {/* Miniature Wax Seal badge */}
                <div className="w-4 h-4 rounded-full bg-burgundy flex items-center justify-center text-white shadow-sm">
                  <span className="text-[7px] font-serif italic">d</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
