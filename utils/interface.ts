import mongoose from "mongoose";

export interface iUser {
  name: string;
  email: string;
  location: string;
  friends: {}[];
  like: number;
  accept: boolean;
}

export interface iFriend {
  user: {};
}

export interface iLike {
  user: {};
}

export interface iUserData extends iUser, mongoose.Document {}
export interface iFriendData extends iFriend, mongoose.Document {}
export interface iLikeData extends iLike, mongoose.Document {}
