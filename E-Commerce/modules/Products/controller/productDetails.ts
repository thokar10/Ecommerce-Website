import { Request, Response } from "express";
import productModel from "../../../models/product.model";
const productDetails = async (req: any, res: Response) => {
  const { product_id } = req.params;
  if (!req.params) throw "unable to get params";

  const productData = await productModel.findOne({
    _id: product_id,
  });

  if (!productData) throw "unable to get data";

  res.status(200).json({
    status: "get successfully",
    productDetails: productData,
  });
};
export default productDetails;
