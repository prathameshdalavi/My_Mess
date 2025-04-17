
import { userModel } from "../../db";
export const profileService={   
    async getProfile(userId: string) {
        const user = await userModel.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }
        return user;    
    }
}