"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appConfig = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const userRouter_1 = __importDefault(require("./router/userRouter"));
const appConfig = (app) => {
    app.use(express_1.default.json());
    app.use((0, cors_1.default)());
    app.use((0, helmet_1.default)());
    app.use((0, morgan_1.default)("dev"));
    app.set("view engine", "ejs");
    app.use("/api", userRouter_1.default);
    app.get("/", (req, res) => {
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
        }
        catch (error) {
            return res.status(404).json({
                message: "error on default ROUTE",
                data: error.message,
            });
        }
    });
};
exports.appConfig = appConfig;
