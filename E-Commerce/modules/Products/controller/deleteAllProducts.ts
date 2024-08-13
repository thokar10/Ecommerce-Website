import { Request, Response } from "express";
import productModel from "../../../models/product.model";
const deleteAllProducts = async (req: any, res: Response) => {
  const { vender_id } = req.vender;
  console.log(vender_id);
  const { product_id } = req.params;

  console.log(req.params);
  console.log(product_id);

  const findProduct = await productModel.findOneAndDelete({
    _id: product_id,
    venderId: vender_id,
  });
  if (!findProduct) throw "unable to delete the product";

  console.log(findProduct);
  res.status(200).json({
    status: "Product delete successful",
  });
};
export default deleteAllProducts;
