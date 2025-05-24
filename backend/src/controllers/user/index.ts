
import { Router } from "express";
import authRouter from "./auth.controller";
import messRouter from "./mess.controller";
import profileRouter from "./profile.controller";
import reviewRouter from "./reveiw.controller";
import subscriptionRouter from "./subcription.controller";

const userRouter = Router();

userRouter.use("/auth", authRouter);
userRouter.use("/mess", messRouter);
userRouter.use("/profile", profileRouter);
userRouter.use("/review", reviewRouter);
userRouter.use("/subscription", subscriptionRouter);

export default userRouter;