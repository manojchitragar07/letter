import { Request, Response } from "express";

export function handleUploadFile(req: Request, res: Response) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const publicUrl = `/uploads/${req.file.filename}`;
    res.json({
      success: true,
      url: publicUrl,
      name: req.file.originalname,
      size: req.file.size,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to process upload" });
  }
}
