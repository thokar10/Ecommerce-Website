import { Request, Response } from "express";
import userModel from "../../../models/user.model";
import { v4 as uuidv4 } from "uuid";

const verifyToResetPassword = async (req: Request, res: Response) => {
  const { userEmail } = req.body;

  const verifyUser = await userModel.findOne({ userEmail });
  if (!verifyUser) throw "you are not allowed to change password";

  const randomData = uuidv4();
  const OTP = randomData.toString().substring(0, 5);
  if (!OTP) throw "error to create a token";

  await userModel.updateOne({ userEmail }, { OTP });

  res.status(200).json({
    message: "you are allowed to change password",
    OTP,
  });
};
export default verifyToResetPassword;
