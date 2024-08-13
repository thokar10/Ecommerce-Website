import { Request, Response } from "express";
import venderModel from "../../../models/vendorModel";
import orderModel from "../../../models/order.model";
import productModel from "../../../models/product.model";

const venderProductOrderList = async (req: any, res: Response) => {
  const vender_id = req.vender.vender_id;

  const orderProductList: any = await orderModel
    .find({
      venderId: vender_id,
    })
    .populate("productId", "ProductName ProductPrice ProductImage");

  if (orderProductList.length == 0) throw "no product is ordered by customer";

  res.status(200).json({
    status: "good",
    allProducts: orderProductList,
  });
};
export default venderProductOrderList;
