import express from "express";
import {
  addReport,
  allReport,
  singleReport,
  updateReport,
} from "../controllers/reports.js";
const router = express.Router();

router.get("/", allReport);
router.get("/:user", singleReport);
router.post("/", addReport);
router.patch("/:id", updateReport);
export default router;
