import express from "express";
import { addOrder, allOrder, updateOrder } from "../controllers/order.js";
const router = express.Router();

router.get("/", allOrder);
router.post("/", addOrder);
router.patch("/:id", updateOrder);

export default router;
