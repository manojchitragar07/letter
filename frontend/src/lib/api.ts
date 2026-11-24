import { LetterData } from "@/types/letter";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  (typeof window === "undefined" ? "http://localhost:5001" : "");

export async function fetchLetterBySlug(slug: string): Promise<LetterData | null> {
  try {
    const url = `${BACKEND_URL}/api/letters/${slug}`;
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return null;
    const data = await res.json();
    return data.letter || null;
  } catch (err) {
    console.error("API error fetching letter:", err);
    return null;
  }
}

export async function fetchAllPublicLetters(): Promise<LetterData[]> {
  try {
    const url = `${BACKEND_URL}/api/letters`;
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    return data.letters || [];
  } catch (err) {
    console.error("API error fetching letters:", err);
    return [];
  }
}
