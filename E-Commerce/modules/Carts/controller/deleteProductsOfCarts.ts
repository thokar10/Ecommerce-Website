import { Request, Response } from "express";
import cartModel from "../../../models/cart.model";
const deleteProductsOfCarts = async (req: Request, res: Response) => {
  console.log(req.query);

  const { cartProductId } = req.query;
  const { user_id } = req.user;
  if (!cartProductId) throw "cart product id is required";

  const deleteCart = await cartModel.findOneAndDelete(
    {
      _id: cartProductId,
      userId: user_id,
    },
    {
      _id: cartProductId,
    }
  );
  if (!deleteCart) throw "unable to delete the cart";

  // const updateValue = await cartModel.findOneAndUpdate(
  //   {
  //     _id: cartProductId,
  //   },
  //   {
  //     $inc: {
  //       Quantity: -1,
  //       totalPrice: unitPriceOfProduct * -1,
  //     },
  //   },
  //   {
  //     new: true,
  //   }
  // );
  // if (!updateValue) throw "Invalid to delete the cart";

  res.status(200).json({
    status: "Product delete successful",
  });
};
export default deleteProductsOfCarts;
