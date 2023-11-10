import mongoose from "mongoose";
import { Schema } from "mongoose";
const feedback = new Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    stars: {
      type: String,
      require: true,
    },
    feedback: {
      type: String,
    },
  },
  { timestamps: true }
);

const Feedback = mongoose.model("Feedback", feedback);
export default Feedback;
