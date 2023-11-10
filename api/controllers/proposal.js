import Proposal from "../models/Proposal.js";
import Request from "../models/Request.js";
import User from "../models/User.js";

export const addProposals = async (req, res, next) => {
  try {
    const { description, price, buyerId, labor, reqId } = req.body;

    const updateRequest = await Request.findByIdAndUpdate(
      reqId,
      { $push: { user: labor } },
      { new: true }
    );

    const newProposals = new Proposal(req.body);
    const savProposals = await newProposals.save();

    const rId = savProposals._id.toString();
    const updateUser = await User.findByIdAndUpdate(labor, {
      $push: { Proposal: rId },
    });

    res.status(201).json(savProposals);
  } catch (error) {
    next(error);
  }
};

export const singleProposals = async (req, res, next) => {
  const user = req.query.user;
  try {
    const propsalData = await Proposal.find({ buyerId: user })
      .sort({
        createdAt: -1,
      })
      .populate({
        path: "labor",
        populate: {
          path: "Feedback",
        },
      });
    res.status(200).json(propsalData);
  } catch (error) {
    next(error);
  }
};
