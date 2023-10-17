"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const envVariables_1 = require("./config/envVariables");
const appConfig_1 = require("./appConfig");
const dataBase_1 = require("./config/dataBase");
const port = parseInt(envVariables_1.environment.PORT);
const app = (0, express_1.default)();
(0, appConfig_1.appConfig)(app);
const server = app.listen(process.env.PORT || port, () => {
    (0, dataBase_1.dbConfig)();
});
server.on("uncaughtException", (error) => {
    console.log("uncaughtException: ", error);
    process.exit(1);
});
server.on("unhandledRejection", (reason) => {
    console.log("unhandledRejection: ", reason);
    server.close(() => {
        process.exit(1);
    });
});
