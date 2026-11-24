"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  LetterData,
  LetterDesignConfig,
  LetterTemplate,
  PlacedSticker,
  FontChoice,
  PaperTextureId,
  AtmosphereEffect,
  AudioTrackId,
  EnvelopeColorId,
  WaxSealColor,
  WaxSealDesign,
} from "@/types/letter";
import { LETTER_TEMPLATES } from "@/data/templates";
import { PaperCanvas } from "./PaperCanvas";
import { AssetLibraryModal } from "./AssetLibraryModal";
import { ShareLetterModal } from "./ShareLetterModal";
import { SignaturePadModal } from "./SignaturePadModal";
import { WaxSeal } from "@/components/stickers/WaxSeal";
import { soundEngine } from "@/lib/soundEngine";
import { AtmosphereEffects } from "@/components/effects/AtmosphereEffects";
import {
  Sparkles,
  Type,
  LayoutTemplate,
  Sticker,
  Mail,
  Music,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Smartphone,
  Monitor,
  Eye,
  Edit3,
  PenTool,
  Volume2,
  VolumeX,
  Stamp,
  Feather,
  Home,
  ArrowLeft,
} from "lucide-react";

interface LetterStudioProps {
  initialTemplateId?: string;
  existingLetter?: LetterData | null;
}

