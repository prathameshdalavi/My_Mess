import {z} from "zod";
export const validateSignup = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(30),
    name: z.string().min(3),
    role: z.enum(["student", "admin"]),
    phone: z.string().min(10).max(15),
    college: z.string(),
    hostelAddress: z.string()   
}).parse
export const validateSignin = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(30)
}).parse
