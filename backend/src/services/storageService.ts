import fs from "fs";
import path from "path";
import { nanoid } from "nanoid";
import { LetterData } from "../types/letter.js";

const DATA_DIR = path.join(process.cwd(), "data");
const LETTERS_FILE = path.join(DATA_DIR, "letters.json");

function ensureDataDir(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(LETTERS_FILE)) {
    const seedLetters = createSeedLetters();
    fs.writeFileSync(LETTERS_FILE, JSON.stringify(seedLetters, null, 2), "utf-8");
  }
}

function createSeedLetters(): LetterData[] {
  return [
    {
      id: "seed-letter-1",
      slug: "eleanor-keepsake",
      secretKey: "sec_seed_eleanor_9988",
      senderName: "Arthur",
      recipientName: "Eleanor",
      letterTitle: "A Letter Across the Distance",
      date: "November 24, 2026",
      salutation: "My Dearest Eleanor,",
      body: "I sat down tonight as the rain softened against the glass, and found myself tracing all the quiet ways you have shaped my days.\n\nSome feelings resist being hurried through a glowing screen. They require the patience of pen and paper, the deliberate slowing of breath, and the courage to say what we usually leave unspoken.\n\nThank you for being the calm harbor in every storm, and the laughter that always finds its way back to me.",
      closing: "Forever and always yours,",
      signatureName: "Arthur Pendelton",
      signatureStyle: "signature",
      design: {
        templateId: "vintage-parchment",
        paperColor: "#F5EAD6",
        paperTextureOverlay: true,
        paperCreases: true,
        postmarkCity: "PARIS",
        postmarkDate: "NOV 24 1928",
        borderStyle: "vintage-double",
        typography: {
          fontFamily: "font-serif",
          fontSize: 18,
          lineHeight: 1.8,
          letterSpacing: 0,
          textAlign: "left",
          textColor: "#3A2A1E",
        },
        envelope: {
          color: "kraft",
          sealColor: "burgundy",
          sealDesign: "fleur",
          stampDesign: "/assets/graphics/stamp-paris-airmail.svg",
          recipientCalligraphyFont: "font-handwriting",
        },
        atmosphere: {
          effect: "petals",
          audioTrack: "piano",
        },
        placedStickers: [
          {
            id: "st-1",
            assetId: "stamp-paris-airmail",
            name: "Paris Airmail 25¢ Stamp",
            category: "stamps",
            src: "/assets/graphics/stamp-paris-airmail.svg",
            type: "image",
            x: 74,
            y: 4,
            width: 115,
            height: 85,
            rotation: 4,
            zIndex: 5,
          },
          {
            id: "st-2",
            assetId: "tape-kraft-brown",
            name: "Torn Kraft Paper Washi",
            category: "tape",
            src: "/assets/graphics/tape-kraft-brown.svg",
            type: "image",
            x: 70,
            y: 2,
            width: 110,
            height: 32,
            rotation: -2,
            zIndex: 6,
          },
          {
            id: "st-3",
            assetId: "botanical-wild-rose",
            name: "English Heirloom Rose",
            category: "botanical",
            src: "/assets/graphics/botanical-wild-rose.svg",
            type: "image",
            x: 4,
            y: 65,
            width: 95,
            height: 125,
            rotation: -6,
            zIndex: 4,
          },
          {
            id: "st-4",
            assetId: "doodle-coffee-ring",
            name: "Dried Coffee Cup Ring Stain",
            category: "doodles",
            src: "/assets/graphics/doodle-coffee-ring.svg",
            type: "image",
            x: 65,
            y: 72,
            width: 105,
            height: 105,
            rotation: 15,
            zIndex: 2,
            opacity: 0.35,
          },
        ],
      },
      createdAt: new Date().toISOString(),
      expiresAt: null,
      isPublished: true,
      isRead: false,
      readCount: 0,
      allowReply: true,
    },
    {
      id: "seed-letter-2",
      slug: "my-heart-beats",
      secretKey: "sec_seed_romantic_7766",
      senderName: "Julian",
      recipientName: "Sophia",
      letterTitle: "To the One Who Holds My Heart",
      date: "November 24, 2026",
      salutation: "To My Dearest Love,",
      body: "There are memories with you that feel like morning light on fresh linen — bright, gentle, and utterly impossible to forget.\n\nEvery time I look at you, I am reminded that the best things in this life are not planned. They are stumbled into, cherished, and kept close like sacred secrets.\n\nYou are my favorite chapter, and every page with you is a gift.",
      closing: "With all my love,",
      signatureName: "Julian",
      signatureStyle: "script",
      design: {
        templateId: "romantic-pink",
        paperColor: "#FDF2F4",
        paperTextureOverlay: true,
        paperCreases: true,
        postmarkCity: "FIRENZE",
        postmarkDate: "NOV 24 1928",
        borderStyle: "none",
        typography: {
          fontFamily: "font-handwriting",
          fontSize: 19,
          lineHeight: 1.9,
          letterSpacing: 0.5,
          textAlign: "left",
          textColor: "#5E2536",
        },
        envelope: {
          color: "rose",
          sealColor: "red",
          sealDesign: "heart",
          stampDesign: "/assets/graphics/stamp-paris-airmail.svg",
          recipientCalligraphyFont: "font-signature",
        },
        atmosphere: {
          effect: "petals",
          audioTrack: "piano",
        },
        placedStickers: [
          {
            id: "st-pink-1",
            assetId: "botanical-wild-rose",
            name: "English Heirloom Rose",
            category: "botanical",
            src: "/assets/graphics/botanical-wild-rose.svg",
            type: "image",
            x: 70,
            y: 5,
            width: 110,
            height: 140,
            rotation: 6,
            zIndex: 4,
          },
          {
            id: "st-pink-2",
            assetId: "tape-rose-floral",
            name: "Blush Rose Pattern Washi",
            category: "tape",
            src: "/assets/graphics/tape-rose-floral.svg",
            type: "image",
            x: 66,
            y: 3,
            width: 120,
            height: 35,
            rotation: -3,
            zIndex: 5,
          },
          {
            id: "st-pink-3",
            assetId: "doodle-calligraphic-heart",
            name: "Calligraphic Ink Heart",
            category: "doodles",
            src: "/assets/graphics/doodle-calligraphic-heart.svg",
            type: "image",
            x: 6,
            y: 76,
            width: 65,
            height: 65,
            rotation: -8,
            zIndex: 4,
          },
        ],
      },
      createdAt: new Date().toISOString(),
      expiresAt: null,
      isPublished: true,
      isRead: false,
      readCount: 0,
      allowReply: true,
    },
  ];
}

