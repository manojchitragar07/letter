"use client";

import React, { useRef } from "react";
import { LetterDesignConfig, PlacedSticker } from "@/types/letter";
import { StickerDraggable } from "./StickerDraggable";
import { PostalPostmark } from "@/components/stickers/PostalPostmark";

interface PaperCanvasProps {
  design: LetterDesignConfig;
  senderName: string;
  recipientName: string;
  letterTitle?: string;
  date: string;
  salutation: string;
  body: string;
  closing: string;
  signatureName: string;
  signatureStyle?: "script" | "signature" | "handwriting" | "typewriter" | "drawn";
  customSignatureUrl?: string;
  readOnly?: boolean;
  selectedStickerId?: string | null;
  onSelectSticker?: (id: string | null) => void;
  onUpdateSticker?: (id: string, updated: Partial<PlacedSticker>) => void;
  onDeleteSticker?: (id: string) => void;
  onBringForward?: (id: string) => void;
  onSendBackward?: (id: string) => void;
  onTextChange?: (field: "salutation" | "body" | "closing" | "signatureName" | "date" | "letterTitle", val: string) => void;
}

export function PaperCanvas({
  design,
  senderName,
  recipientName,
  letterTitle,
  date,
  salutation,
  body,
  closing,
  signatureName,
  signatureStyle = "signature",
  customSignatureUrl,
  readOnly = false,
  selectedStickerId = null,
  onSelectSticker,
  onUpdateSticker,
  onDeleteSticker,
  onBringForward,
  onSendBackward,
  onTextChange,
}: PaperCanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null);

  // Border classes based on borderStyle
  const getBorderClasses = () => {
    switch (design.borderStyle) {
      case "vintage-double":
        return "border-[6px] border-double border-[#A0886C]/50";
      case "ornate-gold":
        return "border-2 border-[#D4AF37]/60 shadow-[0_0_15px_rgba(212,175,55,0.15)]";
      case "post-border":
        return "border-4 border-dashed border-[#8B3A4A]/40";
      case "deckle":
        return "shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.08)] rounded-lg";
      case "dashed":
        return "border border-dashed border-[#8C7A65]/50";
      case "none":
      default:
        return "border border-black/5";
    }
  };

  const getSignatureFontClass = () => {
    switch (signatureStyle) {
      case "signature":
        return "font-signature";
      case "script":
        return "font-script";
      case "handwriting":
        return "font-handwriting";
      case "typewriter":
        return "font-typewriter";
      default:
        return "font-signature";
    }
  };

  return (
    <div
      ref={canvasRef}
      onClick={() => !readOnly && onSelectSticker?.(null)}
      style={{
        backgroundColor: design.paperColor,
        color: design.typography.textColor,
        minHeight: "820px",
      }}
      className={`relative w-full max-w-[680px] mx-auto p-10 md:p-14 shadow-2xl transition-all duration-300 overflow-hidden ${getBorderClasses()} ${
        design.templateId === "dark-aesthetic" ? "text-stone-100" : ""
      }`}
    >
      {/* Paper Texture Overlay */}
      {design.paperTextureOverlay && (
        <div
          className="absolute inset-0 pointer-events-none opacity-20 mix-blend-multiply"
          style={{
            backgroundImage: `radial-gradient(#88755E 0.75px, transparent 0.75px)`,
            backgroundSize: "16px 16px",
          }}
        />
      )}

      {/* Realistic Tri-Fold Horizontal Paper Creases */}
      {design.paperCreases !== false && (
        <>
          {/* Upper crease line (at 33% height) */}
          <div
            className="absolute left-0 right-0 top-[33%] h-[1px] pointer-events-none z-10"
            style={{
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.07) 0%, rgba(255,255,255,0.2) 100%)",
              boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
            }}
          />
          {/* Lower crease line (at 66% height) */}
          <div
            className="absolute left-0 right-0 top-[66%] h-[1px] pointer-events-none z-10"
            style={{
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.07) 0%, rgba(255,255,255,0.2) 100%)",
              boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
            }}
          />
        </>
      )}

      {/* Classic Ruled Notebook Lines */}
      {design.templateId === "classic-ruled" && (
        <div className="absolute inset-0 pointer-events-none">
          {/* Vertical Red Margin Line */}
          <div className="absolute top-0 bottom-0 left-16 md:left-20 w-[1.5px] bg-rose-400/60" />
          {/* Horizontal ruled blue lines */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "linear-gradient(to bottom, transparent 29px, rgba(140, 180, 220, 0.45) 30px)",
              backgroundSize: "100% 30px",
            }}
          />
        </div>
      )}

      {/* Postal Cancellation Postmark in Top Right */}
      {design.postmarkCity && (
        <div className="absolute top-4 right-10 w-44 z-10 pointer-events-none">
          <PostalPostmark
            city={design.postmarkCity}
            date={design.postmarkDate || date}
            inkColor={design.typography.textColor}
          />
        </div>
      )}

      {/* Ornate Gold Corner Accents */}
      {design.borderStyle === "ornate-gold" && (
        <>
          <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-[#D4AF37]/80 pointer-events-none" />
          <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-[#D4AF37]/80 pointer-events-none" />
          <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-[#D4AF37]/80 pointer-events-none" />
          <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-[#D4AF37]/80 pointer-events-none" />
        </>
      )}

      {/* Placed Stickers Layer */}
      {design.placedStickers.map((sticker) => (
        <StickerDraggable
          key={sticker.id}
          sticker={sticker}
          isSelected={selectedStickerId === sticker.id}
          readOnly={readOnly}
          canvasRef={canvasRef}
          onSelect={() => onSelectSticker?.(sticker.id)}
          onUpdate={(updated) => onUpdateSticker?.(sticker.id, updated)}
          onDelete={() => onDeleteSticker?.(sticker.id)}
          onBringForward={() => onBringForward?.(sticker.id)}
          onSendBackward={() => onSendBackward?.(sticker.id)}
        />
      ))}

      {/* Main Letter Content (Text Flow) */}
      <div
        className={`relative z-10 flex flex-col justify-between h-full ${design.typography.fontFamily}`}
        style={{
          fontSize: `${design.typography.fontSize}px`,
          lineHeight: design.typography.lineHeight,
          letterSpacing: `${design.typography.letterSpacing}px`,
          textAlign: design.typography.textAlign,
        }}
      >
        {/* Header: Date and optional Title */}
        <div className="mb-8">
          <div className="flex justify-between items-center text-xs md:text-sm tracking-wider opacity-75 mb-3 font-serif">
            {letterTitle ? (
              <span className="italic font-serif font-medium">{letterTitle}</span>
            ) : (
              <span />
            )}
            <span>{date}</span>
          </div>

          {/* Salutation */}
          <div className="font-semibold text-lg md:text-xl tracking-wide opacity-95">
            {salutation}
          </div>
        </div>

        {/* Letter Body */}
        <div className="flex-1 my-6 space-y-4 whitespace-pre-wrap font-normal leading-relaxed">
          {body || (
            <span className="opacity-40 italic">
              Write your feelings here. The words you write will stay with someone who matters...
            </span>
          )}
        </div>

        {/* Closing & Handwritten Signature */}
        <div className="mt-8 pt-4 flex flex-col items-end">
          <div className="opacity-85 text-base md:text-lg mb-2">{closing}</div>

          {/* If the sender drew their authentic signature with pen */}
          {signatureStyle === "drawn" && customSignatureUrl ? (
            <div className="max-w-[220px] h-16 flex items-center justify-end">
              <img
                src={customSignatureUrl}
                alt="Handwritten signature"
                className="max-h-full object-contain filter drop-shadow-sm select-none pointer-events-none transform -rotate-2"
              />
            </div>
          ) : (
            <div
              className={`text-3xl md:text-4xl text-right transform -rotate-2 origin-right ${getSignatureFontClass()}`}
              style={{
                color: design.typography.textColor,
                filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.08))",
              }}
            >
              {signatureName || senderName || "Your Admirer"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
