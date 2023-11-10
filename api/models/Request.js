import mongoose from "mongoose";
import { Schema } from "mongoose";
const userRequest = new Schema(
  {
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    rateType: {
      type: String,
      require: true,
    },
    price: {
      type: String,
      require: true,
    },
    city: {
      type: String,
      require: true,
    },
    category: {
      type: String,
      require: true,
    },
    buyerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    user: [
      {
        type: String,
      },
    ],
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Request = mongoose.model("Request", userRequest);
export default Request;
