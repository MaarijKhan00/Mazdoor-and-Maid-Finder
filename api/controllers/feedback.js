import Feedback from "../models/Feedback.js";
import Order from "../models/Order.js";
import User from "../models/User.js";

// export const addFeedback = async (req, res, next) => {
//   console.log(req.body.type);
//   try {
//     if (req.body.type == "mazdoor" || req.body.type == "seller") {
//       const updateRequest = await Order.findByIdAndUpdate(req.body.id, {
//         laborstatus: true,
//       });
//       // const newFeedback = new Feedback(req.body);
//       // const savFeedback = await newFeedback.save();
//       // const rId = savFeedback._id.toString();
      
//       const newFeedback = new Feedback({
//         ...req.body,
//         _id: rId,
//       });
//       const rId = `${req.body.sender}_${req.body.receiver}_${Date.now()}`;
//       const savFeedback = await newFeedback.save();

//       const sender = await User.findByIdAndUpdate(req.body.sender, {
//         $push: { Feedback: rId },
//       });
//       const receiver = await User.findByIdAndUpdate(req.body.receiver, {
//         $push: { Feedback: rId },
//       });
//       return res.status(201).json(savFeedback);
//     }
//     if (req.body.type == "Client") {
//       const updateRequest = await Order.findByIdAndUpdate(req.body.id, {
//         status: "rated",
//       });
//       const newFeedback = new Feedback(req.body);
//       const savFeedback = await newFeedback.save();
//       const rId = savFeedback._id.toString();

//       const sender = await User.findByIdAndUpdate(req.body.sender, {
//         $push: { Feedback: rId },
//       });
//       const receiver = await User.findByIdAndUpdate(req.body.receiver, {
//         $push: { Feedback: rId },
//       });
//       return res.status(201).json(savFeedback);
//     }
//   } catch (error) {
//     next(error);
//   }
// };

export const addFeedback = async (req, res, next) => {
  console.log(req.body.type);
  try {
    if (req.body.type == "mazdoor" || req.body.type == "seller") {
      const updateRequest = await Order.findByIdAndUpdate(req.body.id, {
        laborstatus: true,
      });
      const newFeedback = new Feedback({
        sender: req.body.sender,
        receiver: req.body.receiver,
        stars: req.body.stars,
        feedback: req.body.feedback,
      });
      const savFeedback = await newFeedback.save();

      const sender = await User.findByIdAndUpdate(req.body.sender, {
        $push: { Feedback: savFeedback._id },
      });
      const receiver = await User.findByIdAndUpdate(req.body.receiver, {
        $push: { Feedback: savFeedback._id },
      });
      return res.status(201).json(savFeedback);
    }
    if (req.body.type == "Client") {
      const updateRequest = await Order.findByIdAndUpdate(req.body.id, {
        status: "rated",
      });
      const newFeedback = new Feedback({
        sender: req.body.sender,
        receiver: req.body.receiver,
        stars: req.body.stars,
        feedback: req.body.feedback,
      });
      const savFeedback = await newFeedback.save();

      const sender = await User.findByIdAndUpdate(req.body.sender, {
        $push: { Feedback: savFeedback._id },
      });
      const receiver = await User.findByIdAndUpdate(req.body.receiver, {
        $push: { Feedback: savFeedback._id },
      });
      return res.status(201).json(savFeedback);
    }
  } catch (error) {
    next(error);
  }
};

export const allFeedback = async (req, res, next) => {
  try {
    const labor = req.query.labor;
    if (labor) {
      const userFeedback = await Feedback.find({ labor });
      return res.status(200).json(userFeedback);
    }
    const buyerId = req.query.buyerId;
    if (buyerId) {
      const userFeedback = await Feedback.find({ buyerId });
      return res.status(200).json(userFeedback);
    }
    res.status(404).json("User not found");
  } catch (error) {
    next(error);
  }
};
