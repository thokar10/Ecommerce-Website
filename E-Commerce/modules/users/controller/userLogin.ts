import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import userModel from "../../../models/user.model";

const userLogin = async (req: Request, res: Response) => {
  const { userEmail, userPassword } = req.body;

  if (!userEmail) throw "user email is required";
  const checkEmailFormat = validator.isEmail(userEmail.toString());
  if (!checkEmailFormat) throw "email format invalid";
  if (!userPassword) throw "user password is required";

  const findUser = await userModel
    .findOne({
      userEmail,
    })
    .select("userPassword");

  if (!findUser) throw "unable to find user";

  const checkPassword = await bcrypt.compare(
    userPassword,
    findUser.userPassword
  );
  if (!checkPassword) throw "password is incorrect";

  const payload = {
    user_id: findUser._id,
  };

  const userAccessToken = jwt.sign(payload, process.env.secret_key_User!);

  res.status(200).json({
    message: "login successfully",
    userAccessToken,
  });
};
export default userLogin;
