import { Request, Response } from "express";
import orderModel from "../../../../models/order.model";
import { Types } from "mongoose";
const cancelOrder = async (req: Request, res: Response) => {
  const { order_id } = req.query;
  console.log(order_id);

  if (!order_id) throw "order id is missing to cancel";

  const deleteOrder = await orderModel.findOneAndUpdate(
    {
      _id: new Types.ObjectId(order_id.toString()),
      userId: req.user.user_id,
    },
    {
      orderStatus: "canceled",
    }
  );

  if (!deleteOrder) throw "order cannot be deleted or no order  present";

  // // const statusOfOrder= await orderModel.findOne({
  // //   _id:order_id
  // })

  res.status(200).json({
    status: "order  cancel successful",
  });
};
export default cancelOrder;
