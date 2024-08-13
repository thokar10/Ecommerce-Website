import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "products",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    venderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    Quantity: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
    },
    orderStatus: {
      type: String,
      default: "order_placed",
      enum: ["canceled", "delivered", "pending", "order_placed"],
    },
  },
  {
    timestamps: true,
  }
);

const orderModel = mongoose.model("orders", orderSchema);
export default orderModel;
