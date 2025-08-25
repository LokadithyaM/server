import { Schema, model } from "mongoose";
const commentSchema = new Schema({
    postId: { type: Schema.Types.ObjectId, ref: "Post", required: true },
    parentCommentId: { type: Schema.Types.ObjectId, ref: "Comment", default: null },
    authorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    likeCount: { type: Number, default: 0 },
}, { timestamps: true });
export const Comment = model("Comment", commentSchema);
//# sourceMappingURL=comments-model.js.map