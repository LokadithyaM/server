import { Schema } from "mongoose";
export declare const Post: import("mongoose").Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    authorType: "User" | "Persona";
    authorId: import("mongoose").Types.ObjectId;
    content: string;
    rating: number;
    timestamp: NativeDate;
    likeCount: number;
    replyCount: number;
    mediaId?: string | null | undefined;
    mediaTitle?: string | null | undefined;
    mediaCover?: string | null | undefined;
    mediaType?: string | null | undefined;
    mediaSubType?: string | null | undefined;
    mediaYear?: number | null | undefined;
    mediaAuthor?: string | null | undefined;
    mediaArtist?: string | null | undefined;
    shareLink?: string | null | undefined;
}, {}, {}, {}, import("mongoose").Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    authorType: "User" | "Persona";
    authorId: import("mongoose").Types.ObjectId;
    content: string;
    rating: number;
    timestamp: NativeDate;
    likeCount: number;
    replyCount: number;
    mediaId?: string | null | undefined;
    mediaTitle?: string | null | undefined;
    mediaCover?: string | null | undefined;
    mediaType?: string | null | undefined;
    mediaSubType?: string | null | undefined;
    mediaYear?: number | null | undefined;
    mediaAuthor?: string | null | undefined;
    mediaArtist?: string | null | undefined;
    shareLink?: string | null | undefined;
}, {}, {
    timestamps: true;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    authorType: "User" | "Persona";
    authorId: import("mongoose").Types.ObjectId;
    content: string;
    rating: number;
    timestamp: NativeDate;
    likeCount: number;
    replyCount: number;
    mediaId?: string | null | undefined;
    mediaTitle?: string | null | undefined;
    mediaCover?: string | null | undefined;
    mediaType?: string | null | undefined;
    mediaSubType?: string | null | undefined;
    mediaYear?: number | null | undefined;
    mediaAuthor?: string | null | undefined;
    mediaArtist?: string | null | undefined;
    shareLink?: string | null | undefined;
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
    authorType: "User" | "Persona";
    authorId: import("mongoose").Types.ObjectId;
    content: string;
    rating: number;
    timestamp: NativeDate;
    likeCount: number;
    replyCount: number;
    mediaId?: string | null | undefined;
    mediaTitle?: string | null | undefined;
    mediaCover?: string | null | undefined;
    mediaType?: string | null | undefined;
    mediaSubType?: string | null | undefined;
    mediaYear?: number | null | undefined;
    mediaAuthor?: string | null | undefined;
    mediaArtist?: string | null | undefined;
    shareLink?: string | null | undefined;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    authorType: "User" | "Persona";
    authorId: import("mongoose").Types.ObjectId;
    content: string;
    rating: number;
    timestamp: NativeDate;
    likeCount: number;
    replyCount: number;
    mediaId?: string | null | undefined;
    mediaTitle?: string | null | undefined;
    mediaCover?: string | null | undefined;
    mediaType?: string | null | undefined;
    mediaSubType?: string | null | undefined;
    mediaYear?: number | null | undefined;
    mediaAuthor?: string | null | undefined;
    mediaArtist?: string | null | undefined;
    shareLink?: string | null | undefined;
}>, {}, import("mongoose").ResolveSchemaOptions<{
    timestamps: true;
}>> & import("mongoose").FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    authorType: "User" | "Persona";
    authorId: import("mongoose").Types.ObjectId;
    content: string;
    rating: number;
    timestamp: NativeDate;
    likeCount: number;
    replyCount: number;
    mediaId?: string | null | undefined;
    mediaTitle?: string | null | undefined;
    mediaCover?: string | null | undefined;
    mediaType?: string | null | undefined;
    mediaSubType?: string | null | undefined;
    mediaYear?: number | null | undefined;
    mediaAuthor?: string | null | undefined;
    mediaArtist?: string | null | undefined;
    shareLink?: string | null | undefined;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>>;
//# sourceMappingURL=posts-model.d.ts.map