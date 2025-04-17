import { subscriptionPlanModel, userModel } from "../../db";


export const subcriptionService={
    async getSubscription(userId: string) {
        const user = await userModel.findById(userId);
        if (!user) {
          throw new Error("User not found");
        }
        const adminId = user.ownerId;
        const subscription = await subscriptionPlanModel.findOne({ owner: adminId });
        if (!subscription) {
          throw new Error("No subscription found for this admin");
        }
        return subscription;
      },
}