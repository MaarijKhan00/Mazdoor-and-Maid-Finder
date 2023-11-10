import Report from "../models/Report.js";
import Order from "../models/Order.js";

export const addReport = async (req, res, next) => {
  try {
    const id = req.body.id;
    const userOrder = await Order.findByIdAndUpdate(
      id,
      {
        status: "reported",
      },
      { new: true }
    );

    const newReport = new Report(req.body);
    const savReport = await newReport.save();
    res.status(201).json(savReport);
  } catch (error) {
    next(error);
  }
};

export const allReport = async (req, res, next) => {
  try {
    const reportData = await Report.find({ status: true })
      .sort({
        createdAt: -1,
      })
      .populate([
        {
          path: "buyerId",
          select: "-password",
        },
        {
          path: "labor",
          select: "-password",
        },
      ]);
    res.status(200).json(reportData);
  } catch (error) {
    next(error);
  }
};
export const singleReport = async (req, res, next) => {
  const user = req.params.user;
  try {
    const reportData = await Report.find({ buyerId: user })
      .sort({
        createdAt: -1,
      })
      .populate([
        {
          path: "buyerId",
          select: "-password",
        },
        {
          path: "labor",
          select: "-password",
        },
      ]);
    res.status(200).json(reportData);
  } catch (error) {
    next(error);
  }
};

export const updateReport = async (req, res, next) => {
  const id = req.params.id;

  try {
    const reportUpdate = await Report.findByIdAndUpdate(id, {
      response: req.body.response,
      status: false,
    });

    res.status(200).json(reportUpdate);
  } catch (error) {
    next(error);
  }
};
