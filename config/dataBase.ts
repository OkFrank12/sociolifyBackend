import mongoose from "mongoose";
import { environment } from "./envVariables";

const mongoURL: string = environment.MONGO;

export const dbConfig = () => {
  mongoose.connect(mongoURL).then(() => {
    console.log("Database is connected and server is ready for response");
  });
};
