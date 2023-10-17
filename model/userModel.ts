import mongoose from "mongoose";
import { iUser, iUserData } from "../utils/interface";

const userModel = new mongoose.Schema<iUserData>(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    location: {
      type: String,
    },
    accept: {
      type: Boolean,
      default: false,
    },
    friends: [
      {
        type: mongoose.Types.ObjectId,
        ref: "friends",
      },
    ],
    like: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model<iUserData>("users", userModel);
