import { Request, Response } from "express";
import validator from "validator";
import venderModel from "../../../models/vendorModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const venderLogin = async (req: Request, res: Response) => {
  console.log(req.body);

  const { venderEmail, venderPassword } = req.body;

  if (!venderEmail) throw "email is required";
  if (!venderPassword) throw "password is required";

  const findVender = await venderModel.findOne({
    venderEmail,
  });
  if (!findVender) throw "unable to find the venders information";

  console.log(findVender);

  const checkPassword = await bcrypt.compare(
    venderPassword,
    findVender.venderPassword
  );

  if (!checkPassword) throw "password doesn't match";

  console.log(findVender._id);

  const payload = {
    vender_id: findVender._id,
  };

  const vender_access_token = jwt.sign(payload, process.env.secret_key!);

  console.log(payload);

  res.status(200).json({
    message: "Login successful",
    vender_access_token: vender_access_token,
  });
};
export default venderLogin;
