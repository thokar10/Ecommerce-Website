import Router from "express";
import userRegister from "./controller/userRegister";
import userAuthorization from "./userAuthorization";
import userProfile from "./controller/userProfile";
import userLogin from "./controller/userLogin";
import verifyToResetPassword from "./controller/verifyToResetPassword";
import resetPassword from "./controller/resetPassword";

const userRouter = Router();

userRouter.post("/Register", userRegister);
userRouter.post("/login", userLogin);
userRouter.get("/verifyUser/resetPassword", verifyToResetPassword);
userRouter.post("/resetPassword", resetPassword);

userRouter.use(userAuthorization);

userRouter.get("/profile", userProfile);

export default userRouter;
