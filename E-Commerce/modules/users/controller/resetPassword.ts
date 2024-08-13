import { Request, Response } from "express";
import bcrypt from "bcrypt";
import userModel from "../../../models/user.model";

const resetPassword = async (req: Request, res: Response) => {
  const { OTP, newPassword, confirmPassword } = req.body;

  if (!OTP) throw "otp is required";
  if (!newPassword) throw "password is required";
  if (newPassword != confirmPassword) throw "password didn't matched";

  const encryptPassword = await bcrypt.hash(newPassword, 8);

  console.log(OTP);

  const updatePassword = await userModel.findOneAndUpdate(
    {
      OTP,
    },
    {
      userPassword: encryptPassword,
      OTP: " ",
    }
  );

  if (!updatePassword) throw "OTP didn't matched";

  res.status(200).json({
    message: "password reset successful",
  });
};
export default resetPassword;
