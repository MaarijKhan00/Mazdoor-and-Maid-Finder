import mongoose from "mongoose";
import { Schema } from "mongoose";
const category = new Schema(
  {
    category: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", category);
export default Category;
