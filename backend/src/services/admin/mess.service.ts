import { messModel } from "../../db";
import { validateMess } from "../../utils/validators";

export const messService = {
    async addMess(body: any) {
        const validatedMess = validateMess(body);
        const existingMess = await messModel.findOne({ name: validatedMess.name });
        if (existingMess) {
            throw new Error("Mess with this name already exists");
        }
        const newMess = await messModel.create(validatedMess);
        return newMess;
    },
    async updateMenu(body: any, owner: any) {
        const validatedMess = validateMess(body);
        const existingMess = await messModel.findOne({ name: validatedMess.name });
        if (!existingMess) {
            throw new Error("No mess found");
        }
        const updatedMess = await messModel.findOneAndUpdate(
            { owner: owner },
            { menu: validatedMess, updatedAt: new Date() },
            { new: true }
        );
        return updatedMess;
    },
    async getMess(owner: any) {
        const mess = await messModel.findOne({ owner });
        if (!mess) {
            throw new Error("No mess found");
        }
        return mess;
    },
    async deleteMess(owner: any) {
        const mess = await messModel.findOneAndDelete({ owner });
        if (!mess) {
            throw new Error("No mess found");
        }
        return mess;
    },

}