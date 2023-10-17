import express, { Application, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import user from "./router/userRouter";

export const appConfig = (app: Application) => {
  app.use(express.json());
  app.use(cors());
  app.use(helmet());
  app.use(morgan("dev"));
  app.set("view engine", "ejs");

  app.use("/api", user);

  app.get("/", (req: Request, res: Response) => {
    try {
      return res.status(200).json({
        message: "Default Route Api is ready",
      });
      // const ejsData = {
      //   name: "Franklin Chidera",
      //   email: "franklin@gmail.com",
      //   location: "Abuja",
      //   friend: "Okoro",
      //   url: "https://google.com",
      //   url1: "https://new.com",
      // };
      // return res.status(200).render("sendMail", ejsData);
    } catch (error: any) {
      return res.status(404).json({
        message: "error on default ROUTE",
        data: error.message,
      });
    }
  });
};
