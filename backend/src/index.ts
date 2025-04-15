import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import adminRoutes from "./routes/adminRoutes";
import userR from "./routes/userRoutes";
import userRoutes from "./routes/userRoutes";

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/user", userRoutes);
async function main() {
    try {
        await mongoose.connect(process.env.MONGODB_URL || "");
        console.log("MongoDB Connected Successfully!");
    } catch (error) {
        console.error("MongoDB Connection Failed:", error);
    }
}
main();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});