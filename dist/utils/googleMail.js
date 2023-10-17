"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendDeclineMail = exports.sendAcceptanceMail = exports.sendMailToUser = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const path_1 = __importDefault(require("path"));
const ejs_1 = __importDefault(require("ejs"));
const baseURL = "http://localhost:5173";
const baseURL1 = "http://localhost:1000";
const sendMailToUser = (user, friend) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transport = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                user: "cfoonyemmemme@gmail.com",
                pass: "cdxv resq qsxp zfev",
            },
        });
        const passedData = {
            name: user === null || user === void 0 ? void 0 : user.name,
            friend: friend === null || friend === void 0 ? void 0 : friend.name,
            location: friend === null || friend === void 0 ? void 0 : friend.location,
            url: `${baseURL}/${user === null || user === void 0 ? void 0 : user._id}/${friend === null || friend === void 0 ? void 0 : friend._id}/accepted`,
            url1: `${baseURL}/${user === null || user === void 0 ? void 0 : user._id}/${friend === null || friend === void 0 ? void 0 : friend._id}/declined`,
        };
        const locateFile = path_1.default.join(__dirname, "../views/sendMail.ejs");
        const readFile = yield ejs_1.default.renderFile(locateFile, passedData);
        const mailer = {
            from: "Friend Request <cfoonyemmemme@gmail.com>",
            to: user.email,
            subject: "Be my friend",
            html: readFile,
        };
        transport.sendMail(mailer);
    }
    catch (error) {
        console.log(error);
    }
});
exports.sendMailToUser = sendMailToUser;
const sendAcceptanceMail = (user, friend) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transport = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                user: "cfoonyemmemme@gmail.com",
                pass: "cdxv resq qsxp zfev",
            },
        });
        const passedData = {
            name: friend === null || friend === void 0 ? void 0 : friend.name,
        };
        const locateFile = path_1.default.join(__dirname, "../views/acceptMail.ejs");
        const readFile = yield ejs_1.default.renderFile(locateFile, passedData);
        const mailer = {
            from: "Accepted <cfoonyemmemme@gmail.com>",
            to: user.email,
            subject: "Be my friend",
            html: readFile,
        };
        transport.sendMail(mailer);
    }
    catch (error) {
        console.log(error);
    }
});
exports.sendAcceptanceMail = sendAcceptanceMail;
const sendDeclineMail = (user, friend) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transport = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                user: "cfoonyemmemme@gmail.com",
                pass: "cdxv resq qsxp zfev",
            },
        });
        const passedData = {
            name: friend === null || friend === void 0 ? void 0 : friend.name,
        };
        const locateFile = path_1.default.join(__dirname, "../views/declineMail.ejs");
        const readFile = yield ejs_1.default.renderFile(locateFile, passedData);
        const mailer = {
            from: "Friend Request <cfoonyemmemme@gmail.com>",
            to: user.email,
            subject: "Be my friend",
            html: readFile,
        };
        transport.sendMail(mailer);
    }
    catch (error) {
        console.log(error);
    }
});
exports.sendDeclineMail = sendDeclineMail;
