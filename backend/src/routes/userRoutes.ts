import { Router, Request, Response } from "express";
import { z } from "zod";
import bcrypt from "bcrypt"
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "default_secret";
import { userMiddleware } from "../middleware";
const router = Router();
import { userModel, messModel, notificationModel, reviewModel, subscriptionModel, expenseModel, subscriptionPlanModel } from "../db";

router.post("/signup", async function (req: Request, res: Response) {
    const { email, password, name, role, phone, college, hostelAddress } = req.body;
    const requireBody = z.object({
        email: z.string().email(),
        password: z.string().min(6).max(30),
        name: z.string().min(3),
        role: z.enum(["student", "admin"]),
        phone: z.string().min(10).max(15),
        college: z.string(),
        hostelAddress: z.string()
    })
    try {
        const parseData = requireBody.safeParse(req.body);
        if (!parseData.success) {
            res.status(400).json({
                message: "Invalid Data", error: parseData.error.issues
            })
            return;
        }
    }
    catch (error) {
        if (error instanceof z.ZodError) {
            res.json({
                message: "Invalid Data",
                error: error.errors
            })
            return;
        }
    }
    try {
        const existingUser = await userModel.findOne({ email: email });
        if (existingUser) {
            res.status(409).json({
                message: "User Already Exists"
            })
            return;
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = await userModel.create({
            email: email,
            password: hashPassword,
            name: name,
            role: role,
            phone: phone,
            college: college,
            hostelAddress: hostelAddress,

        })
        const token = jwt.sign({ UserId: newUser._id }, JWT_SECRET, { expiresIn: "7d" });

        res.status(201).json({ message: " You are signed up successfully!", token });

    }
    catch (error) {
        res.status(500).json({
            message: "Error occured during signup",
        })
    }

})
router.post("/signin", async function (req: Request, res: Response) {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({
            message: "Email and Password are required"
        })
        return;
    }
    try {
        const response = await userModel.findOne({ email: email });
        if (!response) {
            res.status(401).json({
                message: "User does Not exist"
            })
            return
        }
        if (response.password && typeof response.password === "string") {
            const passwordMatch = await bcrypt.compare(password, response.password);
            if (passwordMatch) {
                const token = jwt.sign(
                    { UserId: response._id },
                    JWT_SECRET, { expiresIn: "7d" });
                res.json({
                    message: "You are signed in",
                    token: token
                });
                return
            } else {
                res.status(401).json({ message: "Incorrect Password" });
                return
            }
        }
    } catch (error) {
        res.status(500).json({
            message: "Error occured during signin",
        })
    }
})

router.get("/profile", userMiddleware, async (req: Request, res: Response) => {
    try {
        console.log(req.body.UserId);
        const user = await userModel.findById(req.body.UserId);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user", error });
    }
});
router.get("/mess", userMiddleware, async (req: Request, res: Response) => {
    const { messName } = req.body;
    try {
        const mess = await messModel.findOne({ name: messName });
        if (!mess) {
            res.status(404).json({ message: "No mess found for this admin" });
            return;
        }
        const user = await userModel.findById(req.body.UserId);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        user.ownerId = mess.owner;
        await user.save();
        res.json({
            message: "Mess assignment successful",
            mess
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching mess", error });
    }
});
router.get("/subcription", userMiddleware, async (req: Request, res: Response) => {
    try {
        const user = await userModel.findById(req.body.UserId);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        const adminId = user.ownerId;
        const subscription = await subscriptionPlanModel.findOne({ owner: adminId });
        if (!subscription) {
            res.status(404).json({ message: "No subscription found for this admin" });
            return;
        }
        res.json(subscription);
    } catch (error) {
        res.status(500).json({ message: "Error fetching subscription", error });
    }
});
router.post("/review", userMiddleware, async (req: Request, res: Response) => {

    const rates = z.object({
        rating: z.number().min(1).max(5),
        comment: z.string(),
        hygieneRating: z.number().min(1).max(5),
        tasteRating: z.number().min(1).max(5),
    })
    try {

        const parseData = rates.safeParse(req.body);
        if (!parseData.success) {
            res.status(400).json({
                message: "Invalid Data", error: parseData.error.issues
            })
            return;
        }
        const studentId = req.body.UserId;
        const user = await userModel.findById(studentId);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        const adminId = user.ownerId;

        const newReview = await reviewModel.create({ studentId: studentId, owner: adminId, ...parseData.data });
        res.json(newReview);
    } catch (error) {
        res.status(500).json({ message: "Error creating review", error });
    }
});
router.get("/notifications", userMiddleware, async (req: Request, res: Response) => {
    try {
        const user = await userModel.findById(req.body.UserId);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        const notifications = await notificationModel.find({ studentId: req.body.UserId });
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ message: "Error fetching notifications", error });
        }
});

export default router;
