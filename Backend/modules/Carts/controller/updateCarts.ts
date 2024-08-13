import { Request, Response } from "express";
import cartModel from "../../../models/cart.model";
const updateCarts = async (req: Request, res: Response) => {
  const { cart_id } = req.query;
  const { Quantity } = req.body;
  if (!cart_id) throw "Cart id is required";

  const { user_id } = req.user;

  const findCart = await cartModel.findOne({
    _id: cart_id,
    userId: user_id,
  });

  if (!findCart) throw "unable to find the existing data of that cart item";

  const singleProductPrice = findCart.totalPrice! / findCart.Quantity;
  console.log(singleProductPrice);

  const cartDetails = await cartModel.findOneAndUpdate(
    {
      _id: cart_id,
    },
    {
      Quantity,
      totalPrice: Quantity * singleProductPrice,
    }
  );
  if (!cartDetails) throw "unable to update the cart ";

  res.status(200).json({
    status: "update successful",
  });
};
export default updateCarts;
