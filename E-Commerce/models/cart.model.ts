import mongoose, { mongo } from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "products",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
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
  },
  {
    timestamps: true,
  }
);

const cartModel = mongoose.model("carts", cartSchema);
export default cartModel;
