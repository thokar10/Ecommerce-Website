import { Request, Response } from "express";
import productModel from "../../../models/product.model";
import { toInteger } from "lodash";
const paginationOfAllProducts = async (req: Request, res: Response) => {
  const { page, pageLimit } = req.query;

  const page_no = toInteger(page);
  const page_limit = toInteger(pageLimit);

  const findAllProducts = await productModel
    .find({})
    .skip(page_no)
    .limit(page_limit);

  res.status(200).json({
    status: "success to find products",
    productDetails: findAllProducts,
  });
};
export default paginationOfAllProducts;
