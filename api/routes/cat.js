import express from "express";
import {
  addCategory,
  allCategory,
  deleteCategory,
} from "../controllers/category.js";
const router = express.Router();

router.get("/", allCategory);
router.post("/", addCategory);
router.delete("/:id", deleteCategory);

export default router;
