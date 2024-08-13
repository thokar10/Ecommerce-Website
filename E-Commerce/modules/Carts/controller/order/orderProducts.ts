import { Request, Response } from "express";
import cartModel from "../../../../models/cart.model";
import productDetails from "../../../Products/controller/productDetails";
import orderModel from "../../../../models/order.model";
import mongoose from "mongoose";
const orderProducts = async (req: Request, res: Response) => {
  const getCartProducts = await cartModel.find({
    userId: req.user.user_id,
  });
  if (getCartProducts.length === 0) throw "unable to find products in carts";

  let orderCollection: any = [];
  getCartProducts.map(async (element) => {
    orderCollection.push({
      productId: element.productId,
      userId: element.userId,
      Quantity: element.Quantity,
      totalPrice: element.totalPrice,
      venderId: element.venderId,
    });
  });

  if (orderCollection.length == 0)
    throw "no products to insert into order model";

  const session = await mongoose.startSession();
  await session.withTransaction(async (session: any) => {
    const create = await orderModel.insertMany(orderCollection, { session });
    console.log(create);

    await cartModel.deleteMany(
      {
        userId: req.user.user_id,
      },
      { session }
    );
  });

  res.status(200).json({
    status: "order added  successful",
  });
};
export default orderProducts;
