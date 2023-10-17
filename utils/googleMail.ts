import nodemailer from "nodemailer";
import path from "path";
import ejs from "ejs";

const baseURL: string = "http://localhost:5173";
const baseURL1: string = "http://localhost:1000";

const sendMailToUser = async (user: any, friend: any) => {
  try {
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "cfoonyemmemme@gmail.com",
        pass: "cdxv resq qsxp zfev",
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
