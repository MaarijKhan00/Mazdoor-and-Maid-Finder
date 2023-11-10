import Orders from "../models/Order.js";
import User from "../models/User.js";

export const addOrder = async (req, res, next) => {
  try {
    console.log(req.body);
    const newOrder = new Orders(req.body);
    const savOrder = await newOrder.save();
    const rId = savOrder._id.toString();
    const updateUserLabor = await User.findByIdAndUpdate(req.body.labor, {
      $push: { Order: rId },
    });
    const updateUserBuyer = await User.findByIdAndUpdate(req.body.buyerId, {
      $push: { Order: rId },
    });
    res.status(201).json(savOrder);
  } catch (error) {
    next(error);
  }
};

export const allOrder = async (req, res, next) => {
  try {
    const labor = req.query.labor;
    if (labor) {
      const userOrder = await Orders.find({ labor })
        .sort({
          createdAt: -1,
        })
        .populate([
          {
            path: "labor",
            select: "-password",
            populate: {
              path: "Feedback",
              model: "Feedback",
            },
          },
          {
            path: "buyerId",
            select: "-password",
            populate: {
              path: "Feedback",
              model: "Feedback",
            },
          },
        ]);
      return res.status(200).json(userOrder);
    }
    const buyerId = req.query.buyerId;
    if (buyerId) {
      const userOrder = await Orders.find({ buyerId })
        .sort({
          createdAt: -1,
        })
        .populate([
          {
            path: "labor",
            select: "-password",
            populate: {
              path: "Feedback",
              model: "Feedback",
            },
          },
          {
            path: "buyerId",
            select: "-password",
            populate: {
              path: "Feedback",
              model: "Feedback",
            },
          },
        ]);
      return res.status(200).json(userOrder);
    }
    res.status(404).json("User not found");
  } catch (error) {
    next(error);
  }
};

export const updateOrder = async (req, res, next) => {
  try {
    const id = req.params.id;

    const userOrder = await Orders.findByIdAndUpdate(
      id,
      {
        status: "complete",
      },
      { new: true }
    );
    res.status(200).json(userOrder);
  } catch (error) {
    next(error);
  }
};
