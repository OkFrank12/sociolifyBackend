import nodemailer from "nodemailer";
import path from "path";
import ejs from "ejs";
import { google } from "googleapis";

const baseURL: string = "http://localhost:5173";
const baseURL1: string = "http://localhost:1000";

const G_ID =
  "403139932252-k0ksvgd56ohc39lsckt5bt3oquahgnvb.apps.googleusercontent.com";
const G_SECRET = "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";
const G_REFRESH =
  "1//04bsN5npSCiQqCgYIARAAGAQSNwF-L9Irifs6Ypy-8tdvnhCU0OPHZDjC8st6x82OOKEzVryQnYpRCh6rzl-4DLsGrrkA7var9dI";
const G_URL = "https://developers.google.com/oauthplayground";

const oAuth = new google.auth.OAuth2(G_ID, G_SECRET, G_URL);
oAuth.setCredentials({ access_token: G_REFRESH });
//pass: "cdxv resq qsxp zfev",
const sendMailToUser = async (user: any, friend: any) => {
  try {
    const accessToken: any = (await oAuth.getAccessToken()).token;
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "cfoonyemmemme@gmail.com",
        type: "OAuth2",
        clientId: G_ID,
        clientSecret: G_SECRET,
        refreshToken: G_REFRESH,
        accessToken,
      },
    });

    const passedData = {
      name: user?.name,
      friend: friend?.name,
      location: friend?.location,
      url: `${baseURL}/${user?._id}/${friend?._id}/accepted`,
      url1: `${baseURL}/${user?._id}/${friend?._id}/declined`,
    };

    const locateFile = path.join(__dirname, "../views/sendMail.ejs");
    const readFile = await ejs.renderFile(locateFile, passedData);

    const mailer = {
      from: "Friend Request <cfoonyemmemme@gmail.com>",
      to: user.email,
      subject: "Be my friend",
      html: readFile,
    };

    transport.sendMail(mailer);
  } catch (error: any) {
    console.log(error);
  }
};

const sendAcceptanceMail = async (user: any, friend: any) => {
  try {
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "cfoonyemmemme@gmail.com",
        pass: "cdxv resq qsxp zfev",
      },
    });

    const passedData = {
      name: friend?.name,
    };

    const locateFile = path.join(__dirname, "../views/acceptMail.ejs");
    const readFile = await ejs.renderFile(locateFile, passedData);

    const mailer = {
      from: "Accepted <cfoonyemmemme@gmail.com>",
      to: user.email,
      subject: "Be my friend",
      html: readFile,
    };

    transport.sendMail(mailer);
  } catch (error: any) {
    console.log(error);
  }
};

const sendDeclineMail = async (user: any, friend: any) => {
  try {
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "cfoonyemmemme@gmail.com",
        pass: "cdxv resq qsxp zfev",
      },
    });

    const passedData = {
      name: friend?.name,
    };

    const locateFile = path.join(__dirname, "../views/declineMail.ejs");
    const readFile = await ejs.renderFile(locateFile, passedData);

    const mailer = {
      from: "Friend Request <cfoonyemmemme@gmail.com>",
      to: user.email,
      subject: "Be my friend",
      html: readFile,
    };

    transport.sendMail(mailer);
  } catch (error: any) {
    console.log(error);
  }
};

export { sendMailToUser, sendAcceptanceMail, sendDeclineMail };
