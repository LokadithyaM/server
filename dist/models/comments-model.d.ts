import { Schema } from "mongoose";
export declare const Comment: import("mongoose").Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    authorId: import("mongoose").Types.ObjectId;
    content: string;
    timestamp: NativeDate;
    likeCount: number;
    postId: import("mongoose").Types.ObjectId;
    parentCommentId: import("mongoose").Types.ObjectId;
}, {}, {}, {}, import("mongoose").Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    authorId: import("mongoose").Types.ObjectId;
    content: string;
    timestamp: NativeDate;
    likeCount: number;
    postId: import("mongoose").Types.ObjectId;
    parentCommentId: import("mongoose").Types.ObjectId;
}, {}, {
    timestamps: true;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    authorId: import("mongoose").Types.ObjectId;
    content: string;
    timestamp: NativeDate;
    likeCount: number;
    postId: import("mongoose").Types.ObjectId;
    parentCommentId: import("mongoose").Types.ObjectId;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    authorId: import("mongoose").Types.ObjectId;
    content: string;
    timestamp: NativeDate;
    likeCount: number;
    postId: import("mongoose").Types.ObjectId;
    parentCommentId: import("mongoose").Types.ObjectId;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    authorId: import("mongoose").Types.ObjectId;
    content: string;
    timestamp: NativeDate;
    likeCount: number;
    postId: import("mongoose").Types.ObjectId;
    parentCommentId: import("mongoose").Types.ObjectId;
}>, {}, import("mongoose").ResolveSchemaOptions<{
    timestamps: true;
}>> & import("mongoose").FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    authorId: import("mongoose").Types.ObjectId;
    content: string;
    timestamp: NativeDate;
    likeCount: number;
    postId: import("mongoose").Types.ObjectId;
    parentCommentId: import("mongoose").Types.ObjectId;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>>;
//# sourceMappingURL=comments-model.d.ts.map