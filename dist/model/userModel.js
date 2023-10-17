"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userModel = new mongoose_1.default.Schema({
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
            type: mongoose_1.default.Types.ObjectId,
            ref: "friends",
        },
    ],
    like: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("users", userModel);
