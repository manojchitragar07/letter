"use client";

import React, { useRef, useState, useEffect } from "react";
import { soundEngine } from "@/lib/soundEngine";
import { X, RotateCcw, Check, PenTool, Sparkles } from "lucide-react";

interface SignaturePadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveSignature: (signatureDataUrl: string) => void;
}

export function SignaturePadModal({
  isOpen,
  onClose,
  onSaveSignature,
}: SignaturePadModalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [inkColor, setInkColor] = useState("#2B2621");
  const [penNib, setPenNib] = useState<number>(2.5);
  const [hasDrawn, setHasDrawn] = useState(false);
  const lastPoint = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        setHasDrawn(false);
      }, 50);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();

    if ("touches" in e) {
      const touch = e.touches[0];
      return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      };
    } else {
      return {
        x: (e as React.MouseEvent).clientX - rect.left,
        y: (e as React.MouseEvent).clientY - rect.top,
      };
    }
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    setHasDrawn(true);
    const coords = getCoordinates(e);
    lastPoint.current = coords;
    soundEngine.playPenScratchSound();
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || !lastPoint.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const currentPoint = getCoordinates(e);

    ctx.strokeStyle = inkColor;
    ctx.lineWidth = penNib;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctx.beginPath();
    ctx.moveTo(lastPoint.current.x, lastPoint.current.y);
    ctx.lineTo(currentPoint.x, currentPoint.y);
    ctx.stroke();

    lastPoint.current = currentPoint;
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    lastPoint.current = null;
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  };

  const handleSave = () => {
    const canvas = canvasRef.current;
    if (!canvas || !hasDrawn) return;
    const dataUrl = canvas.toDataURL("image/png");
    onSaveSignature(dataUrl);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#FAF7F2] text-[#2B2621] w-full max-w-lg rounded-2xl shadow-2xl border border-[#E3DFC9] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-[#E3DFC9] flex items-center justify-between bg-white/70">
          <div>
            <h3 className="font-serif font-bold text-stone-900 text-lg flex items-center gap-2">
              <PenTool className="w-4 h-4 text-burgundy" />
              Draw Your Signature
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Sign with your mouse, trackpad, or finger to stamp your authentic hand onto the letter.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-200/60 text-stone-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Ink Controls Bar */}
        <div className="px-5 py-3 bg-stone-100/70 border-b border-[#E3DFC9] flex items-center justify-between flex-wrap gap-3">
          {/* Ink color picker */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-500">
              Ink:
            </span>
            {[
              { color: "#2B2621", label: "Charcoal Black" },
              { color: "#4A3525", label: "Warm Sepia" },
              { color: "#6B1D2F", label: "Burgundy" },
              { color: "#1B365D", label: "Midnight Blue" },
            ].map((ink) => (
              <button
                key={ink.color}
                onClick={() => setInkColor(ink.color)}
                style={{ backgroundColor: ink.color }}
                title={ink.label}
                className={`w-6 h-6 rounded-full border-2 transition-transform ${
                  inkColor === ink.color
                    ? "scale-110 border-white ring-2 ring-burgundy shadow-sm"
                    : "border-white hover:scale-105"
                }`}
              />
            ))}
          </div>

          {/* Pen Nib selector */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-500">
              Nib:
            </span>
            {[
              { size: 1.8, label: "Fine" },
              { size: 2.8, label: "Medium" },
              { size: 4.2, label: "Broad" },
            ].map((nib) => (
              <button
                key={nib.label}
                onClick={() => setPenNib(nib.size)}
                className={`px-2.5 py-1 text-xs rounded border transition-colors ${
                  penNib === nib.size
                    ? "bg-stone-800 text-white font-medium border-stone-800"
                    : "bg-white text-stone-700 border-stone-300 hover:bg-stone-50"
                }`}
              >
                {nib.label}
              </button>
            ))}
          </div>
        </div>

        {/* Drawing Canvas Area */}
        <div className="p-6 flex flex-col items-center justify-center bg-[#FDFBF7]">
          <div className="relative border-2 border-dashed border-[#D9D2C5] rounded-xl overflow-hidden bg-[#FCFBF7] shadow-inner cursor-crosshair">
            <canvas
              ref={canvasRef}
              width={420}
              height={180}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              className="touch-none w-full h-[180px]"
            />
            {/* Subtle baseline line for signature placement */}
            <div className="absolute bottom-8 left-8 right-8 h-[1px] bg-stone-300/40 pointer-events-none" />
            <span className="absolute bottom-2 right-4 text-[10px] font-serif italic text-stone-400 pointer-events-none">
              Sign on the line
            </span>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 bg-stone-100 border-t border-[#E3DFC9] flex items-center justify-between">
          <button
            onClick={handleClear}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-stone-600 hover:text-stone-900 rounded-lg hover:bg-stone-200/60 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Clear Canvas</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs text-stone-600 hover:text-stone-900 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={!hasDrawn}
              className="px-5 py-2 bg-burgundy hover:bg-burgundy-dark text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-sm transition-all disabled:opacity-40"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Use This Signature</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
