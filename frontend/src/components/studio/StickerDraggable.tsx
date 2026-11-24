"use client";

import React, { useState, useRef, useEffect } from "react";
import { PlacedSticker } from "@/types/letter";
import { SvgSticker } from "@/components/stickers/SvgStickers";
import { Trash2, RotateCw, ArrowUp, ArrowDown, Maximize2 } from "lucide-react";

interface StickerDraggableProps {
  sticker: PlacedSticker;
  isSelected?: boolean;
  readOnly?: boolean;
  onSelect?: () => void;
  onUpdate?: (updated: Partial<PlacedSticker>) => void;
  onDelete?: () => void;
  onBringForward?: () => void;
  onSendBackward?: () => void;
  canvasRef: React.RefObject<HTMLDivElement>;
}

export function StickerDraggable({
  sticker,
  isSelected = false,
  readOnly = false,
  onSelect,
  onUpdate,
  onDelete,
  onBringForward,
  onSendBackward,
  canvasRef,
}: StickerDraggableProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [isRotating, setIsRotating] = useState(false);

  const startDragPos = useRef<{ mouseX: number; mouseY: number; initialX: number; initialY: number }>({
    mouseX: 0,
    mouseY: 0,
    initialX: 0,
    initialY: 0,
  });

  const startResizeData = useRef<{ mouseX: number; mouseY: number; initialWidth: number; initialHeight: number }>({
    mouseX: 0,
    mouseY: 0,
    initialWidth: 0,
    initialHeight: 0,
  });

  const startRotateData = useRef<{ mouseX: number; mouseY: number; initialAngle: number; centerX: number; centerY: number }>({
    mouseX: 0,
    mouseY: 0,
    initialAngle: 0,
    centerX: 0,
    centerY: 0,
  });

  const stickerRef = useRef<HTMLDivElement>(null);

  // Mouse drag handler
  const handleMouseDown = (e: React.MouseEvent) => {
    if (readOnly) return;
    e.stopPropagation();
    onSelect?.();

    setIsDragging(true);
    startDragPos.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      initialX: sticker.x,
      initialY: sticker.y,
    };
  };

  // Resize handler
  const handleResizeStart = (e: React.MouseEvent) => {
    if (readOnly) return;
    e.stopPropagation();
    setIsResizing(true);
    startResizeData.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      initialWidth: sticker.width,
      initialHeight: sticker.height,
    };
  };

  // Rotate handler
  const handleRotateStart = (e: React.MouseEvent) => {
    if (readOnly) return;
    e.stopPropagation();
    setIsRotating(true);

    if (stickerRef.current) {
      const rect = stickerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const rad = Math.atan2(e.clientY - centerY, e.clientX - centerX);
      const deg = rad * (180 / Math.PI);
      startRotateData.current = {
        mouseX: e.clientX,
        mouseY: e.clientY,
        initialAngle: sticker.rotation,
        centerX,
        centerY,
      };
    }
  };

  // Global mousemove & mouseup
  useEffect(() => {
    if (!isDragging && !isResizing && !isRotating) return;

    const handleMouseMove = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const canvasRect = canvas.getBoundingClientRect();

      if (isDragging) {
        const deltaX = ((e.clientX - startDragPos.current.mouseX) / canvasRect.width) * 100;
        const deltaY = ((e.clientY - startDragPos.current.mouseY) / canvasRect.height) * 100;
        const newX = Math.max(-10, Math.min(95, startDragPos.current.initialX + deltaX));
        const newY = Math.max(-10, Math.min(95, startDragPos.current.initialY + deltaY));
        onUpdate?.({ x: Math.round(newX * 10) / 10, y: Math.round(newY * 10) / 10 });
      }

      if (isResizing) {
        const deltaW = e.clientX - startResizeData.current.mouseX;
        const aspect = startResizeData.current.initialHeight / startResizeData.current.initialWidth;
        const newW = Math.max(40, Math.min(400, startResizeData.current.initialWidth + deltaW));
        const newH = Math.round(newW * aspect);
        onUpdate?.({ width: Math.round(newW), height: newH });
      }

      if (isRotating) {
        const { centerX, centerY } = startRotateData.current;
        const rad = Math.atan2(e.clientY - centerY, e.clientX - centerX);
        let deg = Math.round(rad * (180 / Math.PI));
        onUpdate?.({ rotation: deg });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
      setIsRotating(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, isResizing, isRotating, sticker, onUpdate, canvasRef]);

  const renderContent = () => {
    if (sticker.type === "svg" || sticker.src.startsWith("svg:")) {
      return <SvgSticker id={sticker.src} className="w-full h-full object-contain pointer-events-none" />;
    }

    return (
      <img
        src={sticker.src}
        alt={sticker.name}
        className="w-full h-full object-contain select-none pointer-events-none rounded shadow-sm"
        draggable={false}
      />
    );
  };

  return (
    <div
      ref={stickerRef}
      onMouseDown={handleMouseDown}
      style={{
        left: `${sticker.x}%`,
        top: `${sticker.y}%`,
        width: `${sticker.width}px`,
        height: `${sticker.height}px`,
        transform: `rotate(${sticker.rotation}deg)`,
        zIndex: sticker.zIndex,
        opacity: sticker.opacity ?? 1,
      }}
      className={`absolute select-none ${
        readOnly ? "pointer-events-none" : "cursor-move"
      } ${
        isSelected && !readOnly
          ? "ring-2 ring-burgundy/80 ring-offset-2 ring-offset-transparent shadow-lg rounded"
          : ""
      }`}
    >
      {renderContent()}

      {/* Editing Controls (Active only when selected in editor) */}
      {isSelected && !readOnly && (
        <>
          {/* Action toolbar floating above sticker */}
          <div
            onMouseDown={(e) => e.stopPropagation()}
            className="absolute -top-11 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-stone-900/90 backdrop-blur-md text-white px-2 py-1 rounded-full shadow-xl text-xs z-50 pointer-events-auto"
          >
            <button
              onClick={onBringForward}
              title="Bring Forward"
              className="p-1 hover:text-amber-300 transition-colors"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onSendBackward}
              title="Send Backward"
              className="p-1 hover:text-amber-300 transition-colors"
            >
              <ArrowDown className="w-3.5 h-3.5" />
            </button>
            <div className="w-[1px] h-3 bg-white/20 mx-0.5" />
            <button
              onClick={() => onUpdate?.({ rotation: (sticker.rotation + 15) % 360 })}
              title="Rotate +15°"
              className="p-1 hover:text-amber-300 transition-colors"
            >
              <RotateCw className="w-3.5 h-3.5" />
            </button>
            <div className="w-[1px] h-3 bg-white/20 mx-0.5" />
            <button
              onClick={onDelete}
              title="Remove sticker"
              className="p-1 hover:text-rose-400 text-rose-300 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Corner Resize Handle */}
          <div
            onMouseDown={handleResizeStart}
            title="Drag to resize"
            className="absolute -bottom-2 -right-2 w-5 h-5 bg-burgundy text-white rounded-full flex items-center justify-center cursor-se-resize shadow-md hover:scale-110 transition-transform pointer-events-auto z-50"
          >
            <Maximize2 className="w-3 h-3 transform rotate-90" />
          </div>

          {/* Rotation Handle */}
          <div
            onMouseDown={handleRotateStart}
            title="Drag to rotate"
            className="absolute -top-5 left-1/2 -translate-x-1/2 w-4 h-4 bg-amber-600 rounded-full cursor-grab active:cursor-grabbing shadow-md border-2 border-white pointer-events-auto z-50 hover:scale-110 transition-transform"
          />
        </>
      )}
    </div>
  );
}
