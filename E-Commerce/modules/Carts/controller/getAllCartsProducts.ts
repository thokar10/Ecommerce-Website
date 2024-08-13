import { Request, Response } from "express";
import cartModel from "../../../models/cart.model";
const getAllCartProducts = async (req: Request, res: Response) => {
  const user_id = req.user.user_id;
  const allCartsProducts = await cartModel
    .find({
      userId: user_id,
    })
    .populate("productId", "ProductName ProductPrice ProductImage");

  if (!allCartsProducts) throw "unable to find your products";

  const NumberOfProducts = allCartsProducts.length;

  let TotalAmount = 0;
  allCartsProducts.map((arrayElement) => {
    TotalAmount = TotalAmount + arrayElement.totalPrice!;
  });

  if (!allCartsProducts) throw "invalid in finding products of carts";
  res.status(200).json({
    status: "Product get successful",
    ProductDetails: allCartsProducts,
    TotalAmountOfCart: TotalAmount,
    ProductsNumber: NumberOfProducts,
  });
};
export default getAllCartProducts;