function readLettersFromDisk(): LetterData[] {
  ensureDataDir();
  try {
    const raw = fs.readFileSync(LETTERS_FILE, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error reading letters from disk:", err);
    return [];
  }
}

function writeLettersToDisk(letters: LetterData[]): void {
  ensureDataDir();
  fs.writeFileSync(LETTERS_FILE, JSON.stringify(letters, null, 2), "utf-8");
}

export async function getAllLetters(): Promise<LetterData[]> {
  return readLettersFromDisk();
}

export async function getLetterBySlug(slug: string): Promise<LetterData | null> {
  const letters = readLettersFromDisk();
  const letter = letters.find((l) => l.slug.toLowerCase() === slug.toLowerCase());
  if (!letter) return null;

  if (letter.expiresAt) {
    const expiry = new Date(letter.expiresAt).getTime();
    if (Date.now() > expiry) {
      return null;
    }
  }

  return letter;
}

export async function getLetterBySecretKey(secretKey: string): Promise<LetterData | null> {
  const letters = readLettersFromDisk();
  return letters.find((l) => l.secretKey === secretKey) || null;
}

export async function saveLetter(data: Partial<LetterData>): Promise<LetterData> {
  const letters = readLettersFromDisk();

  if (data.secretKey) {
    const existingIndex = letters.findIndex((l) => l.secretKey === data.secretKey);
    if (existingIndex >= 0) {
      const updated: LetterData = {
        ...letters[existingIndex],
        ...data,
      };
      letters[existingIndex] = updated;
      writeLettersToDisk(letters);
      return updated;
    }
  }

  const uniqueSlug = data.slug || nanoid(8).toLowerCase();
  const secretKey = `sec_${nanoid(16)}`;
  const id = `ltr_${nanoid(12)}`;

  const newLetter: LetterData = {
    id,
    slug: uniqueSlug,
    secretKey,
    senderName: data.senderName || "An Admirer",
    recipientName: data.recipientName || "My Dear",
    letterTitle: data.letterTitle || "A Letter for You",
    date: data.date || new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    salutation: data.salutation || "Dearest,",
    body: data.body || "",
    closing: data.closing || "Warmly,",
    signatureName: data.signatureName || data.senderName || "",
    signatureStyle: data.signatureStyle || "signature",
    customSignatureUrl: data.customSignatureUrl,
    design: data.design!,
    createdAt: new Date().toISOString(),
    expiresAt: data.expiresAt || null,
    isPublished: true,
    isRead: false,
    readCount: 0,
    password: data.password || null,
    allowReply: data.allowReply ?? true,
  };

  letters.unshift(newLetter);
  writeLettersToDisk(letters);
  return newLetter;
}

export async function markLetterAsRead(slug: string): Promise<boolean> {
  const letters = readLettersFromDisk();
  const idx = letters.findIndex((l) => l.slug.toLowerCase() === slug.toLowerCase());
  if (idx < 0) return false;

  letters[idx].isRead = true;
  letters[idx].readAt = letters[idx].readAt || new Date().toISOString();
  letters[idx].readCount = (letters[idx].readCount || 0) + 1;

  writeLettersToDisk(letters);
  return true;
}

export async function deleteLetterBySecret(secretKey: string): Promise<boolean> {
  const letters = readLettersFromDisk();
  const filtered = letters.filter((l) => l.secretKey !== secretKey);
  if (filtered.length === letters.length) {
    return false;
  }
  writeLettersToDisk(filtered);
  return true;
}
