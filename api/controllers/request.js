import Request from "../models/Request.js";
import User from "../models/User.js";

export const addRequest = async (req, res, next) => {
  try {
    const newRequest = new Request(req.body);
    const savRequest = await newRequest.save();
    const { buyerId } = req.body;
    const rId = savRequest._id.toString();
    const updateUser = await User.findByIdAndUpdate(
      buyerId,
      {
        $push: { Request: rId },
      },
      { new: true }
    );
    res.status(201).json(savRequest);
  } catch (error) {
    next(error);
  }
};

export const allRequest = async (req, res, next) => {
  try {
    const id = req.query.id;
    const city = req.query.city;
    if (id) {
      const userRequest = await Request.find({
        user: { $nin: id },
        status: true,
        city,
      })
        .sort({ createdAt: -1 })
        .populate([
          {
            path: "buyerId",
            select: "-password",
            populate: {
              path: "Feedback",
            },
          },
        ]);
      return res.status(200).json(userRequest);
    } else {
      const userRequest = await Request.find().sort({ createdAt: -1 });
      return res.status(200).json(userRequest);
    }

    // const allRequest = await Request.find().populate("user");
  } catch (error) {
    next(error);
  }
};
export const singleRequest = async (req, res, next) => {
  const user = req.params.user;
  try {
    const singleRequest = await Request.find({ buyerId: user, status: true })
      .sort({
        createdAt: -1,
      })
      .populate([
        {
          path: "buyerId",
          select: "-password",
          populate: {
            path: "Feedback",
          },
        },
      ]);
    res.status(200).json(singleRequest);
  } catch (error) {
    next(error);
  }
};

export const updateRequest = async (req, res, next) => {
  const id = req.params.id;
  try {
    const reportRequest = await Request.findByIdAndUpdate(id, {
      status: false,
    });
    res.status(200).json(reportRequest);
  } catch (error) {
    next(error);
  }
};
