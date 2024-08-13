import { Router } from "express";
import allProducts from "./controller/createProducts";
import productAuthorization from "./handler/productAuthorization";
import createProducts from "./controller/createProducts";
import getAllProducts from "./controller/getAllProducts";
import deleteAllProducts from "./controller/deleteAllProducts";
import editProducts from "./controller/editProducts";
import allPublicProducts from "./controller/paginationOfAllProducts";
import productDetails from "./controller/productDetails";
import searchProduct from "./controller/searchProduct";
import randomProducts from "./controller/randomProducts";
import paginationOfAllProducts from "./controller/paginationOfAllProducts";
import productDetailsByCategory from "./controller/productDetailsByCategory";

const productRouter = Router();

productRouter.get("/allProducts", allPublicProducts);
productRouter.get("/categories", productDetailsByCategory);
productRouter.get("/allPages", paginationOfAllProducts);
productRouter.get("/randomProducts", randomProducts);
productRouter.get("/searchProducts", searchProduct);
productRouter.get("/productDetails/:product_id", productDetails);

productRouter.use(productAuthorization);
productRouter.post("/createProducts", createProducts);
productRouter.get("/getAllProducts", getAllProducts);
productRouter.delete("/deleteAllProducts/:product_id", deleteAllProducts);
productRouter.post("/editProducts/:product_id", editProducts);

export default productRouter;
