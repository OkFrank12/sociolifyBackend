"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConfig = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const envVariables_1 = require("./envVariables");
const mongoURL = envVariables_1.environment.MONGO;
const dbConfig = () => {
    mongoose_1.default.connect(mongoURL).then(() => {
        console.log("Database is connected and server is ready for response");
    });
};
exports.dbConfig = dbConfig;
