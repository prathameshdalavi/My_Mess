import { reviewService } from "../../services/user/review.service";
import { ApiResponse } from "../../utils/apiResponse";
import { Request, Response } from "express";
import { validateReview } from "../../utils/validators";
export const reviewController={
    async createReview(req: Request, res: Response) {
        try {
            const validatedData = validateReview(req.body);
            const review = await reviewService.createReview(validatedData, req.body.UserId);
            if (!review) {
                return new ApiResponse(res).error("Review not created");
            }
            return new ApiResponse(res).success(review, "Review created successfully");
        } catch (error) {
            return new ApiResponse(res).error(error);
        }
    },
}