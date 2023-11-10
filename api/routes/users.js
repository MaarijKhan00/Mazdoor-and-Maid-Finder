import express from "express";
import {
  addUsers,
  allUsers,
  updateUser,
  all,
  deactivateUser,
  activateUser,
  updatePassword,
} from "../controllers/users.js";
import { resetPassword } from "../utitls/reset.js";
import { checkEmail } from "../utitls/checkEmail.js";
import User from "../models/User.js";
import {verifyToken} from "../utitls/verifyToken.js"
import uploadMiddleware from "../middlewares/uploadMiddleware.js";
import jwt from "jsonwebtoken";
const router = express.Router();
router.get("/users", allUsers);
router.get("/users/all", all);
router.post("/users", addUsers);
router.patch("/users/:id", updateUser);
router.patch("/users/block/:id", deactivateUser);
router.patch("/users/unblock/:id", activateUser);
router.get("/reset/:email", resetPassword);
router.get("/checkEmail", checkEmail);
router.patch("/updatePassword/:email", updatePassword);

router.get("/verify/:token", async (req, res, next) => {
  const { token } = req.params;
  try {
    const decodedToken = jwt.verify(token, process.env.JWT);
    const { email, uid } = decodedToken;
    const user = await User.findOneAndUpdate(
      { email, _id: uid, isVerified: false },
      { isVerified: true, verificationToken: "" }
    );
    if (!user) {
      return res.status(404).json({ success: false, message: "Invalid verification token or record already verified." });
    }
    
    // Send a success response
    res.status(200).json({ success: true, message: "Email verified successfully." });
  } catch (error) {
    next(error);
  }
});



// router.get("/verify/:token", async (req, res, next) => {
//   const { token } = req.params;
//   try {
//     const decodedToken = jwt.verify(token, process.env.JWT);
//     const { email, uid } = decodedToken;
//     const user = await User.findOneAndUpdate(
//       { email, _id: uid, isVerified: false },
//       { isVerified: true, verificationToken: ""}
//     );
//     if (!user) {
//       return res.status(404).json({ success: false, message: "Invalid verification token or record already verified." });
//     }
//     res.redirect(`/login?verified=true`);
//   } catch (error) {
//     next(error);
//   }
// });




export default router;
