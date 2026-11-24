"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PenTool, Menu, X, Sparkles } from "lucide-react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#E3DFC9]/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-full bg-burgundy flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
            <span className="font-serif font-bold text-base italic">D</span>
          </div>
          <div>
            <span className="font-serif font-bold text-xl tracking-tight text-stone-900">
              Dearly
            </span>
            <span className="hidden sm:inline-block text-[10px] text-stone-500 ml-2 tracking-widest uppercase font-serif">
              Letters with Soul
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-medium text-stone-700">
          <Link
            href="/templates"
            className="hover:text-burgundy transition-colors"
          >
            Stationery Templates
          </Link>
          <Link
            href="/#how-it-works"
            className="hover:text-burgundy transition-colors"
          >
            How It Works
          </Link>
          <Link
            href="/#showcase"
            className="hover:text-burgundy transition-colors"
          >
            Showcase
          </Link>
          <Link href="/about" className="hover:text-burgundy transition-colors">
            Our Story
          </Link>
        </nav>

        {/* CTA Button */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            href="/studio"
            className="px-4 py-2 bg-burgundy hover:bg-burgundy-dark text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-sm hover:shadow transition-all hover:-translate-y-0.5 active:translate-y-0"
          >
            <PenTool className="w-3.5 h-3.5" />
            <span>Write a Letter</span>
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-stone-600 hover:text-stone-900"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF7F2] border-b border-[#E3DFC9] px-4 pt-2 pb-6 space-y-3">
          <Link
            href="/studio"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full py-2.5 bg-burgundy text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2"
          >
            <PenTool className="w-3.5 h-3.5" />
            <span>Write a Letter</span>
          </Link>
          <Link
            href="/templates"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm text-stone-700 hover:text-burgundy"
          >
            Stationery Templates
          </Link>
          <Link
            href="/#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm text-stone-700 hover:text-burgundy"
          >
            How It Works
          </Link>
          <Link
            href="/#showcase"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm text-stone-700 hover:text-burgundy"
          >
            Showcase
          </Link>
          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm text-stone-700 hover:text-burgundy"
          >
            Our Story
          </Link>
        </div>
      )}
    </header>
  );
}
