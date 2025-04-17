import { z } from "zod";
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


export const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().min(1, "Comment cannot be empty"),
  hygieneRating: z.number().min(1).max(5),
  tasteRating: z.number().min(1).max(5),
});

export type ReviewInput = z.infer<typeof reviewSchema>;

export const validateReview = (data: unknown): ReviewInput => {
  const result = reviewSchema.safeParse(data);
  if (!result.success) {
    throw new Error(JSON.stringify({
      message: "Validation failed",
      errors: result.error.flatten()
    }));
  }
  return result.data;
};