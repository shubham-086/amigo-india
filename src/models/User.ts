import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  type: "user" | "admin";
  verifyCode: string;
  verifyCodeExpiry: Date;
  isVerified: boolean;
  createdAt: Date;
  image: string;
  institute: string;
  quizCategoryStats: mongoose.Types.ObjectId[];
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: [true, "Name is required"] },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+\@.+\..+/, "Please enter valid email"],
  },
  verifyCode: {
    type: String,
    required: [true, "Verification code is required"],
  },
  verifyCodeExpiry: {
    type: Date,
    required: [true, "Verification code expiry is required"],
  },
  type: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
    required: true,
  },
  isVerified: { type: Boolean, default: false },
  password: { type: String, required: true, select: false },
  createdAt: { type: Date, default: Date.now },
  image: { type: String, default: "" },
  institute: { type: String, default: null },
  quizCategoryStats: [
    { type: mongoose.Schema.Types.ObjectId, ref: "CategoryStat" },
  ],
});

const User =
  (mongoose.models.User as mongoose.Model<IUser>) ||
  mongoose.model<IUser>("User", userSchema);

export default User;
