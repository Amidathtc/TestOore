import express, { Application, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { HTTP, mainError } from "./error/mainError";1
import { NextFunction } from "connect";
import { errorHandler } from "./error/handleError";
import auth from "./router/authRouter";
import profile from "./router/profileRouter";
import Fund from "./router/FundRouter";

export const appConfig = (app: Application) => {
  app.use(express.json());
  app.use(cors());
  app.use(helmet());
  app.use(morgan("dev"));
  app.set("view engine", "ejs");


  
  app.use("/api", auth);
  app.use("/api", profile);
  app.use("/api", Fund);

  app.get("/", (req: Request, res: Response) => {
    try {
      return res.status(HTTP.OK).json({
        message: "API route is ready",
      });
    } catch (error: any) {
      return res.status(HTTP.BAD_REQUEST).json({
        message: "error on API route",
        data: error.message,
      });
    }
  });

  app
    .all("*", (req: Request, res: Response, next: NextFunction) => {
      new mainError({
        name: `This is an API Route Error`,
        status: HTTP.BAD_REQUEST,
        success: false,
        message: `This is happening as a result of invalid route being this: ${req.originalUrl}`,
      });
    })
    .use(errorHandler);
};
