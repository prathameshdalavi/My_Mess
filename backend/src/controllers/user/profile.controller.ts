import { userModel } from "../../db";
import { Request, Response } from "express";
import { ApiResponse } from "../../utils/apiResponse";
import { profileService } from "../../services/user/profile.service";

export const profileController={
    async getProfile(req: Request, res: Response) {
        try{
            const profile=await profileService.getProfile(req.body.UserId);
            return new ApiResponse(res).success(profile,"Profile Fetched Successfully",200)
        }         
    catch(error){
        return new ApiResponse(res).error(error);
    }
}
}
