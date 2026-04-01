import express from "express";
import { analyzeSymptoms, getHistory } from "../controllers/analyzeController.js";

const router = express.Router();

router.post("/analyze", analyzeSymptoms);
router.get("/history", getHistory);

export default router;