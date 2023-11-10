import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createError } from "../utitls/error.js";

export const login = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email, status: true });
    if (!user) {
      return res.status(404).json({ status: false, message: "user not found" });
    }

    const isPassword = await bcrypt.compare(req.body.password, user.password);
    if (!isPassword) {
      return res
        .status(401)
        .json({ status: false, message: "Password Wrong!" });
    }
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT
    );

    // extract password and isAdmin detail
    const { password, isAdmin, ...otherDetails } = user._doc;
    res.status(200).json({ token, ...otherDetails });
  } catch (error) {
    console.log(error);
  }
};
export const logout = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).send("you are logout");
    next();
  } catch (error) {
    next(error);
  }
};
