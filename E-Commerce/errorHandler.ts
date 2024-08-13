import { NextFunction, Request, Response } from "express";
const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error) {
    if (typeof error == "string") {
      res.status(400).json({
        errorMessage: error,
      });
    } else {
      res.status(400).json({
        message: "something wrong",
        reason: error,
      });
    }
  } else {
    next();
  }
};

export default errorHandler;
