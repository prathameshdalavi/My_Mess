import { messService } from "../../services/user/mess.service";
import { ApiResponse } from "../../utils/apiResponse";

import { Request, Response } from "express";

export const messController = {
  async getMess(req: Request, res: Response) {
    try {
      const mess = await messService.getMess(req.body.messName, req.body.UserId);
      return new ApiResponse(res).success(
        mess,
        "Mess fetched successfully"
      );
    } catch (error) {
      return new ApiResponse(res).error(error);
    }
  },
};