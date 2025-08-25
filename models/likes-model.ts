import { Schema, model } from "mongoose";

const likeSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    targetId: { type: Schema.Types.ObjectId, required: true }, // can be Post or Comment
    targetType: { type: String, enum: ["Post", "Comment"], required: true },
  }, { timestamps: true });
  
  likeSchema.index({ userId: 1, targetId: 1, targetType: 1 }, { unique: true });
  
  export const Like = model("Like", likeSchema);
  