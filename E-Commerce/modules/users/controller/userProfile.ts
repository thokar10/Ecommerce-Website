import { Request, Response } from "express";
import userModel from "../../../models/user.model";

const userProfile = async (req: Request, res: Response) => {
  console.log(req.user);

  const user_id = req.user.user_id;

  console.log(user_id);

  const userDetails = await userModel.findOne({
    _id: user_id,
  });

  res.status(200).json({
    message: "welcome to user Profile ",
    userDetails,
  });
};
export default userProfile;
