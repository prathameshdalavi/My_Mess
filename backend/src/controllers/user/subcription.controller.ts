import { subcriptionService } from "../../services/user/subcription.service";
import { Request, Response } from "express";
import { ApiResponse } from "../../utils/apiResponse";

export const subcriptionController={
    async getSubcription(req:Request, res:Response){
        try{
            const subcription=await subcriptionService.getSubscription(req.body.UserId);
            return new ApiResponse(res).success(subcription,"Subcription Fetched Successfully",200)
        }
        catch(error){
            return new ApiResponse(res).error(error);
    }
}
}    