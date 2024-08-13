import { NextFunction, Request, Response } from "express";

import jwt from "jsonwebtoken";

const userAuthorization = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.headers.authorization) throw "headers empty";

    const userAccessToken = req.headers.authorization.split(" ")[1];

    const verifyAccessToken = jwt.verify(
      userAccessToken,
      process.env.secret_key_User!
    );
    req.user = verifyAccessToken;
  } catch (e) {
    throw "Authorization failed (access token didn't match)";
  }

  next();
};
export default userAuthorization;
