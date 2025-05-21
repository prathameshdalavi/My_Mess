import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import mainRouter from "./routes"; 
dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/v1", mainRouter); 
app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is running" });
});
async function main() {
  try {
    if (!process.env.MONGODB_URL) {
      throw new Error("MONGODB_URL is not defined in environment variables");
    }

    await mongoose.connect(process.env.MONGODB_URL);
    console.log(" MongoDB Connected Successfully!");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Initialization failed:", error);
    process.exit(1);
  }
}

main();
export default app;
