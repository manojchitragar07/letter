"use client";

import React, { useState } from "react";
import { GRAPHIC_ASSETS, ASSET_CATEGORIES } from "@/data/assets";
import { GraphicAsset, PlacedSticker } from "@/types/letter";
import { SvgSticker } from "@/components/stickers/SvgStickers";
import { soundEngine } from "@/lib/soundEngine";
import { X, Search, Upload, Sparkles, Image as ImageIcon } from "lucide-react";
import { nanoid } from "nanoid";

interface AssetLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAsset: (sticker: PlacedSticker) => void;
}

export function AssetLibraryModal({
  isOpen,
  onClose,
  onSelectAsset,
}: AssetLibraryModalProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [customAssets, setCustomAssets] = useState<GraphicAsset[]>([]);

  if (!isOpen) return null;

  const allAssets = [...customAssets, ...GRAPHIC_ASSETS];

  const filteredAssets = allAssets.filter((asset) => {
    const matchesCategory =
      selectedCategory === "all" || asset.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleAssetClick = (asset: GraphicAsset) => {
    soundEngine.playStickerPlaceSound();

    const newPlacedSticker: PlacedSticker = {
      id: `stk_${nanoid(8)}`,
      assetId: asset.id,
      name: asset.name,
      category: asset.category,
      src: asset.src,
      type: asset.type,
      x: 35 + (Math.random() * 20 - 10),
      y: 35 + (Math.random() * 20 - 10),
      width: asset.defaultWidth,
      height: asset.defaultHeight,
      rotation: Math.round(Math.random() * 16 - 8),
      zIndex: 10,
    };

    onSelectAsset(newPlacedSticker);
    onClose();
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        const uploadedAsset: GraphicAsset = {
          id: `custom_${nanoid(8)}`,
          name: file.name.replace(/\.[^/.]+$/, ""),
          category: "user_upload",
          src: data.url,
          type: "image",
          defaultWidth: 150,
          defaultHeight: 150,
          tags: ["custom", "upload", "photo"],
        };

        setCustomAssets((prev) => [uploadedAsset, ...prev]);
        setSelectedCategory("user_upload");
        handleAssetClick(uploadedAsset);
      } else {
        // Fallback to FileReader dataURL
        const reader = new FileReader();
        reader.onload = (event) => {
          const url = event.target?.result as string;
          const uploadedAsset: GraphicAsset = {
            id: `custom_${nanoid(8)}`,
            name: file.name.replace(/\.[^/.]+$/, ""),
            category: "user_upload",
            src: url,
            type: "image",
            defaultWidth: 150,
            defaultHeight: 150,
            tags: ["custom", "upload"],
          };
          setCustomAssets((prev) => [uploadedAsset, ...prev]);
          setSelectedCategory("user_upload");
          handleAssetClick(uploadedAsset);
        };
        reader.readAsDataURL(file);
      }
    } catch (err) {
      console.error("Upload error:", err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#FAF7F2] text-[#2B2621] w-full max-w-4xl max-h-[85vh] rounded-2xl shadow-2xl flex flex-col border border-[#E3DFC9] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-[#E3DFC9] flex items-center justify-between bg-white/60">
          <div>
            <h2 className="text-xl font-serif font-bold text-[#3B2D22] flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-700" />
              Artistic Stickers & Graphics Library
            </h2>
            <p className="text-xs text-stone-600 mt-1">
              Select an illustration, vintage stamp, washi tape, or upload your own photo to place on the letter.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-stone-200/70 transition-colors text-stone-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Upload Action Bar */}
        <div className="p-4 bg-stone-100/70 border-b border-[#E3DFC9] flex flex-wrap items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1 min-w-[220px]">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search roses, stamps, washi tape, butterflies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-white rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-700/50"
            />
          </div>

          {/* Upload Button */}
          <label className="flex items-center gap-2 px-4 py-2 bg-amber-800 hover:bg-amber-900 text-white text-sm font-medium rounded-lg cursor-pointer transition-colors shadow-sm">
            <Upload className="w-4 h-4" />
            <span>{isUploading ? "Uploading..." : "Upload Your Image"}</span>
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp,image/svg+xml"
              onChange={handleFileUpload}
              className="hidden"
              disabled={isUploading}
            />
          </label>
        </div>

        {/* Categories Pills */}
        <div className="px-6 py-2.5 flex items-center gap-2 overflow-x-auto bg-white/40 border-b border-[#E3DFC9] scrollbar-thin">
          {ASSET_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1 text-xs rounded-full whitespace-nowrap transition-all font-medium ${
                selectedCategory === cat.id
                  ? "bg-[#3B2D22] text-white shadow-sm"
                  : "bg-stone-200/60 text-stone-700 hover:bg-stone-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Asset Grid */}
        <div className="p-6 overflow-y-auto flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredAssets.length === 0 ? (
            <div className="col-span-full py-16 text-center text-stone-500">
              <ImageIcon className="w-10 h-10 mx-auto text-stone-400 mb-2" />
              <p className="text-sm font-medium">No stickers found for &ldquo;{searchQuery}&rdquo;</p>
              <p className="text-xs text-stone-400 mt-1">Try another search term or upload your own image</p>
            </div>
          ) : (
            filteredAssets.map((asset) => (
              <div
                key={asset.id}
                onClick={() => handleAssetClick(asset)}
                className="group relative bg-white/80 hover:bg-white rounded-xl p-3 border border-stone-200/80 hover:border-amber-700/50 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col items-center justify-between text-center"
              >
                {/* Image / SVG preview */}
                <div className="w-full h-28 flex items-center justify-center overflow-hidden rounded p-2">
                  {asset.type === "svg" || asset.src.startsWith("svg:") ? (
                    <SvgSticker id={asset.src} className="w-full h-full max-h-24 object-contain transition-transform group-hover:scale-105" />
                  ) : (
                    <img
                      src={asset.src}
                      alt={asset.name}
                      className="w-full h-full object-contain rounded transition-transform group-hover:scale-105"
                    />
                  )}
                </div>

                <div className="mt-2 w-full">
                  <p className="text-xs font-medium text-stone-800 truncate" title={asset.name}>
                    {asset.name}
                  </p>
                  <span className="text-[10px] text-amber-800/80 uppercase font-serif tracking-wider">
                    {asset.category}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-100 border-t border-[#E3DFC9] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-sm text-stone-600 hover:text-stone-900 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
