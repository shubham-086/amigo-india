import mongoose, { Schema, Document } from "mongoose";

interface IUserActivity extends Document {
  user: mongoose.Types.ObjectId;
  activityType: "quiz" | "practice" | "interview" | "course";
  activityId: mongoose.Types.ObjectId;
  activityTypeRef: "Quiz" | "PracticeQuestion" | "InterviewQuestion" | "Course";
}

const userActivitySchema = new Schema<IUserActivity>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    activityType: {
      type: String,
      enum: ["quiz", "practice", "interview", "course"],
      required: true,
    },
    activityId: {
      type: Schema.Types.ObjectId,
      refPath: "activityTypeRef",
      required: true,
    },
    activityTypeRef: {
      type: String,
      required: true,
      enum: ["Quiz", "PracticeQuestion", "InterviewQuestion", "Course"],
    },
  },
  { timestamps: true }
);

userActivitySchema.index({ user: 1, activityType: 1, activityId: 1 });

const UserActivity =
  (mongoose.models.UserActivity as mongoose.Model<IUserActivity>) ||
  mongoose.model<IUserActivity>("UserActivity", userActivitySchema);

export default UserActivity;
