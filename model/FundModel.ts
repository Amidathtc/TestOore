import mongoose, { Mongoose } from "mongoose";
import { iFundData } from "../utils/interface";

const FundModel = new mongoose.Schema<iFundData>(
  {
    title: {
      type: String,
    },
    category: {
      type: String,
    },
    userID: {
      type: String,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
    imageID: {
      type: String,
    },
    amountNeeded: {
      type: Number,
    },
    amountRaised: {
      type: Number,
    },
    checkOut: [
      {
        type: mongoose.Types.ObjectId,
        ref: "checkouts",
      },
    ],
    like: [
      {
        type: mongoose.Types.ObjectId,
      },
    ],
    user: {
      type: mongoose.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

export default mongoose.model<iFundData>("begs", FundModel);