import express, { Application } from "express";
import { environment } from "./config/envVariables";
import { appConfig } from "./appConfig";
import { dbConfig } from "./config/dataBase";

const port: number = parseInt(environment.PORT);

const app: Application = express();
appConfig(app);

const server = app.listen(process.env.PORT || port, () => {
  dbConfig();
});

server.on("uncaughtException", (error: any) => {
  console.log("uncaughtException: ", error);
  process.exit(1);
});

server.on("unhandledRejection", (reason: any) => {
  console.log("unhandledRejection: ", reason);
  server.close(() => {
    process.exit(1);
  });
});
