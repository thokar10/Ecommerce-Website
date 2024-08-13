import { Request, Response } from "express";
import productModel from "../../../models/product.model";
const productDetailsByCategory = async (req: any, res: Response) => {
  const { category_name } = req.query;
  if (!req.query) throw "unable to get query";

  const productData = await productModel.find({
    ProductCategory: { $regex: new RegExp(category_name, "i") },
  });

  if (productData.length === 0) throw "unable to get data";

  res.status(200).json({
    status: "get successfully",
    productDetails: productData,
  });
};
export default productDetailsByCategory;
