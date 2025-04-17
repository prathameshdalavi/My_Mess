import { reviewModel, userModel } from "../../db";
import { validateReview } from "../../utils/validators";
export const reviewService={
    async createReview(review:any,userId:string){
        const validatedData=validateReview(review);
        const user=await userModel.findById(userId);
        if(!user){
            throw new Error("User not found");
        }
        const adminId=user.ownerId;
        const newReview=await reviewModel.create({studentId:userId,owner:adminId,...validatedData});
        return newReview
    } 
    
}