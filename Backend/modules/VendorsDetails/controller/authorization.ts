import { NextFunction, Response, Request } from "express";
import jwt from "jsonwebtoken";

const authorization = async (req: any, res: Response, next: NextFunction) => {
  console.log(req.headers.authorization);
  if (!req.headers.authorization) throw "no headers available";

  const vender_access_token = req.headers.authorization?.split(" ")[1];

  console.log(vender_access_token);

  if (!vender_access_token) throw "unable to get  vender access token";

  try {
    const venderData = await jwt.verify(
      vender_access_token,
      process.env.secret_key!
    );

    req.vender = venderData;
    console.log(venderData);
  } catch (e) {
    throw "Authorization failed (access token didn't match)";
  }

  next();
};

export default authorization;
