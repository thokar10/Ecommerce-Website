import { Request, Response } from "express";
import reusableMongoose from "../../../reusableMongoose";
import productModel from "../../../models/product.model";

const searchProduct = async (req: Request, res: Response) => {
  console.log(req.query);
  const queryData = await reusableMongoose({
    mongooseQuery: productModel.find({}),

    queryObject: req.query,

    searchFields: ["ProductName"],
  });

  const data = await queryData.query;

  res.status(200).json({
    status: "success",

    data,
  });
};

export default searchProduct;
