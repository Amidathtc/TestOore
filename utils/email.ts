
import nodemailer from "nodemailer";
import { google } from "googleapis";
import path from "path";
import ejs from "ejs";

const G_ID: string =
  "403139932252-k0ksvgd56ohc39lsckt5bt3oquahgnvb.apps.googleusercontent.com";
const G_SECRET: string = "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";
const G_REFRESH: string =
  "1//04bsN5npSCiQqCgYIARAAGAQSNwF-L9Irifs6Ypy-8tdvnhCU0OPHZDjC8st6x82OOKEzVryQnYpRCh6rzl-4DLsGrrkA7var9dI";
const G_URL: string = "https://developers.google.com/oauthplayground";

const oAuth = new google.auth.OAuth2(G_ID, G_SECRET, G_URL);
oAuth.setCredentials({ access_token: G_REFRESH });

const URL: string = `https://eco-funds-new.web.app`;

export const sendMail = async (user: any, token: any) => {
  try {
    const accessToken: any = (await oAuth.getAccessToken()).token;
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "cfoonyemmemme@gmail.com",
        clientId: G_ID,
        clientSecret: G_SECRET,
        refreshToken: G_REFRESH,
        accessToken,
      },
    });

    const passedData = {
      email: user.email,
      url: `${URL}/${token}/verify`,
    };

    const locateFile = path.join(__dirname, "../views/verifyNote.ejs");
    const readData = await ejs.renderFile(locateFile, passedData);

    const mailer = {
      from: "verifier <cfoonyemmemme@gmail.com>",
      to: user.email,
      subject: "verify-mail",
      html: readData,
    };

    transport.sendMail(mailer);
  } catch (error: any) {
    console.log(error);
  }
};

export const resetMail = async (user: any, token: any) => {
  try {
    const accessToken: any = (await oAuth.getAccessToken()).token;
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "cfoonyemmemme@gmail.com",
        clientId: G_ID,
        clientSecret: G_SECRET,
        refreshToken: G_REFRESH,
        accessToken,
      },
    });

    const passedData = {
      email: user.email,
      url: `${URL}/${token}/reset-user-password`,
    };

    const locateFile = path.join(__dirname, "../views/resetNote.ejs");
    const readData = await ejs.renderFile(locateFile, passedData);

    const mailer = {
      from: "verifier <cfoonyemmemme@gmail.com>",
      to: user.email,
      subject: "verify-mail",
      html: readData,
    };

    transport.sendMail(mailer);
  } catch (error: any) {
    console.log(error);
  }
};
