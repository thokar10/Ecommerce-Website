import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    venderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    ProductName: {
      type: String,
      required: true,
    },
    ProductImage: {
      type: String,
      required: true,
    },
    ProductPrice: {
      type: Number,
      required: true,
    },
    ProductCategory: {
      type: String,
      required: true,
    },
    ProductDescription: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const productModel = mongoose.model("products", productSchema);
export default productModel;
