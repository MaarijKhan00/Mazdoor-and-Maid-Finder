import mongoose from "mongoose";
import { Schema } from "mongoose";
const order = new Schema(
  {
    labor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    buyerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    price: {
      type: String,
      require: true,
    },
    reqId: {
      type: String,
    },
    status: {
      type: String,
      require: true,
    },
    laborstatus: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Orders = mongoose.model("Order", order);
export default Orders;
