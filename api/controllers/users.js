import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createError } from "../utitls/error.js";
import generateVerificationLink from "../utitls/sendLink.js";
// export const addUsers = async (req, res, next) => {
//   try {
//     const {
//       name,
//       email,
//       password,
//       accountType,
//       accountCategory,
//       image,
//       location,
//     } = req.body;
//     const salt = bcrypt.genSaltSync(10);
//     const hash = bcrypt.hashSync(password, salt);
//     const newUser = new User({
//       name,
//       email,
//       password: hash,
//       accountType,
//       accountCategory,
//       image,
//       location,
//       verificationToken, // Save the verification token
//       isVerified,  // Save the verification link
//     });
//     const saveUser = await newUser.save();

//     // Send verification link email
//     const { success, message } = await generateVerificationLink(email, saveUser._id, req.body);
//     if (!success) {
//       return res.status(500).json({ success: false, message });
//     }

//     // Send combined response
//     res.status(201).json({
//       success: true,
//       message: "Record added successfully! Verification email sent.",
//       user: saveUser,
//     });
//     console.log("Verification Link sent");
//   } catch (error) {
//     next(error);
//   }
// };

export const addUsers = async (req, res, next) => {
  try {
    const {
      name,
      email,
      password,
      accountType,
      accountCategory,
      image,
      location,
    } = req.body;

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    // Generate verification token and link
    const verificationToken = jwt.sign({ email }, process.env.JWT, {
      expiresIn: "1h",
    });

    

    // Create a new user instance with verificationToken and verificationLink
    const newUser = new User({
      name,
      email,
      password: hash,
      accountType,
      accountCategory,
      image,
      location,
      verificationToken, // Save the verification token
      isVerified: false,  // Save the verification link
    });

    const saveUser = await newUser.save();

    // Send verification link email
    const { success, message } = await generateVerificationLink(email, saveUser._id, req.body);
    if (!success) {
      return res.status(500).json({ success: false, message });
    }

    // Send combined response
    res.status(201).json({
      success: true,
      message: "Record added successfully! Verification email sent.",
      user: saveUser,
    });
    console.log("Verification Link sent");
  } catch (error) {
    next(error);
  }
};

export const allUsers = async (req, res, next) => {
  try {
    const id = req.query.id;
    const users = await User.findById(id).populate([
      "Request",
      {
        path: "Feedback",
        populate: [
          {
            path: "sender",
            model: "User",
          },
          {
            path: "receiver",
            model: "User",
          },
        ],
      },
      "Proposal",
      "Order",
    ]);
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
export const updateUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log(req.body);
    const users = await User.findByIdAndUpdate(
      id,
      { $push: { Portfolio: req.body } },
      { new: true }
    );
    res.status(200).json("updated");
  } catch (error) {
    next(error);
  }
};
export const all = async (req, res, next) => {
  try {
    const allUsers = await User.find()
      .sort({ createdAt: -1 })
      .populate(["Feedback"]);
    res.status(200).json(allUsers);
  } catch (error) {
    next(error);
  }
};
export const deactivateUser = async (req, res) => {
  const userId = req.params.id; // Assuming you will pass the user's ID in the URL parameter
  try {
    const user = await User.findByIdAndUpdate(userId, {
      $set: { status: false },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res
      .status(200)
      .json({ message: "User status updated successfully", user });
  } catch (error) {
    console.error("Error deactivating user:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while deactivating the user" });
  }
};
export const activateUser = async (req, res) => {
  const userId = req.params.id; // Assuming you will pass the user's ID in the URL parameter
  try {
    const user = await User.findByIdAndUpdate(userId, {
      $set: { status: true },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res
      .status(200)
      .json({ message: "User status updated successfully", user });
  } catch (error) {
    console.error("Error deactivating user:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while deactivating the user" });
  }
};

export const updatePassword = async (req, res, next) => {
  try {
    // Check if the password field is included in the request body
    if (req.body.password) {
      // Hash the new password
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      // Update the request body with the hashed password
      req.body.password = hashedPassword;
    }
    
    const email = req.params.email;
    console.log(email);
    console.log(req.body.password);
    const updateUser = await User.findOneAndUpdate(
      { email },
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateUser);
  } catch (error) {
    next(error);
  }
};