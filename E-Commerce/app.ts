import express from "express";
import "express-async-errors";
import mongoose from "mongoose";
import cors from "cors";
import "./model";
import errorHandler from "./errorHandler";
import venderRouter from "./modules/VendorsDetails/vender.routes";
import productRouter from "./modules/Products/product.routes";
import userRouter from "./modules/users/user.routes";
import cartRouter from "./modules/Carts/carts.routes";
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.db_connect!, {})
  .then(() => {
    console.log("connection to the database successful");
  })
  .catch(() => {
    console.log("connection to database failed");
  });

app.use("/vendors", venderRouter);
app.use("/products", productRouter);
app.use("/users", userRouter);
app.use("/carts", cartRouter);

app.use(errorHandler);

app.listen("8000", () => {
  console.log("server started successfully");
});
