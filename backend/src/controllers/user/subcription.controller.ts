import { subcriptionService } from "../../services/user/subcription.service";
import { Request, Response, Router } from "express";
import { ApiResponse } from "../../utils/apiResponse";
import { userMiddleware } from "../../middleware";

const router=Router();
router.get("/getSubcription",userMiddleware,async function(req:Request, res:Response){
        try{
            const subcription=await subcriptionService.getSubscription(req.body.UserId);
            new ApiResponse(res).success(subcription,"Subcription Fetched Successfully",200)
            return
        }
        catch(error){
            new ApiResponse(res).error(error);
            return
    }
})
export default router