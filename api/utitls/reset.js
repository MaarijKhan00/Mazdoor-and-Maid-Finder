import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import Reset from "../models/Reset.js";
import User from "../models/User.js"; // Import your User model

//send otp
export const resetPassword = async (req, res) => {
  const otp = Math.floor(100000 + Math.random() * 900000);

  const { email } = req.params; // Extract email from request params

  // Check if the user's email exists in the users collection
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ success: false, error: "User not found" });
  }

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'maarijirfan8600@gmail.com',
      pass: 'nxmugzdhpevtbnvv',
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Mazdoor Finder " <admin@mazdoorfinder.com>', // sender address
    to: email, // Use the email from the request
    subject: "Your otp code for verification", // Subject line
    text: `Your OTP for verification is ${otp}. Please enter it on the verification page to proceed.`, // plain text body
    html: `Your OTP for verification is ${otp}. Please enter it on the verification page to proceed.`, // html body
  });

  await Reset.deleteMany({ email });
  const newOtp = new Reset({ otp, email });

  try {
    const saveOtp = await newOtp.save();

    // Send the OTP value in the response
    res.status(201).json({ otp: otp, success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Error occurred while generating OTP" });
  }
};
