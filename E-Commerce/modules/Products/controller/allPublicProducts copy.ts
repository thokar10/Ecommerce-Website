import { Request, Response } from "express";
import productModel from "../../../models/product.model";
import { toInteger } from "lodash";
const allPublicProducts = async (req: Request, res: Response) => {
  const { page, page_limit } = req.query;

  const page_no = toInteger(page);
  console.log(page_no);
  console.log(req.query);
  const findAllProducts = await productModel.find({}).skip(page_no);

  res.status(200).json({
    status: "success to find products",
    productDetails: findAllProducts,
  });
};
export default allPublicProducts;
