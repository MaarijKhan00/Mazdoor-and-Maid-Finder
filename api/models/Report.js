import mongoose from "mongoose";
import { Schema } from "mongoose";
const userReport = new Schema(
  {
    message: {
      type: String,
      require: true,
    },
    buyerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    labor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    response: {
      type: String,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Report = mongoose.model("Report", userReport);
export default Report;
