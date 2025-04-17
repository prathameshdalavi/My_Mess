import { Request, Response } from "express";
import { authService } from "../../services/auth.service";
import { ApiResponse } from "../../utils/apiResponse";
import { sign } from "jsonwebtoken";
export const authController={
    async signup(req: Request, res: Response) {
        try{
            const {user,token}=await authService.signup(req.body);
            return new ApiResponse(res).success({user,token},"User Created Successfully",201)
        }
        catch(error){
            return new ApiResponse(res).error(error);
        }
    },
    async signin(req: Request, res: Response) {
        try{
            const {user,token}=await authService.signin(req.body);
            return new ApiResponse(res).success({user,token},"User Signed In Successfully",200)
        }
        catch(error){
            return new ApiResponse(res).error(error);
        }
}
}
