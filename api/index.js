import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import users from "./routes/users.js";
import auth from "./routes/auth.js";
import request from "./routes/request.js";
import proposal from "./routes/proposal.js";
import order from "./routes/order.js";
import feedback from "./routes/feedback.js";
import report from "./routes/report.js";
import cat from "./routes/cat.js";
import User from "./models/User.js";
import bcrypt from "bcryptjs";
const app = express();
// middlewares

dotenv.config();
const PORT = 3000;
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(express.json());

const coneect = async () => {
  try {
    await mongoose.connect(process.env.DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connect");
  } catch (error) {
    throw error;
  }
};
const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync("admin", salt);
async function createNewUserIfNoneExists() {
  try {
    // Check if there are any existing users in the database
    const existingUsersCount = await User.countDocuments();

    if (existingUsersCount === 0) {
      // If no users found, create a new user
      const newUser = new User({
        name: "Admin",
        email: "admin@gmail.com",
        password: hash,
        accountType: "Admin",
      });

      // Save the user to the database
      const savedUser = await newUser.save();
      // console.log("New user created:", savedUser);
    } else {
      // console.log("Users already exist. Not creating a new user.");
    }
  } catch (error) {
    // console.error("Error creating user:", error);
  }
}
createNewUserIfNoneExists();
app.use("/api", users);
app.use("/api", auth);
app.use("/api", request);
app.use("/api/proposal", proposal);
app.use("/api/order", order);
app.use("/api/feedback", feedback);
app.use("/api/report", report);
app.use("/api/category", cat);

app.listen(PORT, () => {
  coneect();
  console.log(`server is running on port ${PORT}`);
});
