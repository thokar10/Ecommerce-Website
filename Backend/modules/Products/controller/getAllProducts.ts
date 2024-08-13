import { Request, Response } from "express";
import productModel from "../../../models/product.model";
const getAllProducts = async (req: any, res: Response) => {
  const { productName } = req.body;
  console.log(productName);

  const { vender_id } = req.vender;
  console.log(vender_id);

  const findProduct = await productModel.find({
    venderId: vender_id,
  });

  if (findProduct.length === 0) throw "unable to find the product";

  console.log(findProduct);
  res.status(200).json({
    status: "success to find products",
    productDetails: findProduct,
  });
};
export default getAllProducts;
