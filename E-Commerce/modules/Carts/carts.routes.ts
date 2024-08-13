import { Router } from "express";
import userAuthorization from "../users/userAuthorization";
import createCarts from "./controller/createCarts";
import getAllCartProducts from "./controller/getAllCartsProducts";
import deleteProductsOfCarts from "./controller/deleteProductsOfCarts";
import orderProducts from "./controller/order/orderProducts";
import getOrderDetails from "./controller/order/getOrderDetails";
import cancelOrder from "./controller/order/cancelOrder";
import updateCarts from "./controller/updateCarts";

const cartRouter = Router();

cartRouter.use(userAuthorization);
cartRouter.post("/create", createCarts);
cartRouter.get("/getAllProducts", getAllCartProducts);
cartRouter.delete("/deleteProducts", deleteProductsOfCarts);
cartRouter.delete("/deleteProducts", deleteProductsOfCarts);
cartRouter.patch("/updateCarts", updateCarts);

cartRouter.post("/orderProducts", orderProducts);
cartRouter.get("/getOrderDetails", getOrderDetails);
cartRouter.delete("/cancelOrder", cancelOrder);
export default cartRouter;
