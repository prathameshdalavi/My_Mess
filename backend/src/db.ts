import mongoose, { Schema, model } from "mongoose";
const UserSchema = new Schema({
    name: String,
    ownerId: { type: mongoose.Schema.Types.ObjectId },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["student", "admin"] },
    phone: String,
    college: String,
    hostelAddress: String,
    createdAt: { type: Date, default: Date.now }
})
const MessSchema = new Schema({
    name: String,
    location: String,
    owner: { type: mongoose.Schema.Types.ObjectId },
    capacity: Number,
    menu: [
        {
            day: String,
            meals: {
                breakfast: [String],
                lunch: [String],
                dinner: [String],
                snacks: [String],
            }
        }
    ],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})
const SubscriptionSchema = new Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    amount: Number,
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    payment: {
        amount: { type: Number, required: true },
        status: {
            type: String,
            enum: ["pending", "paid", "failed"],
            default: "pending"
        },
        method: { type: String, enum: ["UPI", "Card", "Net Banking"] },
        transactionId: String
    },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
})
const SubscriptionPlanSchema = new Schema({
    name: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId },
    description: { type: String },
    amount: { type: Number, required: true },
    durationDays: { type: Number, required: true }, // Duration in days
    features: [String], // List of features/benefits
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
});
const reviewSchema = new Schema({
    studentId: { type: Schema.Types.ObjectId, ref: "User" },
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    rating: { type: Number, min: 1, max: 5 },
    comment: String,
    hygieneRating: { type: Number, min: 1, max: 5 },
    tasteRating: { type: Number, min: 1, max: 5 },
    createdAt: { type: Date, default: Date.now }
})
const NotificationSchema = new Schema({
    studentId: { type: Schema.Types.ObjectId, ref: "User" },
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    message: String,
    createdAt: { type: Date, default: Date.now }
})
const ExpenseSchema = new Schema({
    category: {
        type: String,
        enum: ["groceries", "staff", "utilities", "maintenance"],
        required: true
    },
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    amount: { type: Number, required: true },
    description: String,
    receiptImage: String,
    recordedBy: { type: Schema.Types.ObjectId, ref: "User" },
    date: { type: Date, default: Date.now }
});
const userModel = model("User", UserSchema);
const messModel = model("Mess", MessSchema);
const subscriptionModel = model("subcription", SubscriptionSchema)
const reviewModel = model("review", reviewSchema);
const notificationModel = model("Notification", NotificationSchema);
const expenseModel = model("expense", ExpenseSchema);
const subscriptionPlanModel = model("SubscriptionPlan", SubscriptionPlanSchema);
export {
    userModel,
    messModel,
    subscriptionModel,
    reviewModel,
    notificationModel,
    expenseModel,
    subscriptionPlanModel
}