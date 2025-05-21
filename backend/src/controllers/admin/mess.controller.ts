import { userMiddleware } from "../../middleware";
import { messService } from "../../services/admin/mess.service";
import { ApiResponse } from "../../utils/apiResponse";
import { Request, Response, Router } from "express";

const router = Router();

router.post("/addMess",userMiddleware, async function (req: Request, res: Response) {
    try {
        const mess = await messService.addMess(req.body);
        new ApiResponse(res).success(mess, "Mess added successfully");
        return;
    } catch (error) {
        new ApiResponse(res).error(error);
        return;
    }
}),
    router.post("/updateMenu",userMiddleware, async function (req: Request, res: Response) {
        try {
            const owner = req.body.UserId;
            const mess = await messService.updateMenu(req.body, owner);
            new ApiResponse(res).success(mess, "Menu updated successfully");
            return;
        } catch (error) {
            new ApiResponse(res).error(error);
            return;
        }
    }),
    router.get("/getMess",userMiddleware, async function (req: Request, res: Response) {
        try {
            const owner = req.body.UserId;
            const mess = await messService.getMess(owner);
            new ApiResponse(res).success(mess, "Mess fetched successfully");
            return;
        } catch (error) {
            new ApiResponse(res).error(error);
            return;
        }
    }),
    router.delete("/deleteMess",userMiddleware, async function (req: Request, res: Response) {
        try {
            const owner = req.body.UserId;
            const mess = await messService.deleteMess(owner);
            new ApiResponse(res).success(mess, "Mess deleted successfully");
            return;
        } catch (error) {
            new ApiResponse(res).error(error);
            return;
        }
    })
export default router;