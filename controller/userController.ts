import { Request, Response } from "express";
import userModel from "../model/userModel";
import mongoose from "mongoose";
import {
  sendAcceptanceMail,
  sendDeclineMail,
  sendMailToUser,
} from "../utils/googleMail";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, location } = req.body;

    const user = await userModel.create({
      name,
      email,
      location,
    });

    return res.status(201).json({
      message: "User created",
      data: user,
    });
  } catch (error: any) {
    return res.status(404).json({
      message: "error creating user",
      data: error.message,
    });
  }
};

export const viewUser = async (req: Request, res: Response) => {
  try {
    const views = await userModel.find();

    return res.status(200).json({
      message: "views",
      data: views,
    });
  } catch (error: any) {
    return res.status(404).json({
      message: "error viewing user",
      data: error.message,
    });
  }
};

export const likeUser = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const findID = await userModel.findById(userID);
    const data = findID?.like! + 1;

    const update = await userModel.findByIdAndUpdate(
      userID,
      {
        like: data,
      },
      { new: true }
    );

    return res.status(201).json({
      message: "liked a user",
      data: update,
    });
  } catch (error: any) {
    return res.status(404).json({
      message: "error liking user",
      data: error.message,
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const remove = await userModel.findByIdAndDelete(userID);

    return res.status(201).json({
      message: "Deleted",
      data: remove,
    });
  } catch (error: any) {
    return res.status(404).json({
      message: "error deleting user",
      data: error.message,
    });
  }
};

export const sendFriendRequest = async (req: Request, res: Response) => {
  try {
    const { userID, friendID } = req.params;
    const user = await userModel.findById(userID);
    const friend = await userModel.findById(friendID);

    if (user && friend) {
      sendMailToUser(friend, user).then(() => {
        console.log("Mail has been sent to user");
      });

      const accept = await userModel.findByIdAndUpdate(
        friend?._id,
        {
          accept: true,
        },
        { new: true }
      );

      sendAcceptanceMail(user, friend).then(() => {
        console.log("Mail sent...!!!");
      });
      return res.status(200).json({
        message: "Accepted",
        data: accept,
      });
    }

    return res.status(200).json({
      message: `${user?.name} have sent a mail to ${friend?.name}`,
    });
  } catch (error: any) {
    return res.status(404).json({
      message: "error sending friend request",
      data: error.message,
    });
  }
};

export const acceptFriendRequest = async (req: Request, res: Response) => {
  try {
    const { userID, friendID } = req.params;

    const friend = await userModel.findById(friendID);
    const user = await userModel.findById(userID);

    if (friend && user) {
    }
  } catch (error: any) {
    return res.status(404).json({
      message: "error accepting friend request",
      data: error.message,
    });
  }
};

export const declineFriendRequest = async (req: Request, res: Response) => {
  try {
    const { userID, friendID } = req.params;
    const friend: any = await userModel.findById(friendID);
    const user: any = await userModel.findById(userID);

    if (friend && user) {
      sendDeclineMail(friend, user).then(() => {
        console.log("Decline Mail sent...!");
      });

      return res.status(201).json({
        message: "declined friend request",
      });
    } else {
      return res.status(404).json({
        message: "An error occured via decline",
      });
    }
  } catch (error: any) {
    return res.status(404).json({
      message: "error declining friend request",
      data: error.message,
    });
  }
};

export const beFriend = async (req: Request, res: Response) => {
  try {
    const { userID, friendID } = req.params;
    const user = await userModel.findById(userID);
    const friend = await userModel.findById(friendID);

    if (user && friend) {
      if (friend?.accept === true) {
        await userModel.findByIdAndUpdate(
          friend?._id,
          {
            accept: false,
          },
          { new: true }
        );

        friend.friends.push(new mongoose.Types.ObjectId(user?._id));
        friend.save();
        user.friends.push(new mongoose.Types.ObjectId(friend?._id));
        user.save();
        return res.status(200).json({
          message: "You are both friends now",
        });
      } else {
        return res.status(404).json({
          message: "Request has not been accepted",
        });
      }
    }
  } catch (error: any) {
    return res.status(404).json({
      message: "error being friend",
      data: error.message,
    });
  }
};
