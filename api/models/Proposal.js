import mongoose from "mongoose";
import { Schema } from "mongoose";
const userProposals = new Schema(
  {
    description: {
      type: String,
      require: true,
    },
    price: {
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
    reqId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Request",
    },
  },
  { timestamps: true }
);

const Proposal = mongoose.model("Proposal", userProposals);
export default Proposal;
