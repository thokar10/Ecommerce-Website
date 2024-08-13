import { Request, Response } from "express";
import validator from "validator";
import venderModel from "../../../models/vendorModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const venderSignUp = async (req: Request, res: Response) => {
  console.log(req.body);
  const {
    venderEmail,
    venderPassword,
    businessName,
    confirm_password,
    venderName,
  } = req.body;

  if (!venderEmail) throw " email is required";
  if (!venderPassword) throw "password is required";
  if (!businessName) throw "business name is required";
  if (!confirm_password) throw "confirm password is required";

  const validateEmail = validator.isEmail(venderEmail.toString());
  if (!validateEmail) throw "email invalid format";
  const validateBusiness = validator.isInt(businessName.toString());
  if (validateBusiness) throw "business  name should be  in string";

  if (venderPassword != confirm_password)
    throw "confirm password didn't matched";
  const findExistedVendor = await venderModel.findOne({
    venderEmail,
  });

  const encryptPassword = await bcrypt.hash(venderPassword, 8);

  if (findExistedVendor)
    throw " vendors   having this   email is  already existed";

  const newVendor = await venderModel.create({
    venderName,
    venderEmail,
    venderPassword: encryptPassword,
    businessName,
  });

  if (!newVendor) throw "unable to create a vendor";

  const findVender = await venderModel.findOne({
    venderEmail,
  });

  if (!findVender) throw "unable to find vender";

  const payload = {
    vender_id: findVender._id,
  };

  const vender_access_token = jwt.sign(payload, process.env.secret_key!);
  res.status(200).json({
    message: "registered successfully",
    vender_access_token: vender_access_token,
  });
};
export default venderSignUp;
