import express from "express";
import { addFeedback, allFeedback } from "../controllers/feedback.js";
const router = express.Router();

router.get("/", allFeedback);
router.post("/", addFeedback);

export default router;
