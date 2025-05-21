// controllers/admin/index.ts
import { Router } from "express";
import authRouter from "./auth.controller";
import messRouter from "./mess.controller"; 
import { userMiddleware } from "../../middleware";

const adminRouter = Router()

adminRouter.use("/auth", authRouter);
adminRouter.use("/mess", messRouter);

export default adminRouter