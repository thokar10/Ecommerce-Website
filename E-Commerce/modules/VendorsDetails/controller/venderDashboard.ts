import { Request, Response } from "express";
import venderModel from "../../../models/vendorModel";

const venderDashboard = async (req: any, res: Response) => {
  console.log(req.vender);
  const vender_id = req.vender.vender_id;

  const venderDetail = await venderModel.findOne({
    _id: vender_id,
  });

  if (!venderDetail) throw " unable to find vender details";
  res.status(200).json({
    message: "welcome to  dashboard",
    venderDetails: venderDetail,
  });
};
export default venderDashboard;
