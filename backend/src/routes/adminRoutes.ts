import e, { Router, Request, Response } from "express";
import { record, z } from "zod";
import bcrypt from "bcrypt"
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "default_secret";
import { userMiddleware } from "../middleware";
const router = Router();
import { userModel, messModel, notificationModel, reviewModel, subscriptionModel, expenseModel, subscriptionPlanModel } from "../db";

router.post("/signup", async function (req: Request, res: Response) {
    console.log(1);
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
        console.log(2);
        const newUser = await userModel.create({
            email: email,
            password: hashPassword,
            name: name,
            role: role,
            phone: phone,
            college: college,
            hostelAddress: hostelAddress,

        })
        console.log(3);
        if (!JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined");
        }

        const token = jwt.sign(
            { userId: newUser._id },
            JWT_SECRET,
            { expiresIn: "7d" }
        );

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

router.post("/addmess",userMiddleware, async function (req: Request, res: Response) {
    const givenBody = z.object({
        name: z.string(),
        location: z.string(),
        capacity: z.number(),
        menu: z.array(z.object({
            day: z.string(),
            meals: z.object({
                breakfast: z.array(z.string()),
                lunch: z.array(z.string()),
                dinner: z.array(z.string()),
                snacks: z.array(z.string())
            })
        }))
    })

    try {
        const parsedBody = givenBody.safeParse(req.body);

        if (!parsedBody.success) {
            res.status(400).json({
                message: "Invalid Data",
                error: parsedBody.error.issues
            });
            return;
        }
        const existingMess = await messModel.findOne({ owner: req.body.UserId });
        if (existingMess) {
            res.status(409).json({
                message: "Mess with this name already exists"
            });
            return;
        }
        const newMess = await messModel.create({
            name: parsedBody.data.name,
            location: parsedBody.data.location,
            capacity: parsedBody.data.capacity,
            menu: parsedBody.data.menu,
            owner: req.body.UserId
        });

        res.status(201).json({
            message: "Mess created successfully",
            mess: {
                owner: newMess.owner,
                name: newMess.name,
                location: newMess.location,
                capacity: newMess.capacity,
                menu: newMess.menu
            }


        });

    }
    catch (error) {
        console.error("Error creating mess:", error);
        res.status(500).json({
            message: "Internal server error while creating mess"
        });
        return;
    }
})
router.put("/update-menu", userMiddleware, async (req: Request, res: Response) => {
    const { menu } = req.body;
    const menuSchema = z.array(z.object({
        day: z.string(),
        meals: z.object({
            breakfast: z.array(z.string()),
            lunch: z.array(z.string()),
            dinner: z.array(z.string()),
            snacks: z.array(z.string())
        })
    }));

    const parseResult = menuSchema.safeParse(menu);

    if (!parseResult.success) {
        res.status(400).json({
            message: "Invalid menu data",
            error: parseResult.error.issues
        });
        return;
    }

    try {
        const updatedMess = await messModel.findOneAndUpdate(
            { owner: req.body.UserId },
            { menu: parseResult.data, updatedAt: new Date() },
            { new: true }
        );

        if (!updatedMess) {
            res.status(404).json({ message: "Mess not found" });
            return;
        }

        res.json({
            message: "Menu updated successfully",
            mess: updatedMess
        });

    } catch (error) {
        console.error("Error updating menu:", error);
        res.status(500).json({ message: "Internal server error while updating menu" });
        return;
    }
});
router.delete("/delete-mess/", userMiddleware, async (req: Request, res: Response) => {
    const owner: string = req.body.UserId;
    try {
        const deletedMess = await messModel.findOneAndDelete({ owner });
        if (!deletedMess) {
            res.status(404).json({ message: "Mess not found" });
            return;
        }
        res.json({ message: "Mess deleted successfully" });
    } catch (error) {
        console.error("Error deleting mess:", error);
        res.status(500).json({ message: "Internal server error while deleting mess" });
        return;
    }
});
router.get("/mess", userMiddleware, async (req: Request, res: Response) => {
    try {
        const mess = await messModel.findOne({ owner: req.body.UserId });
        if (!mess) {
            res.status(404).json({ message: "No mess found for this admin" });
            return;
        }
        res.json(mess);
    } catch (error) {
        res.status(500).json({ message: "Error fetching mess", error });
    }
});
router.post("/subscription-plans", userMiddleware, async (req: Request, res: Response) => {
    const planSchema = z.object({
        name: z.string().min(3),
        description: z.string().optional(),
        amount: z.number().positive(),
        durationDays: z.number().positive(),
        features: z.array(z.string()).optional(),
        isActive: z.boolean().optional()
    });
    try {
        // Check if user is admin
        const user = await userModel.findById(req.body.UserId);
        if (!user || user.role !== "admin") {
            res.status(403).json({ message: "Only admins can create subscription plans" });
            return;
        }

        const parsedData = planSchema.safeParse(req.body);
        if (!parsedData.success) {
            res.status(400).json({
                message: "Invalid data",
                errors: parsedData.error.issues
            });
            return;
        }

        const newPlan = await subscriptionPlanModel.create({
            name: parsedData.data.name,
            description: parsedData.data.description,
            amount: parsedData.data.amount,
            owner: req.body.UserId,
            durationDays: parsedData.data.durationDays,
            features: parsedData.data.features || [],
            isActive: parsedData.data.isActive !== false
        });

        res.status(201).json({
            message: "Subscription plan created successfully",
            plan: newPlan
        });

    } catch (error) {
        console.error("Error creating subscription plan:", error);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
});

router.get("/subscription-plans", userMiddleware, async (req: Request, res: Response) => {
    try {
        const plans = await subscriptionPlanModel.find({ owner: req.body.UserId, isActive: true });
        res.json(plans);
    } catch (error) {
        console.error("Error fetching subscription plans:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
router.delete("/subscription-plan", userMiddleware, async (req: Request, res: Response) => {
    try {
        const user = await userModel.findById(req.body.UserId);
        if (!user || user.role !== "admin") {
            res.status(403).json({ message: "Only admins can delete subscription plans" });
            return;
        }
        const activeSubscriptions = await subscriptionModel.countDocuments({
            owner: req.body.UserId,
            isActive: true
        });
        if (activeSubscriptions > 0) {
            res.status(400).json({
                message: "Cannot delete plan with active subscriptions. Deactivate it instead."
            });
            return;
        }

        const deletedPlan = await subscriptionPlanModel.findByIdAndDelete(req.body.userId);
        if (!deletedPlan) {
            res.status(404).json({ message: "Subscription plan not found" });
            return;
        }

        res.json({ message: "Subscription plan deleted successfully" });
    } catch (error) {
        console.error("Error deleting subscription plan:", error);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
});
const getAdminMess = async (userId: string) => {
    return await messModel.findOne({ owner: userId });
};
router.post("/expenses", userMiddleware, async (req: Request, res: Response) => {
    const ExpenseSchema = z.object({
        category: z.enum(["groceries", "staff", "utilities", "maintenance"]),
        amount: z.number().positive(),
        description: z.string().optional(),
        receiptImage: z.string().optional(),
        date: z.string().datetime().optional()
    });
    console.log("1st");
    try {
        const user = await userModel.findById(req.body.UserId);
        console.log("2nd");
        if (!user || user.role !== "admin") {
            res.status(403).json({ message: "Only admins can add expenses" });
            return;
        }
        const mess = await getAdminMess(req.body.UserId);
        if (!mess) {
            res.status(400).json({ message: "You don't have a mess assigned" });
            return;
        }
console.log("3rd");
        const parsedData = ExpenseSchema.safeParse(req.body);
        if (!parsedData.success) {
            res.status(400).json({
                message: "Invalid data",
                errors: parsedData.error.issues
            });
            return;
        }

        const newExpense = await expenseModel.create({
           
            category: parsedData.data.category,
            amount: parsedData.data.amount,
            description: parsedData.data.description,
            receiptImage: parsedData.data.receiptImage,
            recordedBy: req.body.UserId,
            date: parsedData.data.date ? new Date(parsedData.data.date) : new Date()
        });

        res.status(201).json({
            message: "Expense recorded successfully",
            expense: newExpense
        });

    } catch (error) {
        console.error("Error adding expense:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
router.get("/expenses", userMiddleware, async (req: Request, res: Response) => {
    try {
        // 1. Verify admin user
        const user = await userModel.findById(req.body.UserId);
        if (!user || user.role !== "admin") {
             res.status(403).json({ message: "Only admins can view expenses" });
            return;
        }

        // 2. Fetch expenses for this admin (no array wrapper)
        const data = await expenseModel.find({ recordedBy: req.body.UserId })

        // 3. Return raw expense objects (not wrapped in an array)
        res.json(data); // Return first expense (or loop if multiple)
    } catch (error) {
        console.error("Error fetching expenses:", error);
        res.status(500).json({ message: "Server error" });
    }
});

router.delete("/expenses", userMiddleware, async (req: Request, res: Response) => {


    try {
        const user = await userModel.findById(req.body.UserId);
        if (!user || user.role !== "admin") {
            res.status(403).json({ message: "Only admins can delete expenses" });
            return;
        }
        const mess = await getAdminMess(req.body.UserId);
        if (!mess) {
            res.status(400).json({ message: "You don't have a mess assigned" });
            return;
        }
        const expense = await expenseModel.findOne({
            messId: mess._id
        });

        if (!expense) {
            res.status(404).json({ message: "Expense not found or not deletable by you" });
            return;
        }

        await expenseModel.findByIdAndDelete(expense._id);

        res.json({ message: "Expense deleted successfully" });

    } catch (error) {
        console.error("Error deleting expense:", error);
        res.status(500).json({ message: "Internal server error" });
        return
    }
});

router.get("reviews", userMiddleware, async (req: Request, res: Response) => {
    try {
        const user = await userModel.findById(req.body.UserId);
        if (!user || user.role !== "admin") {
            res.status(403).json({ message: "Only admins can view reviews" });
            return;
        }
        const mess = await getAdminMess(req.body.UserId);
        if (!mess) {
            res.status(400).json({ message: "You don't have a mess assigned" });
            return;
        }
        const reviews = await reviewModel.find({ messId: mess._id });
        res.json(reviews);
    } catch (error) {
        console.error("Error fetching reviews:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
router.post("/notifications", userMiddleware, async (req: Request, res: Response) => {
    try {
        // 1. Verify admin user
        const admin = await userModel.findById(req.body.UserId);
        if (!admin || admin.role !== "admin") {
            res.status(403).json({ message: "Only admins can send notifications" });
            return;
        }

        // 2. Get the admin's mess
        const mess = await messModel.findOne({ owner: req.body.UserId });
        if (!mess) {
            res.status(400).json({ message: "You don't have a mess assigned" });
            return;
        }

        // 3. Validate notification message
        const { message, studentId } = req.body;
        if (!message) {
            res.status(400).json({ message: "Notification message is required" });
            return;
        }

        // 4. Check if sending to a specific student or all students
        if (studentId) {
            // --- SINGLE STUDENT NOTIFICATION ---
            // Validate student exists and belongs to this mess
            const student = await userModel.findOne({
                _id: studentId,
                owner: req.body.UserId,
                role: "student"
            });

            if (!student) {
                res.status(404).json({ message: "Student not found in your mess" });
                return;
            }

            // Create notification
            const notification = await notificationModel.create({
                studentId: student._id,
                owner: req.body.UserId,
                message: message
            });

            res.json({
                success: true,
                message: "Notification sent to student successfully",
                notification: notification
            });

        } else {
            // --- BULK NOTIFICATION TO ALL STUDENTS ---
            const students = await userModel.find({
                owner: req.body.UserId,
                role: "student"
            });

            if (students.length === 0) {
                res.status(404).json({ message: "No students found in your mess" });
                return;
            }

            const notifications = await Promise.all(
                students.map(student =>
                    notificationModel.create({
                        studentId: student._id,
                        owner: req.body.UserId,
                        message: message
                    })
                )
            );

            res.json({
                success: true,
                message: `Notification sent to ${notifications.length} students`,
                count: notifications.length
            });
        }

    } catch (error) {
        console.error("Error sending notification:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error
        });
    }
});

export default router;