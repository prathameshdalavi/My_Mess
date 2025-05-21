import { reviewService } from "../../services/user/review.service";
import { ApiResponse } from "../../utils/apiResponse";
import { Request, Response, Router } from "express";
import { validateReview } from "../../utils/validators";
import { userMiddleware } from "../../middleware";
const router = Router();
    router.post("/createReview",userMiddleware, async function (req: Request, res: Response) {
        try {
            const validatedData = validateReview(req.body);
            const review = await reviewService.createReview(validatedData, req.body.UserId);
            if (!review) {
                new ApiResponse(res).error("Review not created");
                return
            }
            new ApiResponse(res).success(review, "Review created successfully");
            return
        } catch (error) {
            new ApiResponse(res).error(error);
            return
        }
    })

export default router