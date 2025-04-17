import bcrypt from "bcrypt";
import jwt,{sign} from "jsonwebtoken";

import { validateSignin, validateSignup } from "../utils/validators";
import { userModel } from "../db";
import dotenv from "dotenv";
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || "default_secret";
export const authService={
    async signup(data:any){
        const validatedData =validateSignup(data);
        const existingUser = await userModel.findOne({ email: validatedData.email });
        if (existingUser) {
            throw new Error("User Already Exists");
        }
        const hashPassword = await bcrypt.hash(validatedData.password, 10);
        const user=await userModel.create({
            ...validatedData,
            password:hashPassword,   
        })
        const token = jwt.sign({ UserId: user._id }, JWT_SECRET, { expiresIn: "7d" });
        return {user,token}
    },
    async signin(data:any){
        const validatedData=validateSignin(data);
        const user=await userModel.findOne({email:validatedData.email});
        if(!user){
            throw new Error("User does not exist");
        }
        if(!user.password){
            throw new Error("Password not found");
        }
        const passwordMatch=await bcrypt.compare(validatedData.password,user.password);
        if(!passwordMatch){
            throw new Error("Incorrect Password");
        }
        const token = jwt.sign({ UserId: user._id }, JWT_SECRET, { expiresIn: "7d" });
        return {user,token}
    }
}
