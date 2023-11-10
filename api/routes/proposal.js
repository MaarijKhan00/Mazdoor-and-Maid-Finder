import express from "express";
import { addProposals, singleProposals } from "../controllers/proposal.js";
const router = express.Router();

router.get("/", singleProposals);
router.post("/", addProposals);

export default router;
