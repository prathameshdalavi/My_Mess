import { messModel, userModel } from "../../db";


export const messService = {
    async getMess(messName: string, userId: string) {
        const mess = await messModel.findOne({ name: messName });
        if (!mess) throw new Error("No mess found");

        const user = await userModel.findById(userId);
        if (!user) throw new Error("User not found");

        user.ownerId = mess.owner;
        await user.save();

        return mess;


    }

}