"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controller/userController");
const user = express_1.default.Router();
user.route("/create").post(userController_1.createUser);
user.route("/views").get(userController_1.viewUser);
user.route("/:userID/liked").post(userController_1.likeUser);
user.route("/:userID/delete").delete(userController_1.deleteUser);
user.route("/:userID/:friendID/send").get(userController_1.sendFriendRequest);
user.route("/:userID/:friendID/accepted").get(userController_1.acceptFriendRequest);
user.route("/:userID/:friendID/declined").get(userController_1.declineFriendRequest);
user.route("/:userID/:friendID/be-friend").patch(userController_1.beFriend);
exports.default = user;
