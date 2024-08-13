import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
const productAuthorization = (req: any, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;

    if (!token) throw "token is empty";

    const access_token = token!.split(" ")[1];
    if (!access_token) throw "access token is empty";

    const verifyAccessToken = jwt.verify(access_token, process.env.secret_key!);
    req.vender = verifyAccessToken;
    console.log(verifyAccessToken);
  } catch (e) {
    throw "authorization error";
  }

  next();
};

export default productAuthorization;