export function LetterStudio({
  initialTemplateId = "vintage-parchment",
  existingLetter = null,
}: LetterStudioProps) {
  // Find initial template
  const defaultTemplate =
    LETTER_TEMPLATES.find((t) => t.id === initialTemplateId) ||
    LETTER_TEMPLATES[0];

  // Studio Mode State
  const [activeTab, setActiveTab] = useState<
    "template" | "text" | "typography" | "stickers" | "envelope" | "atmosphere"
  >("template");
  const [isPreviewMode, setIsPreviewMode] = useState<boolean>(false);
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "mobile">("desktop");
  const [zoomLevel, setZoomLevel] = useState<number>(100);

  // Letter Fields
  const [senderName, setSenderName] = useState<string>(
    existingLetter?.senderName || ""
  );
  const [recipientName, setRecipientName] = useState<string>(
    existingLetter?.recipientName || ""
  );
  const [letterTitle, setLetterTitle] = useState<string>(
    existingLetter?.letterTitle || defaultTemplate.sampleTitle
  );
  const [date, setDate] = useState<string>(
    existingLetter?.date ||
      new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
  );
  const [salutation, setSalutation] = useState<string>(
    existingLetter?.salutation || defaultTemplate.sampleSalutation
  );
  const [body, setBody] = useState<string>(
    existingLetter?.body || defaultTemplate.sampleBody
  );
  const [closing, setClosing] = useState<string>(
    existingLetter?.closing || defaultTemplate.sampleClosing
  );
  const [signatureName, setSignatureName] = useState<string>(
    existingLetter?.signatureName || ""
  );
  const [signatureStyle, setSignatureStyle] = useState<
    "script" | "signature" | "handwriting" | "typewriter" | "drawn"
  >(existingLetter?.signatureStyle || "signature");
  const [customSignatureUrl, setCustomSignatureUrl] = useState<string | undefined>(
    existingLetter?.customSignatureUrl
  );

  // Writing sound effects
  const [enableTypingSound, setEnableTypingSound] = useState<boolean>(true);

  // Design Configuration
  const [design, setDesign] = useState<LetterDesignConfig>(
    existingLetter?.design || {
      templateId: defaultTemplate.id,
      paperColor: defaultTemplate.paperColor,
      paperTextureOverlay: true,
      paperCreases: true,
      postmarkCity: "PARIS",
      postmarkDate: "NOV 24 1928",
      borderStyle: defaultTemplate.borderStyle,
      typography: {
        fontFamily: defaultTemplate.fontFamily,
        fontSize: 18,
        lineHeight: 1.8,
        letterSpacing: 0,
        textAlign: "left",
        textColor: defaultTemplate.textColor,
      },
      envelope: {
        color: defaultTemplate.envelopeColor,
        sealColor: defaultTemplate.sealColor,
        sealDesign: defaultTemplate.sealDesign,
        stampDesign: "svg:stamp-airmail",
        recipientCalligraphyFont: "font-handwriting",
      },
      atmosphere: {
        effect: defaultTemplate.atmosphereEffect,
        audioTrack: defaultTemplate.audioTrack,
      },
      placedStickers: defaultTemplate.defaultStickers,
    }
  );

  // Sticker Selection & Modals
  const [selectedStickerId, setSelectedStickerId] = useState<string | null>(null);
  const [isAssetModalOpen, setIsAssetModalOpen] = useState<boolean>(false);
  const [isSignatureModalOpen, setIsSignatureModalOpen] = useState<boolean>(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [savedLetter, setSavedLetter] = useState<LetterData | null>(existingLetter);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  // Handle template selection
  const handleSelectTemplate = (tmpl: LetterTemplate) => {
    setDesign((prev) => ({
      ...prev,
      templateId: tmpl.id,
      paperColor: tmpl.paperColor,
      borderStyle: tmpl.borderStyle,
      typography: {
        ...prev.typography,
        fontFamily: tmpl.fontFamily,
        textColor: tmpl.textColor,
      },
      envelope: {
        ...prev.envelope,
        color: tmpl.envelopeColor,
        sealColor: tmpl.sealColor,
        sealDesign: tmpl.sealDesign,
      },
      atmosphere: {
        effect: tmpl.atmosphereEffect,
        audioTrack: tmpl.audioTrack,
      },
      placedStickers: tmpl.defaultStickers,
    }));
  };

  // Sticker management helpers
  const handleAddSticker = (newSticker: PlacedSticker) => {
    setDesign((prev) => ({
      ...prev,
      placedStickers: [...prev.placedStickers, newSticker],
    }));
    setSelectedStickerId(newSticker.id);
  };

  const handleUpdateSticker = (id: string, updated: Partial<PlacedSticker>) => {
    setDesign((prev) => ({
      ...prev,
      placedStickers: prev.placedStickers.map((stk) =>
        stk.id === id ? { ...stk, ...updated } : stk
      ),
    }));
  };

  const handleDeleteSticker = (id: string) => {
    setDesign((prev) => ({
      ...prev,
      placedStickers: prev.placedStickers.filter((stk) => stk.id !== id),
    }));
    if (selectedStickerId === id) setSelectedStickerId(null);
  };

  const handleBringForward = (id: string) => {
    setDesign((prev) => {
      const idx = prev.placedStickers.findIndex((s) => s.id === id);
      if (idx === -1 || idx === prev.placedStickers.length - 1) return prev;
      const copy = [...prev.placedStickers];
      const [item] = copy.splice(idx, 1);
      copy.splice(idx + 1, 0, item);
      return { ...prev, placedStickers: copy };
    });
  };

  const handleSendBackward = (id: string) => {
    setDesign((prev) => {
      const idx = prev.placedStickers.findIndex((s) => s.id === id);
      if (idx <= 0) return prev;
      const copy = [...prev.placedStickers];
      const [item] = copy.splice(idx, 1);
      copy.splice(idx - 1, 0, item);
      return { ...prev, placedStickers: copy };
    });
  };

  // Handle typing sound on body text changes
  const handleBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value);
    if (enableTypingSound) {
      if (design.typography.fontFamily === "font-typewriter") {
        soundEngine.playTypewriterSound();
      } else {
        soundEngine.playPenScratchSound();
      }
    }
  };

  // Atmosphere Audio Preview Toggle
  const toggleAudioPreview = () => {
    if (isPlayingAudio) {
      soundEngine.stopAtmosphere();
      setIsPlayingAudio(false);
    } else {
      soundEngine.playAtmosphere(design.atmosphere.audioTrack);
      setIsPlayingAudio(true);
    }
  };

  // Save / Generate Letter
  const handleGenerateLetter = async () => {
    setIsSaving(true);
    try {
      const payload: Partial<LetterData> = {
        secretKey: existingLetter?.secretKey,
        senderName: senderName.trim() || "An Admirer",
        recipientName: recipientName.trim() || "My Dear",
        letterTitle: letterTitle.trim() || undefined,
        date,
        salutation,
        body,
        closing,
        signatureName: signatureName.trim() || senderName.trim(),
        signatureStyle,
        customSignatureUrl,
        design,
      };

      const res = await fetch("/api/letters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to generate letter");

      const data = await res.json();
      setSavedLetter(data.letter);
      setIsShareModalOpen(true);
    } catch (err) {
      console.error("Save letter error:", err);
      alert("Could not generate letter. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#EDE7DD] text-[#2B2621]">
      {/* Visual Atmosphere Effect in Preview mode */}
      {isPreviewMode && (
        <AtmosphereEffects effect={design.atmosphere.effect} />
      )}

      {/* LEFT PANEL: Customization Tools */}
      <div
        className={`w-full lg:w-[460px] xl:w-[500px] bg-[#FAF7F2] border-r border-[#D9D2C5] flex flex-col h-auto lg:h-screen lg:sticky lg:top-0 z-30 shadow-md ${
          isPreviewMode ? "hidden lg:flex" : "flex"
        }`}
      >
        {/* Studio Top Header */}
        <div className="p-4 border-b border-[#E3DFC9] flex items-center justify-between bg-white/80">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              title="Return to Dearly Home"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-stone-700 hover:text-burgundy hover:bg-stone-100 transition-colors border border-stone-200/80 shadow-xs text-xs font-serif font-medium group"
            >
              <Home className="w-4 h-4 text-stone-600 group-hover:text-burgundy transition-colors" />
              <span>Home</span>
            </Link>

            <div className="w-[1px] h-6 bg-stone-300 hidden sm:block" />

            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-full bg-burgundy flex items-center justify-center text-white font-serif text-sm font-bold shadow-sm transition-transform group-hover:scale-105">
                D
              </div>
              <div>
                <h1 className="text-base font-serif font-bold text-stone-900 leading-tight group-hover:text-burgundy transition-colors">
                  Letter Studio
                </h1>
                <p className="text-[11px] text-stone-500">Design a timeless digital keepsake</p>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            {/* Typing audio toggle pill */}
            <button
              onClick={() => setEnableTypingSound(!enableTypingSound)}
              title={enableTypingSound ? "Pen scratch audio ON" : "Pen scratch audio OFF"}
              className={`p-1.5 rounded-lg border text-xs transition-colors ${
                enableTypingSound
                  ? "bg-amber-50 text-amber-900 border-amber-300"
                  : "bg-stone-100 text-stone-400 border-stone-200"
              }`}
            >
              <Feather className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setIsPreviewMode(!isPreviewMode)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg flex items-center gap-1.5 transition-all ${
                isPreviewMode
                  ? "bg-burgundy text-white shadow-sm"
                  : "bg-stone-100 hover:bg-stone-200 text-stone-700"
              }`}
            >
              {isPreviewMode ? <Edit3 className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span>{isPreviewMode ? "Edit Studio" : "Pure Preview"}</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center px-2 bg-stone-100/90 border-b border-[#E3DFC9] overflow-x-auto scrollbar-none">
          {[
            { id: "template", label: "Paper", icon: LayoutTemplate },
            { id: "text", label: "Message", icon: Edit3 },
            { id: "typography", label: "Typography", icon: Type },
            { id: "stickers", label: "Stickers", icon: Sticker },
            { id: "envelope", label: "Envelope", icon: Mail },
            { id: "atmosphere", label: "Atmosphere", icon: Music },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 py-3 px-3 text-xs font-medium border-b-2 whitespace-nowrap transition-all ${
                  isActive
                    ? "border-burgundy text-burgundy bg-white/50 font-semibold"
                    : "border-transparent text-stone-600 hover:text-stone-900 hover:bg-white/30"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content Area */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* TAB 1: TEMPLATE & PAPER */}
          {activeTab === "template" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-stone-800 mb-1">
                  Choose Stationery Style
                </h3>
                <p className="text-xs text-stone-500 mb-4">
                  Select a handcrafted stationery background for your message.
                </p>

                <div className="grid grid-cols-2 gap-3">
                  {LETTER_TEMPLATES.map((tmpl) => (
                    <div
                      key={tmpl.id}
                      onClick={() => handleSelectTemplate(tmpl)}
                      style={{ backgroundColor: tmpl.previewColor }}
                      className={`p-3 rounded-xl border cursor-pointer transition-all flex flex-col justify-between h-28 relative overflow-hidden shadow-sm hover:scale-[1.02] ${
                        design.templateId === tmpl.id
                          ? "border-burgundy ring-2 ring-burgundy/30 shadow-md"
                          : "border-stone-300/80 hover:border-stone-400"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-black/10 text-stone-800 font-medium">
                          {tmpl.tag}
                        </span>
                        {design.templateId === tmpl.id && (
                          <span className="w-2.5 h-2.5 rounded-full bg-burgundy" />
                        )}
                      </div>
                      <div>
                        <h4
                          className={`text-xs font-serif font-bold ${
                            tmpl.id === "dark-aesthetic" ? "text-amber-200" : "text-stone-900"
                          }`}
                        >
                          {tmpl.name}
                        </h4>
                        <p
                          className={`text-[10px] line-clamp-1 mt-0.5 ${
                            tmpl.id === "dark-aesthetic" ? "text-stone-300" : "text-stone-600"
                          }`}
                        >
                          {tmpl.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Decorative Borders */}
              <div className="pt-4 border-t border-stone-200">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-3">
                  Border Style
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "none", label: "Clean Borderless" },
                    { id: "vintage-double", label: "Double Vintage" },
                    { id: "ornate-gold", label: "Ornate Gilded" },
                    { id: "post-border", label: "Airmail Stitched" },
                    { id: "deckle", label: "Deckle Shadow" },
                    { id: "dashed", label: "Dashed Craft" },
                  ].map((b) => (
                    <button
                      key={b.id}
                      onClick={() =>
                        setDesign((prev) => ({
                          ...prev,
                          borderStyle: b.id as any,
                        }))
                      }
                      className={`px-2.5 py-2 text-xs rounded-lg border text-center transition-all ${
                        design.borderStyle === b.id
                          ? "border-burgundy bg-burgundy/10 text-burgundy font-medium"
                          : "border-stone-200 bg-white hover:bg-stone-50 text-stone-700"
                      }`}
                    >
                      {b.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Realistic Paper Creases & Texture Toggles */}
              <div className="pt-4 border-t border-stone-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-semibold text-stone-800">
                      Physical Tri-Fold Paper Creases
                    </h4>
                    <p className="text-[11px] text-stone-500">
                      Realistic horizontal crease shadow lines
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={design.paperCreases !== false}
                    onChange={(e) =>
                      setDesign((prev) => ({
                        ...prev,
                        paperCreases: e.target.checked,
                      }))
                    }
                    className="w-4 h-4 text-burgundy rounded border-stone-300 focus:ring-burgundy"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-semibold text-stone-800">
                      Artisanal Paper Grain Texture
                    </h4>
                    <p className="text-[11px] text-stone-500">
                      Organic paper fiber noise on canvas
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={design.paperTextureOverlay}
                    onChange={(e) =>
                      setDesign((prev) => ({
                        ...prev,
                        paperTextureOverlay: e.target.checked,
                      }))
                    }
                    className="w-4 h-4 text-burgundy rounded border-stone-300 focus:ring-burgundy"
                  />
                </div>
              </div>

              {/* Postal Postmark Stamp */}
              <div className="pt-4 border-t border-stone-200">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
                  Postal Cancellation Postmark
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { city: "PARIS", label: "Paris R.P." },
                    { city: "LONDON", label: "London Post" },
                    { city: "NEW YORK", label: "New York" },
                    { city: "FIRENZE", label: "Firenze" },
                    { city: "KYOTO", label: "Kyoto" },
                    { city: "", label: "No Postmark" },
                  ].map((p) => (
                    <button
                      key={p.label}
                      onClick={() =>
                        setDesign((prev) => ({
                          ...prev,
                          postmarkCity: p.city || undefined,
                        }))
                      }
                      className={`py-1.5 px-2 text-xs rounded-lg border text-center transition-all ${
                        design.postmarkCity === p.city || (!design.postmarkCity && p.city === "")
                          ? "border-burgundy bg-burgundy/10 text-burgundy font-medium"
                          : "border-stone-200 bg-white hover:bg-stone-50 text-stone-700"
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MESSAGE CONTENT */}
          {activeTab === "text" && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-stone-700 block mb-1">
                    To (Recipient Name)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Eleanor"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-burgundy/30"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-stone-700 block mb-1">
                    From (Sender Name)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Arthur"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-burgundy/30"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-stone-700 block mb-1">
                    Date
                  </label>
                  <input
                    type="text"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-burgundy/30"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-stone-700 block mb-1">
                    Letter Title (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Across the Miles"
                    value={letterTitle}
                    onChange={(e) => setLetterTitle(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-burgundy/30"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-stone-700 block mb-1">
                  Salutation
                </label>
                <input
                  type="text"
                  placeholder="e.g. My Dearest Eleanor,"
                  value={salutation}
                  onChange={(e) => setSalutation(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-burgundy/30 font-serif"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-medium text-stone-700">
                    Letter Body (Your Personal Message)
                  </label>
                  <span className="text-[11px] text-stone-400">
                    {body.length} characters
                  </span>
                </div>
                <textarea
                  rows={8}
                  placeholder="Pour your heart onto the page..."
                  value={body}
                  onChange={handleBodyChange}
                  className="w-full px-3 py-2 text-sm bg-white rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-burgundy/30 leading-relaxed font-serif resize-y"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-stone-700 block mb-1">
                    Closing
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Forever yours,"
                    value={closing}
                    onChange={(e) => setClosing(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-burgundy/30 font-serif"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-stone-700 block mb-1">
                    Signature Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Arthur"
                    value={signatureName}
                    onChange={(e) => setSignatureName(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-burgundy/30"
                  />
                </div>
              </div>

              {/* Signature Style + Draw Signature CTA */}
              <div className="pt-2">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-medium text-stone-700">
                    Signature Style
                  </label>
                  <button
                    onClick={() => setIsSignatureModalOpen(true)}
                    className="flex items-center gap-1 text-xs text-burgundy hover:text-burgundy-dark font-medium"
                  >
                    <PenTool className="w-3.5 h-3.5" />
                    <span>Draw with Pen</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: "signature", label: "Cursive Signature", font: "font-signature" },
                    { id: "script", label: "Casual Script", font: "font-script" },
                    { id: "handwriting", label: "Artistic Flow", font: "font-handwriting" },
                    { id: "typewriter", label: "Typewriter Print", font: "font-typewriter" },
                  ].map((s) => (
                    <button
                      key={s.id}
                      onClick={() => {
                        setSignatureStyle(s.id as any);
                        setCustomSignatureUrl(undefined);
                      }}
                      className={`p-2 rounded-lg border text-left transition-all ${
                        signatureStyle === s.id && !customSignatureUrl
                          ? "border-burgundy bg-burgundy/10 text-burgundy font-medium"
                          : "border-stone-200 bg-white hover:bg-stone-50 text-stone-700"
                      }`}
                    >
                      <span className="text-[11px] block opacity-70">{s.label}</span>
                      <span className={`text-base ${s.font}`}>
                        {signatureName || "Your Signature"}
                      </span>
                    </button>
                  ))}
                </div>

                {customSignatureUrl && (
                  <div className="mt-2 p-2 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-between">
                    <span className="text-xs text-amber-900 font-medium">
                      Using drawn handwritten ink signature
                    </span>
                    <button
                      onClick={() => setIsSignatureModalOpen(true)}
                      className="text-xs text-amber-800 underline hover:text-amber-950"
                    >
                      Edit
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: TYPOGRAPHY */}
          {activeTab === "typography" && (
            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-3">
                  Letter Font Family
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: "font-serif", name: "Cormorant Serif", desc: "Timeless antique elegance" },
                    { id: "font-display", name: "Playfair Display", desc: "Editorial luxury" },
                    { id: "font-handwriting", name: "Dancing Script", desc: "Romantic flow" },
                    { id: "font-script", name: "Caveat Script", desc: "Personal handwritten note" },
                    { id: "font-signature", name: "Sacramento", desc: "Delicate cursive" },
                    { id: "font-typewriter", name: "Courier Prime", desc: "Vintage typewriter" },
                    { id: "font-sans", name: "Modern Clean", desc: "Understated modern" },
                  ].map((f) => (
                    <button
                      key={f.id}
                      onClick={() =>
                        setDesign((prev) => ({
                          ...prev,
                          typography: {
                            ...prev.typography,
                            fontFamily: f.id as FontChoice,
                          },
                        }))
                      }
                      className={`p-2.5 rounded-lg border text-left transition-all ${
                        design.typography.fontFamily === f.id
                          ? "border-burgundy bg-burgundy/10 text-burgundy font-medium"
                          : "border-stone-200 bg-white hover:bg-stone-50 text-stone-700"
                      }`}
                    >
                      <div className={`text-sm ${f.id}`}>{f.name}</div>
                      <div className="text-[10px] text-stone-400 mt-0.5">{f.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Font Size & Line Height Sliders */}
              <div className="space-y-4 pt-4 border-t border-stone-200">
                <div>
                  <div className="flex justify-between text-xs text-stone-700 mb-1">
                    <span>Font Size</span>
                    <span>{design.typography.fontSize}px</span>
                  </div>
                  <input
                    type="range"
                    min="14"
                    max="26"
                    value={design.typography.fontSize}
                    onChange={(e) =>
                      setDesign((prev) => ({
                        ...prev,
                        typography: {
                          ...prev.typography,
                          fontSize: Number(e.target.value),
                        },
                      }))
                    }
                    className="w-full accent-burgundy"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs text-stone-700 mb-1">
                    <span>Line Height</span>
                    <span>{design.typography.lineHeight}</span>
                  </div>
                  <input
                    type="range"
                    min="1.4"
                    max="2.4"
                    step="0.1"
                    value={design.typography.lineHeight}
                    onChange={(e) =>
                      setDesign((prev) => ({
                        ...prev,
                        typography: {
                          ...prev.typography,
                          lineHeight: Number(e.target.value),
                        },
                      }))
                    }
                    className="w-full accent-burgundy"
                  />
                </div>
              </div>

              {/* Text Alignment */}
              <div className="pt-4 border-t border-stone-200">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
                  Text Alignment
                </h4>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { id: "left", label: "Left" },
                    { id: "center", label: "Center" },
                    { id: "right", label: "Right" },
                    { id: "justify", label: "Justify" },
                  ].map((align) => (
                    <button
                      key={align.id}
                      onClick={() =>
                        setDesign((prev) => ({
                          ...prev,
                          typography: {
                            ...prev.typography,
                            textAlign: align.id as any,
                          },
                        }))
                      }
                      className={`py-1.5 text-xs rounded-lg border text-center transition-all ${
                        design.typography.textAlign === align.id
                          ? "border-burgundy bg-burgundy/10 text-burgundy font-medium"
                          : "border-stone-200 bg-white hover:bg-stone-50 text-stone-700"
                      }`}
                    >
                      {align.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Text Ink Color */}
              <div className="pt-4 border-t border-stone-200">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
                  Ink Color
                </h4>
                <div className="flex items-center gap-2 flex-wrap">
                  {[
                    { color: "#2B2621", label: "Antique Charcoal" },
                    { color: "#4A3525", label: "Warm Sepia" },
                    { color: "#5E2536", label: "Rose Burgundy" },
                    { color: "#263B2B", label: "Forest Green" },
                    { color: "#1E293B", label: "Deep Navy" },
                    { color: "#1F2328", label: "Minimal Black" },
                    { color: "#EAE5D9", label: "Celestial Cream" },
                  ].map((c) => (
                    <button
                      key={c.color}
                      onClick={() =>
                        setDesign((prev) => ({
                          ...prev,
                          typography: {
                            ...prev.typography,
                            textColor: c.color,
                          },
                        }))
                      }
                      style={{ backgroundColor: c.color }}
                      title={c.label}
                      className={`w-8 h-8 rounded-full border-2 transition-transform ${
                        design.typography.textColor === c.color
                          ? "scale-110 border-amber-600 shadow-md ring-2 ring-amber-400/50"
                          : "border-white hover:scale-105"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: STICKERS & GRAPHICS */}
          {activeTab === "stickers" && (
            <div className="space-y-4">
              <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
                <h4 className="text-xs font-semibold text-amber-900 mb-1">
                  Artistic Illustrations & Stickers
                </h4>
                <p className="text-xs text-amber-800 leading-relaxed">
                  Add vintage stamps, washi tape, pressed flowers, butterflies, or your own photos to the letter canvas.
                </p>
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => setIsAssetModalOpen(true)}
                    className="flex-1 py-2 px-3 bg-amber-800 hover:bg-amber-900 text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    Browse Asset Library
                  </button>
                </div>
              </div>

              {/* Placed Stickers List */}
              <div className="pt-2">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                    Placed Stickers ({design.placedStickers.length})
                  </h4>
                  {design.placedStickers.length > 0 && (
                    <button
                      onClick={() =>
                        setDesign((prev) => ({ ...prev, placedStickers: [] }))
                      }
                      className="text-[11px] text-rose-600 hover:underline"
                    >
                      Clear All
                    </button>
                  )}
                </div>

                {design.placedStickers.length === 0 ? (
                  <div className="text-center py-8 text-stone-400 text-xs">
                    No stickers placed yet. Click above to browse!
                  </div>
                ) : (
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {design.placedStickers.map((stk) => (
                      <div
                        key={stk.id}
                        onClick={() => setSelectedStickerId(stk.id)}
                        className={`p-2 rounded-lg border flex items-center justify-between text-xs cursor-pointer transition-all ${
                          selectedStickerId === stk.id
                            ? "bg-burgundy/10 border-burgundy font-medium text-burgundy"
                            : "bg-white border-stone-200 hover:bg-stone-50 text-stone-700"
                        }`}
                      >
                        <span className="truncate max-w-[200px]">{stk.name}</span>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteSticker(stk.id);
                            }}
                            className="p-1 hover:text-rose-600 text-stone-400"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 5: ENVELOPE & WAX SEAL */}
          {activeTab === "envelope" && (
            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-3">
                  Envelope Exterior Color
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "kraft", label: "Vintage Kraft", color: "#C4A482" },
                    { id: "cream", label: "Classic Cream", color: "#FAF6EE" },
                    { id: "burgundy", label: "Deep Burgundy", color: "#5E1825" },
                    { id: "midnight", label: "Midnight Navy", color: "#1A2238" },
                    { id: "sage", label: "Botanical Sage", color: "#8A9A86" },
                    { id: "rose", label: "Dusty Rose", color: "#D4A5A5" },
                  ].map((env) => (
                    <button
                      key={env.id}
                      onClick={() =>
                        setDesign((prev) => ({
                          ...prev,
                          envelope: {
                            ...prev.envelope,
                            color: env.id as EnvelopeColorId,
                          },
                        }))
                      }
                      className={`p-2 rounded-lg border text-center transition-all flex flex-col items-center gap-1.5 ${
                        design.envelope.color === env.id
                          ? "border-burgundy ring-2 ring-burgundy/30 bg-burgundy/5 font-semibold text-burgundy"
                          : "border-stone-200 bg-white hover:bg-stone-50 text-stone-700"
                      }`}
                    >
                      <div
                        className="w-5 h-5 rounded-full border border-black/10 shadow-sm"
                        style={{ backgroundColor: env.color }}
                      />
                      <span className="text-[11px]">{env.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Wax Seal Customization */}
              <div className="pt-4 border-t border-stone-200">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-3">
                  Wax Seal Color & Emblem
                </h4>
                {/* Wax Color */}
                <div className="flex items-center gap-2 mb-4">
                  {[
                    { id: "burgundy", color: "#7A1C2E", label: "Burgundy" },
                    { id: "red", color: "#9B1B30", label: "Scarlet Red" },
                    { id: "gold", color: "#C59B27", label: "Gilded Gold" },
                    { id: "forest", color: "#2D5A43", label: "Forest Pine" },
                    { id: "navy", color: "#1B365D", label: "Royal Navy" },
                    { id: "blush", color: "#C87D85", label: "Blush Rose" },
                  ].map((w) => (
                    <button
                      key={w.id}
                      onClick={() => {
                        setDesign((prev) => ({
                          ...prev,
                          envelope: {
                            ...prev.envelope,
                            sealColor: w.id as WaxSealColor,
                          },
                        }));
                        soundEngine.playWaxSealStampSound();
                      }}
                      style={{ backgroundColor: w.color }}
                      title={w.label}
                      className={`w-7 h-7 rounded-full border-2 transition-transform ${
                        design.envelope.sealColor === w.id
                          ? "scale-110 border-white shadow-md ring-2 ring-burgundy/50"
                          : "border-white hover:scale-105"
                      }`}
                    />
                  ))}
                </div>

                {/* Wax Design Emblem */}
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "fleur", label: "Fleur-de-lis" },
                    { id: "heart", label: "Twin Hearts" },
                    { id: "monogram", label: "Monogram 'D'" },
                    { id: "tree", label: "Tree of Life" },
                    { id: "moon", label: "Crescent Moon" },
                    { id: "rose", label: "English Rose" },
                  ].map((emblem) => (
                    <button
                      key={emblem.id}
                      onClick={() => {
                        setDesign((prev) => ({
                          ...prev,
                          envelope: {
                            ...prev.envelope,
                            sealDesign: emblem.id as WaxSealDesign,
                          },
                        }));
                        soundEngine.playWaxSealStampSound();
                      }}
                      className={`p-2 rounded-lg border flex flex-col items-center gap-1 transition-all ${
                        design.envelope.sealDesign === emblem.id
                          ? "border-burgundy bg-burgundy/10 text-burgundy font-medium"
                          : "border-stone-200 bg-white hover:bg-stone-50 text-stone-700"
                      }`}
                    >
                      <WaxSeal
                        design={emblem.id as WaxSealDesign}
                        color={design.envelope.sealColor}
                        size={32}
                      />
                      <span className="text-[10px]">{emblem.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: ATMOSPHERE & MUSIC */}
          {activeTab === "atmosphere" && (
            <div className="space-y-6">
              {/* Particle Effects */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-3">
                  Visual Atmospheric Particles
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: "none", label: "None (Still Paper)" },
                    { id: "petals", label: "Falling Rose Petals" },
                    { id: "stars", label: "Golden Stardust" },
                    { id: "leaves", label: "Autumn Leaves" },
                    { id: "fireflies", label: "Twilight Fireflies" },
                  ].map((eff) => (
                    <button
                      key={eff.id}
                      onClick={() =>
                        setDesign((prev) => ({
                          ...prev,
                          atmosphere: {
                            ...prev.atmosphere,
                            effect: eff.id as AtmosphereEffect,
                          },
                        }))
                      }
                      className={`p-2.5 rounded-lg border text-left text-xs transition-all ${
                        design.atmosphere.effect === eff.id
                          ? "border-burgundy bg-burgundy/10 text-burgundy font-medium"
                          : "border-stone-200 bg-white hover:bg-stone-50 text-stone-700"
                      }`}
                    >
                      {eff.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Background Audio */}
              <div className="pt-4 border-t border-stone-200">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                      Receiver Ambient Soundtrack
                    </h4>
                    <p className="text-[11px] text-stone-400">
                      Soothing procedural audio that plays when envelope opens
                    </p>
                  </div>
                  <button
                    onClick={toggleAudioPreview}
                    className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center gap-1 text-xs"
                    title={isPlayingAudio ? "Stop Audio Preview" : "Listen to Track"}
                  >
                    {isPlayingAudio ? (
                      <>
                        <VolumeX className="w-3.5 h-3.5 text-rose-600" />
                        <span>Stop</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Listen</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: "none", label: "Silent (No Audio)" },
                    { id: "piano", label: "Gentle Piano Arpeggio" },
                    { id: "musicbox", label: "Vintage Music Box" },
                    { id: "rain", label: "Soothing Rain on Glass" },
                    { id: "acoustic", label: "Warm Acoustic Melody" },
                    { id: "lofi", label: "Nostalgic Lo-Fi Chords" },
                  ].map((track) => (
                    <button
                      key={track.id}
                      onClick={() => {
                        setDesign((prev) => ({
                          ...prev,
                          atmosphere: {
                            ...prev.atmosphere,
                            audioTrack: track.id as AudioTrackId,
                          },
                        }));
                        if (isPlayingAudio) {
                          soundEngine.playAtmosphere(track.id as AudioTrackId);
                        }
                      }}
                      className={`p-2.5 rounded-lg border text-left text-xs transition-all ${
                        design.atmosphere.audioTrack === track.id
                          ? "border-burgundy bg-burgundy/10 text-burgundy font-medium"
                          : "border-stone-200 bg-white hover:bg-stone-50 text-stone-700"
                      }`}
                    >
                      {track.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Generate Letter Button (Bottom Action Bar) */}
        <div className="p-4 bg-white border-t border-[#E3DFC9] shadow-inner">
          <button
            onClick={handleGenerateLetter}
            disabled={isSaving}
            className="w-full py-3.5 px-4 bg-burgundy hover:bg-burgundy-dark text-white rounded-xl font-serif text-base font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>{isSaving ? "Sealing Your Letter..." : "Generate My Letter & Get Link"}</span>
          </button>
        </div>
      </div>

      {/* RIGHT PANEL: Live Realistic Letter Canvas */}
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        {/* Canvas Toolbar */}
        <div className="p-3 bg-[#E4DDD1]/80 backdrop-blur-sm border-b border-[#D5CCC0] flex items-center justify-between px-6 z-10 sticky top-0">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-stone-600 hidden sm:inline">
              Canvas Controls:
            </span>
            {/* Viewport switch */}
            <div className="flex items-center bg-white/70 rounded-lg p-0.5 border border-stone-300/80">
              <button
                onClick={() => setPreviewDevice("desktop")}
                className={`p-1.5 rounded text-xs flex items-center gap-1 ${
                  previewDevice === "desktop"
                    ? "bg-stone-800 text-white shadow-sm"
                    : "text-stone-600 hover:text-stone-900"
                }`}
                title="Desktop View"
              >
                <Monitor className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setPreviewDevice("mobile")}
                className={`p-1.5 rounded text-xs flex items-center gap-1 ${
                  previewDevice === "mobile"
                    ? "bg-stone-800 text-white shadow-sm"
                    : "text-stone-600 hover:text-stone-900"
                }`}
                title="Mobile View"
              >
                <Smartphone className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Zoom controls */}
          <div className="flex items-center gap-1 bg-white/70 rounded-lg p-0.5 border border-stone-300/80">
            <button
              onClick={() => setZoomLevel((z) => Math.max(60, z - 10))}
              className="p-1.5 rounded text-stone-600 hover:text-stone-900"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] font-mono px-1.5 text-stone-700 min-w-[36px] text-center">
              {zoomLevel}%
            </span>
            <button
              onClick={() => setZoomLevel((z) => Math.min(140, z + 10))}
              className="p-1.5 rounded text-stone-600 hover:text-stone-900"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoomLevel(100)}
              className="p-1.5 rounded text-stone-600 hover:text-stone-900"
              title="Reset Zoom"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Canvas Display Viewport */}
        <div className="flex-1 flex items-center justify-center p-4 sm:p-8 lg:p-12 overflow-auto">
          <div
            style={{
              transform: `scale(${zoomLevel / 100})`,
              transformOrigin: "top center",
              transition: "transform 0.15s ease-out",
            }}
            className={`w-full transition-all duration-300 ${
              previewDevice === "mobile" ? "max-w-[420px]" : "max-w-[700px]"
            }`}
          >
            <PaperCanvas
              design={design}
              senderName={senderName}
              recipientName={recipientName}
              letterTitle={letterTitle}
              date={date}
              salutation={salutation}
              body={body}
              closing={closing}
              signatureName={signatureName}
              signatureStyle={signatureStyle}
              customSignatureUrl={customSignatureUrl}
              readOnly={isPreviewMode}
              selectedStickerId={selectedStickerId}
              onSelectSticker={setSelectedStickerId}
              onUpdateSticker={handleUpdateSticker}
              onDeleteSticker={handleDeleteSticker}
              onBringForward={handleBringForward}
              onSendBackward={handleSendBackward}
            />
          </div>
        </div>
      </div>

      {/* Asset Library Modal */}
      <AssetLibraryModal
        isOpen={isAssetModalOpen}
        onClose={() => setIsAssetModalOpen(false)}
        onSelectAsset={handleAddSticker}
      />

      {/* Signature Pad Modal */}
      <SignaturePadModal
        isOpen={isSignatureModalOpen}
        onClose={() => setIsSignatureModalOpen(false)}
        onSaveSignature={(signatureDataUrl) => {
          setCustomSignatureUrl(signatureDataUrl);
          setSignatureStyle("drawn");
        }}
      />

      {/* Generated Letter Share Modal */}
      <ShareLetterModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        letter={savedLetter}
      />
    </div>
  );
}
