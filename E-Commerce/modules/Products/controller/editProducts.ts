import { Request, Response } from "express";
import productModel from "../../../models/product.model";
const editProducts = async (req: any, res: Response) => {
  console.log(req.body);
  const { ProductName, ProductImage } = req.body;

  const { product_id } = req.params;
  console.log(product_id);

  const vender_id = req.vender.vender_id;
  console.log(vender_id);

  const CreateProduct = await productModel.findOneAndUpdate(
    {
      venderId: vender_id,
      _id: product_id,
    },
    {
      ProductName,
      ProductImage,
    }
  );

  if (!CreateProduct) throw "unable to edit a product";

  res.status(200).json({
    status: "edited successfully",
  });
};
export default editProducts;
