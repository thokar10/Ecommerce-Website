import { Request, Response } from "express";
import productModel from "../../../models/product.model";
const randomProducts = async (req: Request, res: Response) => {
  const randomDocument = await productModel.aggregate([
    { $sample: { size: 10 } },
  ]);

  res.status(200).json({
    status: "success to find products",
    productDetails: randomDocument,
  });
};
export default randomProducts;
