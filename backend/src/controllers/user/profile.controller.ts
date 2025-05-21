import { userModel } from "../../db";
import { Request, Response, Router } from "express";
import { ApiResponse } from "../../utils/apiResponse";
import { profileService } from "../../services/user/profile.service";
import { userMiddleware } from "../../middleware";
const router=Router();

    router.get("/getProfile",userMiddleware, async function (req: Request, res: Response) {
        try{
            const profile=await profileService.getProfile(req.body.UserId);
            new ApiResponse(res).success(profile,"Profile Fetched Successfully",200)
            return
        }         
    catch(error){
        new ApiResponse(res).error(error);
        return
    }
})
export default router
