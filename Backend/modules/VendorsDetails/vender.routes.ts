import { Router } from "express";
import venderSignUp from "./controller/venderSignUp";
import venderLogin from "./controller/venderLogin";
import authorization from "./controller/authorization";
import venderDashboard from "./controller/venderDashboard";
import venderProductOrderList from "./controller/venderOrderProducts";

const venderRouter = Router();

venderRouter.post("/signUp", venderSignUp);
venderRouter.post("/login", venderLogin);

venderRouter.use(authorization);

venderRouter.post("/dashboard", venderDashboard);

venderRouter.get("/orderDetails", venderProductOrderList);

export default venderRouter;
