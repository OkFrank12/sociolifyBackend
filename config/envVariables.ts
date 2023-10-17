import dotenv from "dotenv";
dotenv.config();

export const environment = {
  PORT: process.env.PORT!,
  MONGO: process.env.MONGO_URL!,
};
