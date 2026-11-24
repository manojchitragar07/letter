"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { LetterData } from "@/types/letter";
import { QRCodeSVG } from "qrcode.react";
import confetti from "canvas-confetti";
import {
  Check,
  Copy,
  ExternalLink,
  Share2,
  Mail,
  MessageCircle,
  KeyRound,
  Eye,
  X,
  HeartHandshake,
  Home,
} from "lucide-react";

interface ShareLetterModalProps {
  isOpen: boolean;
  onClose: () => void;
  letter: LetterData | null;
}

export function ShareLetterModal({ isOpen, onClose, letter }: ShareLetterModalProps) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedSecret, setCopiedSecret] = useState(false);
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, []);

  useEffect(() => {
    if (isOpen && letter) {
      // Fire festive celebration confetti
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#8B3A4A", "#D4AF37", "#E07A5F", "#FAF0E6"],
      });
    }
  }, [isOpen, letter]);

  if (!isOpen || !letter) return null;

  const letterUrl = `${origin}/letter/${letter.slug}`;
  const manageUrl = `${origin}/manage/${letter.secretKey}`;

  const copyToClipboard = async (text: string, type: "link" | "secret") => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === "link") {
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
      } else {
        setCopiedSecret(true);
        setTimeout(() => setCopiedSecret(false), 2000);
      }
    } catch (err) {
      console.error("Clipboard copy failed:", err);
    }
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      `Dear ${letter.recipientName},\n\nI wrote a personal letter for you on Dearly. Open it here:\n${letterUrl}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  const handleEmailShare = () => {
    const subject = encodeURIComponent(`A letter for you from ${letter.senderName}`);
    const body = encodeURIComponent(
      `Dear ${letter.recipientName},\n\nI have prepared a personal handwritten letter for you on Dearly.\n\nYou can open your envelope and read it here:\n${letterUrl}\n\nWith love,\n${letter.senderName}`
    );
    window.open(`mailto:?subject=${subject}&body=${body}`, "_blank");
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `A letter for ${letter.recipientName}`,
          text: `I wrote a personal letter for you. Open your envelope here:`,
          url: letterUrl,
        });
      } catch (err) {}
    } else {
      copyToClipboard(letterUrl, "link");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#FAF7F2] text-[#2B2621] w-full max-w-xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col border border-[#E3DFC9] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-[#E3DFC9] bg-gradient-to-r from-amber-50 to-rose-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-burgundy/10 flex items-center justify-center text-burgundy">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-serif font-bold text-stone-900">
                Your Letter is Sealed & Ready
              </h2>
              <p className="text-xs text-stone-600 mt-0.5">
                Share this private link with {letter.recipientName}. No registration needed to read.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-200/60 transition-colors text-stone-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 overflow-y-auto">
          {/* Shareable Link Box */}
          <div className="bg-white p-4 rounded-xl border border-stone-200/90 shadow-sm">
            <label className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1.5 block">
              Unique Shareable Letter Link
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={letterUrl}
                className="flex-1 bg-stone-50 px-3 py-2 text-sm rounded-lg border border-stone-200 text-stone-800 font-mono select-all focus:outline-none"
              />
              <button
                onClick={() => copyToClipboard(letterUrl, "link")}
                className="px-4 py-2 bg-burgundy hover:bg-burgundy-dark text-white text-sm font-medium rounded-lg flex items-center gap-1.5 transition-colors shadow-sm"
              >
                {copiedLink ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                <span>{copiedLink ? "Copied!" : "Copy Link"}</span>
              </button>
            </div>
          </div>

          {/* Share Buttons */}
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={handleWhatsAppShare}
              className="flex items-center justify-center gap-2 py-2.5 px-3 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] rounded-xl text-xs font-semibold transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </button>
            <button
              onClick={handleEmailShare}
              className="flex items-center justify-center gap-2 py-2.5 px-3 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-semibold transition-colors"
            >
              <Mail className="w-4 h-4" />
              Email
            </button>
            <button
              onClick={handleNativeShare}
              className="flex items-center justify-center gap-2 py-2.5 px-3 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-semibold transition-colors"
            >
              <Share2 className="w-4 h-4" />
              More Options
            </button>
          </div>

          {/* QR Code and Live Preview CTA */}
          <div className="bg-white p-4 rounded-xl border border-stone-200/90 flex flex-col sm:flex-row items-center gap-6">
            <div className="p-2 bg-white rounded-lg border border-stone-200 shadow-sm shrink-0">
              <QRCodeSVG value={letterUrl} size={110} level="M" />
            </div>
            <div className="flex-1 text-center sm:text-left space-y-2">
              <h4 className="text-sm font-semibold text-stone-800">
                Print or Scan QR Code
              </h4>
              <p className="text-xs text-stone-500 leading-relaxed">
                Want to surprise them physically? Print this QR code on a card or gift box so they can scan and open it!
              </p>
              <a
                href={letterUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-amber-800 hover:text-amber-900 font-semibold"
              >
                <Eye className="w-3.5 h-3.5" />
                Experience Envelope Opening as Receiver
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Sender Management Passkey */}
          <div className="bg-amber-50/70 p-4 rounded-xl border border-amber-200/80">
            <div className="flex items-start gap-2.5">
              <KeyRound className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
              <div className="flex-1">
                <h4 className="text-xs font-semibold text-amber-900 uppercase tracking-wide">
                  Sender Management Link
                </h4>
                <p className="text-xs text-amber-800/90 mt-1 leading-relaxed">
                  Keep this link for yourself. It gives you access to check if the letter was opened, read receipt time, edit contents, or delete it permanently.
                </p>
                <div className="mt-2.5 flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={manageUrl}
                    className="flex-1 bg-white/80 px-2.5 py-1.5 text-xs rounded border border-amber-300 font-mono text-stone-700 select-all"
                  />
                  <button
                    onClick={() => copyToClipboard(manageUrl, "secret")}
                    className="px-3 py-1.5 bg-amber-800 hover:bg-amber-900 text-white text-xs font-medium rounded transition-colors"
                  >
                    {copiedSecret ? "Copied" : "Copy"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-100 border-t border-[#E3DFC9] flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-serif font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-200/60 transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return to Home</span>
          </Link>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-stone-800 hover:bg-stone-900 text-white rounded-lg text-sm font-medium transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
