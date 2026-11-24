"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { LetterData } from "@/types/letter";
import { QRCodeSVG } from "qrcode.react";
import Link from "next/link";
import {
  KeyRound,
  CheckCircle2,
  Clock,
  Eye,
  Trash2,
  Edit,
  Copy,
  Check,
  ExternalLink,
  ShieldAlert,
  ArrowLeft,
  Mail,
  Calendar,
} from "lucide-react";

export default function LetterManagePage() {
  const params = useParams();
  const router = useRouter();
  const secretKey = params?.secretKey as string;

  const [letter, setLetter] = useState<LetterData | null>(null);
  const [loading, setLoading] = useState(true);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, []);

  useEffect(() => {
    async function loadLetter() {
      try {
        const res = await fetch(`/api/letters/manage/${secretKey}`);
        if (res.ok) {
          const data = await res.json();
          setLetter(data.letter);
        }
      } catch (err) {
        console.error("Error loading letter:", err);
      } finally {
        setLoading(false);
      }
    }
    if (secretKey) {
      loadLetter();
    }
  }, [secretKey]);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to permanently delete this letter? This action cannot be undone.")) {
      return;
    }
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/letters/manage/${secretKey}`, {
        method: "DELETE",
      });
      if (res.ok) {
        alert("Your letter has been permanently deleted.");
        router.push("/");
      } else {
        alert("Failed to delete letter. Please try again.");
      }
    } catch (err) {
      alert("Error deleting letter.");
    } finally {
      setIsDeleting(false);
    }
  };

  const copyLink = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#EDE7DD] flex items-center justify-center">
        <div className="text-stone-600 font-serif text-sm animate-pulse">
          Loading letter controls...
        </div>
      </div>
    );
  }

  if (!letter) {
    return (
      <div className="min-h-screen bg-[#EDE7DD] flex flex-col items-center justify-center p-6 text-center">
        <ShieldAlert className="w-12 h-12 text-rose-600 mb-3" />
        <h1 className="text-xl font-serif font-bold text-stone-800">
          Invalid Management Link
        </h1>
        <p className="text-xs text-stone-500 max-w-sm mt-1 mb-6">
          This management link is invalid or the letter has already been deleted.
        </p>
        <Link
          href="/"
          className="px-4 py-2 bg-stone-800 text-white rounded-lg text-xs font-medium"
        >
          Return Home
        </Link>
      </div>
    );
  }

  const letterUrl = `${origin}/letter/${letter.slug}`;

  return (
    <div className="min-h-screen bg-[#EDE7DD] py-12 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Navigation back */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs text-stone-600 hover:text-stone-900 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Dearly</span>
          </Link>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
            Sender Management Portal
          </span>
        </div>

        {/* Status Card */}
        <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-md space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-serif uppercase tracking-widest text-stone-500">
                Letter to
              </span>
              <h1 className="text-2xl font-serif font-bold text-stone-900">
                {letter.recipientName}
              </h1>
              <p className="text-xs text-stone-500 mt-0.5">
                From: {letter.senderName} • Created on {new Date(letter.createdAt).toLocaleDateString()}
              </p>
            </div>

            {/* Read Receipt Badge */}
            <div className="text-right">
              {letter.isRead ? (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full text-xs font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Opened {letter.readCount} time{letter.readCount === 1 ? "" : "s"}</span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-full text-xs font-medium">
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  <span>Not Opened Yet</span>
                </div>
              )}
              {letter.readAt && (
                <span className="block text-[10px] text-stone-400 mt-1">
                  First read: {new Date(letter.readAt).toLocaleString()}
                </span>
              )}
            </div>
          </div>

          {/* Share Link Bar */}
          <div className="pt-4 border-t border-stone-100">
            <label className="text-xs font-semibold text-stone-600 block mb-1">
              Recipient Link (Public URL)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={letterUrl}
                className="flex-1 bg-stone-50 px-3 py-2 text-xs rounded-lg border border-stone-200 font-mono text-stone-700 select-all"
              />
              <button
                onClick={() => copyLink(letterUrl)}
                className="px-4 py-2 bg-burgundy hover:bg-burgundy-dark text-white rounded-lg text-xs font-medium flex items-center gap-1 shadow-sm transition-colors"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLink ? "Copied" : "Copy"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* QR Code and Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* QR Code Card */}
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex items-center gap-4">
            <div className="p-2 bg-white rounded-lg border border-stone-200 shrink-0">
              <QRCodeSVG value={letterUrl} size={85} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-stone-900">QR Code Keepsake</h4>
              <p className="text-[11px] text-stone-500 mt-1 leading-relaxed">
                Scan or print this QR code onto a physical gift card or photo.
              </p>
            </div>
          </div>

          {/* Preview Delivery Experience */}
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-bold text-stone-900">Receiver Experience</h4>
              <p className="text-[11px] text-stone-500 mt-1 leading-relaxed">
                Test the envelope opening animation and atmospheric music as your recipient sees it.
              </p>
            </div>
            <a
              href={letterUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 text-xs text-amber-800 hover:text-amber-900 font-semibold"
            >
              <Eye className="w-3.5 h-3.5" />
              Open Live Delivery View
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Danger Zone: Permanent Deletion */}
        <div className="bg-rose-50/70 p-6 rounded-2xl border border-rose-200 shadow-sm space-y-3">
          <h3 className="text-sm font-semibold text-rose-900 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-rose-600" />
            Delete Letter
          </h3>
          <p className="text-xs text-rose-700/90 leading-relaxed">
            Need to take this letter down? Deleting it will permanently destroy the letter and its shareable link immediately.
          </p>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-medium flex items-center gap-1.5 shadow-sm transition-colors disabled:opacity-50"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{isDeleting ? "Deleting..." : "Permanently Delete This Letter"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
