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
exports.beFriend = exports.declineFriendRequest = exports.acceptFriendRequest = exports.sendFriendRequest = exports.deleteUser = exports.likeUser = exports.viewUser = exports.createUser = void 0;
const userModel_1 = __importDefault(require("../model/userModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const googleMail_1 = require("../utils/googleMail");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, location } = req.body;
        const user = yield userModel_1.default.create({
            name,
            email,
            location,
        });
        return res.status(201).json({
            message: "User created",
            data: user,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "error creating user",
            data: error.message,
        });
    }
});
exports.createUser = createUser;
const viewUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const views = yield userModel_1.default.find();
        return res.status(200).json({
            message: "views",
            data: views,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "error viewing user",
            data: error.message,
        });
    }
});
exports.viewUser = viewUser;
const likeUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const findID = yield userModel_1.default.findById(userID);
        const data = (findID === null || findID === void 0 ? void 0 : findID.like) + 1;
        const update = yield userModel_1.default.findByIdAndUpdate(userID, {
            like: data,
        }, { new: true });
        return res.status(201).json({
            message: "liked a user",
            data: update,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "error liking user",
            data: error.message,
        });
    }
});
exports.likeUser = likeUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const remove = yield userModel_1.default.findByIdAndDelete(userID);
        return res.status(201).json({
            message: "Deleted",
            data: remove,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "error deleting user",
            data: error.message,
        });
    }
});
exports.deleteUser = deleteUser;
const sendFriendRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID, friendID } = req.params;
        const user = yield userModel_1.default.findById(userID);
        const friend = yield userModel_1.default.findById(friendID);
        if (user && friend) {
            (0, googleMail_1.sendMailToUser)(friend, user).then(() => {
                console.log("Mail has been sent to user");
            });
            const accept = yield userModel_1.default.findByIdAndUpdate(friend === null || friend === void 0 ? void 0 : friend._id, {
                accept: true,
            }, { new: true });
            (0, googleMail_1.sendAcceptanceMail)(user, friend).then(() => {
                console.log("Mail sent...!!!");
            });
            return res.status(200).json({
                message: "Accepted",
                data: accept,
            });
        }
        return res.status(200).json({
            message: `${user === null || user === void 0 ? void 0 : user.name} have sent a mail to ${friend === null || friend === void 0 ? void 0 : friend.name}`,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "error sending friend request",
            data: error.message,
        });
    }
});
exports.sendFriendRequest = sendFriendRequest;
const acceptFriendRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID, friendID } = req.params;
        const friend = yield userModel_1.default.findById(friendID);
        const user = yield userModel_1.default.findById(userID);
        if (friend && user) {
        }
    }
    catch (error) {
        return res.status(404).json({
            message: "error accepting friend request",
            data: error.message,
        });
    }
});
exports.acceptFriendRequest = acceptFriendRequest;
const declineFriendRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID, friendID } = req.params;
        const friend = yield userModel_1.default.findById(friendID);
        const user = yield userModel_1.default.findById(userID);
        if (friend && user) {
            (0, googleMail_1.sendDeclineMail)(friend, user).then(() => {
                console.log("Decline Mail sent...!");
            });
            return res.status(201).json({
                message: "declined friend request",
            });
        }
        else {
            return res.status(404).json({
                message: "An error occured via decline",
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            message: "error declining friend request",
            data: error.message,
        });
    }
});
exports.declineFriendRequest = declineFriendRequest;
const beFriend = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID, friendID } = req.params;
        const user = yield userModel_1.default.findById(userID);
        const friend = yield userModel_1.default.findById(friendID);
        if (user && friend) {
            if ((friend === null || friend === void 0 ? void 0 : friend.accept) === true) {
                yield userModel_1.default.findByIdAndUpdate(friend === null || friend === void 0 ? void 0 : friend._id, {
                    accept: false,
                }, { new: true });
                friend.friends.push(new mongoose_1.default.Types.ObjectId(user === null || user === void 0 ? void 0 : user._id));
                friend.save();
                user.friends.push(new mongoose_1.default.Types.ObjectId(friend === null || friend === void 0 ? void 0 : friend._id));
                user.save();
                return res.status(200).json({
                    message: "You are both friends now",
                });
            }
            else {
                return res.status(404).json({
                    message: "Request has not been accepted",
                });
            }
        }
    }
    catch (error) {
        return res.status(404).json({
            message: "error being friend",
            data: error.message,
        });
    }
});
exports.beFriend = beFriend;
