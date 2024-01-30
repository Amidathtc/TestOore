import mongoose from "mongoose";
import { iProfileData } from "../utils/interface";

const profileModel = new mongoose.Schema<iProfileData>(
  {
    userID: {
      type: String,
    },
    name: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    address: {
      type: String,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "users",
    },
    aboutUs: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model<iProfileData>("profiles", profileModel);