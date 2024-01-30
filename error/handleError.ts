import { NextFunction, Request, Response } from "express";
import { HTTP, mainError } from "./mainError";

const errorBuilder = (err: mainError, res: Response) => {
  res.status(HTTP.BAD_REQUEST).json({
    name: err.name,
    message: err.message,
    status: err.status,
    success: err.success,
    stack: err.stack,
  });
};

export const errorHandler = (
  err: mainError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  errorBuilder(err, res);
};