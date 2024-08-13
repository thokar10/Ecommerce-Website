import { Request, Response } from "express";
import cartModel from "../../../../models/cart.model";
import productDetails from "../../../Products/controller/productDetails";
import orderModel from "../../../../models/order.model";
import mongoose from "mongoose";
import { populate } from "dotenv";
const getOrderDetails = async (req: Request, res: Response) => {
  const details = await orderModel
    .find({
      userId: req.user.user_id,
    })
    .populate(["userId", "productId"]);

  if (!details) throw "error in getting order details";

  res.status(200).json({
    status: "order  details",
    OrderDetails: details,
  });
};
export default getOrderDetails;
