import { Router } from "express";
import {
  handleGetAllLetters,
  handleGetLetterBySlug,
  handleCreateLetter,
  handleMarkRead,
  handleGetManageLetter,
  handleUpdateManageLetter,
  handleDeleteManageLetter,
} from "../controllers/letterController.js";

const router = Router();

router.get("/", handleGetAllLetters);
router.post("/", handleCreateLetter);

router.get("/:slug", handleGetLetterBySlug);
router.post("/:slug/read", handleMarkRead);

router.get("/manage/:secretKey", handleGetManageLetter);
router.put("/manage/:secretKey", handleUpdateManageLetter);
router.delete("/manage/:secretKey", handleDeleteManageLetter);

export default router;
