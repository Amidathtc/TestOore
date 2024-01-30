import mongoose from "mongoose";
import { iUser, iUserData } from "../utils/interface";

const authModel = new mongoose.Schema<iUserData>(
  {
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    verified: {
      type: Boolean,
    },
    token: {
      type: String,
    },
    profile: [
      {
        type: mongoose.Types.ObjectId,
        ref: "profiles",
      },
    ],
    beg: [
      {
        type: mongoose.Types.ObjectId,
        ref: "begs",
      },
    ],
    history: [
      {
        type: mongoose.Types.ObjectId,
        ref: "histories",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<iUserData>("users", authModel);
