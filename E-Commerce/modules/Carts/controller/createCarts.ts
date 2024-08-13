import { Request, Response } from "express";
import validator from "validator";
import { Types } from "mongoose";
import cartModel from "../../../models/cart.model";
import productModel from "../../../models/product.model";
const createCarts = async (req: Request, res: Response) => {
  console.log(req.user);

  const { product_id } = req.query;
  const { Quantity, ProductPrice } = req.body;

  if (!ProductPrice) throw "price should be included";
  if (!product_id) throw "product id is required";
  const productObjectId = new Types.ObjectId(product_id.toString());
  if (!validator.isMongoId(product_id.toString()))
    throw "not valid product id ";

  const { user_id } = req.user;
  if (!user_id) throw "user id is required";
  if (!Quantity) throw "Quantity is required";

  const findExistedProductInCart = await cartModel.findOne({
    productId: productObjectId,
  });

  const totalAmountOfProduct = ProductPrice * Quantity;

  if (!findExistedProductInCart) {
    const findVenderIdOfProduct = await productModel.findOne({
      _id: product_id,
    });

    const vender_id = findVenderIdOfProduct?.venderId;
    if (!vender_id) throw "vender id not found";
    const createCart = await cartModel.create({
      productId: product_id,
      Quantity,
      userId: user_id,
      totalPrice: totalAmountOfProduct,
      venderId: vender_id,
    });

    if (!createCart) throw "cannot able to add into the cart";
  } else {
    await cartModel.updateOne(
      {
        productId: productObjectId,
      },
      {
        $inc: {
          Quantity,
          totalPrice: ProductPrice,
        },
      }
    );
  }

  res.status(200).json({
    status: "cart created successful",
  });
};
export default createCarts;
