import React from "react";
import Link from "next/link";
import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#211C18] text-[#EFECE1] border-t border-[#3B322B] pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-stone-800">
          {/* Brand info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-burgundy flex items-center justify-center text-white font-serif font-bold text-sm italic">
                D
              </div>
              <span className="font-serif font-bold text-xl tracking-tight text-white">
                Dearly
              </span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Some feelings deserve more than a text. Dearly brings the timeless warmth of handwritten epistolary art into the digital era with bespoke stationery, wax seals, and heartfelt delivery.
            </p>
            <p className="text-[11px] text-stone-500 italic font-serif">
              &ldquo;Write your feelings. Design your letter. Share a link. Let someone feel it.&rdquo;
            </p>
          </div>

          {/* Experience Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-300">
              The Experience
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <Link href="/studio" className="hover:text-amber-200 transition-colors">
                  Letter Creation Studio
                </Link>
              </li>
              <li>
                <Link href="/templates" className="hover:text-amber-200 transition-colors">
                  Templates Gallery
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="hover:text-amber-200 transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/#showcase" className="hover:text-amber-200 transition-colors">
                  Emotional Showcase
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal and About */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-300">
              Company & Legal
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <Link href="/about" className="hover:text-amber-200 transition-colors">
                  About Dearly
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-amber-200 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-amber-200 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <span className="text-stone-500">Contact: hello@dearly.love</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-500 gap-2">
          <p>© {new Date().getFullYear()} Dearly. A Digital Letter Experience. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Crafted with <Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> for words that matter
          </p>
        </div>
      </div>
    </footer>
  );
}
