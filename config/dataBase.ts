import mongoose from "mongoose";
import { envVar } from "./envVariables";

const mongoUrl: string = envVar.MONGO_URL;

export const dbConfig = () => {
  mongoose.connect(mongoUrl).then(() => {
    console.log(`Database is connected`);
  });
};
