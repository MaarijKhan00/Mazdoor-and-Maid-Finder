import express from "express";
import {
  addRequest,
  allRequest,
  singleRequest,
  updateRequest,
} from "../controllers/request.js";
const router = express.Router();

router.get("/request", allRequest);
router.get("/request/:user", singleRequest);
router.post("/request", addRequest);
router.patch("/request/:id", updateRequest);

export default router;
