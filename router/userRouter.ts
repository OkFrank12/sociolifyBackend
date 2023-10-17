import express from "express";
import {
  acceptFriendRequest,
  beFriend,
  // acceptFriendRequest,
  createUser,
  declineFriendRequest,
  deleteUser,
  likeUser,
  sendFriendRequest,
  viewUser,
} from "../controller/userController";

const user = express.Router();

user.route("/create").post(createUser);
user.route("/views").get(viewUser);
user.route("/:userID/liked").post(likeUser);
user.route("/:userID/delete").delete(deleteUser);
user.route("/:userID/:friendID/send").get(sendFriendRequest);
user.route("/:userID/:friendID/accepted").get(acceptFriendRequest);
user.route("/:userID/:friendID/declined").get(declineFriendRequest);
user.route("/:userID/:friendID/be-friend").patch(beFriend)

export default user;
