import { Request, Response } from "express";
import userModel from "../../../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";

const userRegister = async (req: Request, res: Response) => {
  const {
    userName,
    userEmail,
    userPassword,
    location,
    phoneNo,
    confirmPassword,
  } = req.body;

  if (!userName) throw "user name is required";
  if (!userEmail) throw "user email is required";
  const checkEmailFormat = validator.isEmail(userEmail.toString());
  if (!checkEmailFormat) throw "email format is not valid";
  if (!userPassword) throw "user password is required";
  if (!location) throw "location is required";
  if (!phoneNo) throw "phone no  is required";
  if (!confirmPassword) throw "confirm password is required";

  if (userPassword != confirmPassword) throw "password does not matched";

  const findExistingUser = await userModel.findOne({
    userEmail,
  });
  if (findExistingUser) throw "user is already existed";

  const encrpytedPassword = await bcrypt.hash(userPassword, 8);

  const createUser = await userModel.create({
    userName,
    userEmail,
    userPassword: encrpytedPassword,
    location,
    phoneNo,
  });

  if (!createUser) throw "unable to register a user";

  const findUser = await userModel.findOne({
    userEmail,
  });

  if (!findUser) throw "unable to find user";

  const payload = {
    user_id: findUser._id,
  };

  const userAccessToken = jwt.sign(payload, process.env.secret_key_User!);

  res.status(200).json({
    message: "Registered successfully",
    userAccessToken,
  });
};
export default userRegister;
