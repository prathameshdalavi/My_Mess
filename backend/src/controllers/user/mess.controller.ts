import { userMiddleware } from "../../middleware";
import { messService } from "../../services/user/mess.service";
import { ApiResponse } from "../../utils/apiResponse";

import { Request, Response, Router } from "express";
const router = Router();

  router.get("/getMess",userMiddleware, async function (req: Request, res: Response) {
    try {
      const mess = await messService.getMess(req.body.messName, req.body.UserId);
      new ApiResponse(res).success(
        mess,
        "Mess fetched successfully"
      );
      return;
    } catch (error) {
      new ApiResponse(res).error(error);
      return;
    }
  });
  
  export default router;
