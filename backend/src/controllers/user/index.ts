
import { Router } from "express";
import authRouter from "./auth.controller";
import messRouter from "./mess.controller";
import profileRouter from "./profile.controller";
import reviewRouter from "./reveiw.controller";
import subscriptionRouter from "./subcription.controller";

const userRouter = Router();

userRouter.use("/api/v1/auth", authRouter);
userRouter.use("/api/v1/mess", messRouter);
userRouter.use("/api/v1/profile", profileRouter);
userRouter.use("/api/v1/review", reviewRouter);
userRouter.use("/api/v1/subscription", subscriptionRouter);

export default userRouter;