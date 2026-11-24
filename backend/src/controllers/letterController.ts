import { Request, Response } from "express";
import {
  getAllLetters,
  getLetterBySlug,
  getLetterBySecretKey,
  saveLetter,
  markLetterAsRead,
  deleteLetterBySecret,
} from "../services/storageService.js";

export async function handleGetAllLetters(req: Request, res: Response) {
  try {
    const letters = await getAllLetters();
    const publicLetters = letters
      .filter((l) => l.isPublished && !l.password)
      .map(({ secretKey, password, ...rest }) => rest);
    res.json({ letters: publicLetters });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

export async function handleGetLetterBySlug(req: Request, res: Response) {
  try {
    const { slug } = req.params;
    const letter = await getLetterBySlug(slug);

    if (!letter) {
      return res.status(404).json({ error: "Letter not found or has expired" });
    }

    const { secretKey, password, ...safeLetter } = letter;
    res.json({ letter: safeLetter, hasPassword: Boolean(password) });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

export async function handleCreateLetter(req: Request, res: Response) {
  try {
    const body = req.body;
    if (!body.body && !body.letterTitle) {
      return res.status(400).json({ error: "Letter content is required" });
    }

    const saved = await saveLetter(body);
    res.json({ success: true, letter: saved });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to save letter" });
  }
}

export async function handleMarkRead(req: Request, res: Response) {
  try {
    const { slug } = req.params;
    const success = await markLetterAsRead(slug);
    res.json({ success });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

export async function handleGetManageLetter(req: Request, res: Response) {
  try {
    const { secretKey } = req.params;
    const letter = await getLetterBySecretKey(secretKey);

    if (!letter) {
      return res.status(404).json({ error: "Letter not found" });
    }

    res.json({ letter });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

export async function handleUpdateManageLetter(req: Request, res: Response) {
  try {
    const { secretKey } = req.params;
    const body = req.body;

    const existing = await getLetterBySecretKey(secretKey);
    if (!existing) {
      return res.status(404).json({ error: "Letter not found or unauthorized" });
    }

    const updated = await saveLetter({ ...existing, ...body, secretKey });
    res.json({ success: true, letter: updated });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

export async function handleDeleteManageLetter(req: Request, res: Response) {
  try {
    const { secretKey } = req.params;
    const deleted = await deleteLetterBySecret(secretKey);

    if (!deleted) {
      return res.status(404).json({ error: "Letter not found or already deleted" });
    }

    res.json({ success: true, message: "Letter deleted permanently" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}
