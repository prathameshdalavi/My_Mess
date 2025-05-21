// src/routes/index.ts
import { Router } from "express";
import userRouter from "../controllers/user";
import adminRouter from "../controllers/admin";

const mainRouter = Router();

mainRouter.use("/user", userRouter);     // Access via /api/v1/user/*
mainRouter.use("/admin", adminRouter);   // Access via /api/v1/admin/*

export default mainRouter;
