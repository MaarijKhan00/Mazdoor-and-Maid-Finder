import mongoose from "mongoose";
import { Schema } from "mongoose";
const userSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    accountType: {
      type: String,
      require: true,
    },
    accountCategory: {
      type: String,
    },
    image: {
      type: String,
      require: true,
    },
    isAdmin: {
      type: String,
    },
    location: {
      type: Object,
    },
    status: {
      type: Boolean,
      default: true,
    },
    Request: [{ type: mongoose.Schema.Types.ObjectId, ref: "Request" }],
    Proposal: [{ type: mongoose.Schema.Types.ObjectId, ref: "Proposal" }],
    Order: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
    Feedback: [{ type: mongoose.Schema.Types.ObjectId, ref: "Feedback" }],
    Portfolio: [
      {
        desi: String,
        exp: String,
      },
    ],
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: String,
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
