export type FontChoice =
  | "font-serif"
  | "font-display"
  | "font-script"
  | "font-handwriting"
  | "font-signature"
  | "font-typewriter"
  | "font-sans";

export type PaperTextureId =
  | "vintage-parchment"
  | "minimal-white"
  | "floral-stationery"
  | "romantic-pink"
  | "classic-ruled"
  | "dark-aesthetic"
  | "scrapbook-style"
  | "handmade-paper";

export type AtmosphereEffect = "none" | "petals" | "stars" | "leaves" | "fireflies";

export type AudioTrackId = "none" | "piano" | "musicbox" | "rain" | "acoustic" | "lofi";

export type WaxSealColor = "burgundy" | "red" | "gold" | "forest" | "navy" | "blush";
export type WaxSealDesign = "fleur" | "heart" | "monogram" | "tree" | "moon" | "rose";

export type EnvelopeColorId =
  | "kraft"
  | "cream"
  | "burgundy"
  | "midnight"
  | "sage"
  | "rose";

export interface PlacedSticker {
  id: string;
  assetId: string;
  name: string;
  category: string;
  src: string;
  type: "svg" | "image" | "custom";
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  zIndex: number;
  opacity?: number;
  caption?: string;
}

export interface TypographyConfig {
  fontFamily: FontChoice;
  fontSize: number;
  lineHeight: number;
  letterSpacing: number;
  textAlign: "left" | "center" | "right" | "justify";
  textColor: string;
}

export interface EnvelopeConfig {
  color: EnvelopeColorId;
  sealColor: WaxSealColor;
  sealDesign: WaxSealDesign;
  stampDesign: string;
  recipientCalligraphyFont: FontChoice;
}

export interface AtmosphereConfig {
  effect: AtmosphereEffect;
  audioTrack: AudioTrackId;
}

export interface LetterDesignConfig {
  templateId: PaperTextureId;
  paperColor: string;
  paperTextureOverlay: boolean;
  paperCreases?: boolean;
  borderStyle: "none" | "vintage-double" | "ornate-gold" | "post-border" | "deckle" | "dashed";
  typography: TypographyConfig;
  envelope: EnvelopeConfig;
  atmosphere: AtmosphereConfig;
  placedStickers: PlacedSticker[];
  postmarkCity?: string;
  postmarkDate?: string;
}

export interface LetterData {
  id: string;
  slug: string;
  secretKey: string;
  senderName: string;
  recipientName: string;
  letterTitle?: string;
  date: string;
  salutation: string;
  body: string;
  closing: string;
  signatureName: string;
  signatureStyle: "script" | "signature" | "handwriting" | "typewriter" | "drawn";
  customSignatureUrl?: string;
  
  design: LetterDesignConfig;

  // Metadata
  createdAt: string;
  expiresAt?: string | null;
  isPublished: boolean;
  isRead: boolean;
  readAt?: string | null;
  readCount?: number;
  password?: string | null;
  allowReply?: boolean;
}
