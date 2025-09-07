import mongoose from "mongoose";
export declare const createUser: (username: string) => Promise<mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    username: string;
}, {}, {
    timestamps: true;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    username: string;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export declare const createPersona: (username: string, sys_instruction_posts: string, sys_instruction_comment: string) => Promise<mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    username: string;
    sys_instruction_posts: string;
    sys_instruction_comment: string;
}, {}, {
    timestamps: true;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    username: string;
    sys_instruction_posts: string;
    sys_instruction_comment: string;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export declare const createPost: (authorId: string, content: string, authorType?: string, mediaId?: string, mediaTitle?: string, mediaCover?: string, mediaType?: string, mediaSubType?: string, mediaYear?: number, mediaAuthor?: string, mediaArtist?: string, rating?: number, shareLink?: string) => Promise<mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    authorType: "User" | "Persona";
    authorId: mongoose.Types.ObjectId;
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
    authorId: mongoose.Types.ObjectId;
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
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export declare const getPosts: (limit?: number, cursor?: string) => Promise<(mongoose.FlattenMaps<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
    authorType: "User" | "Persona";
    authorId: mongoose.Types.ObjectId;
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
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
})[]>;
export declare const createComment: (authorId: string, postId: string, content: string, parentCommentId?: string) => Promise<mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    authorId: mongoose.Types.ObjectId;
    content: string;
    timestamp: NativeDate;
    likeCount: number;
    postId: mongoose.Types.ObjectId;
    parentCommentId: mongoose.Types.ObjectId;
}, {}, {
    timestamps: true;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    authorId: mongoose.Types.ObjectId;
    content: string;
    timestamp: NativeDate;
    likeCount: number;
    postId: mongoose.Types.ObjectId;
    parentCommentId: mongoose.Types.ObjectId;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export declare const getCommentsForPost: (postId: string) => Promise<any[]>;
export declare const getPersonas: () => Promise<(mongoose.FlattenMaps<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
    username: string;
    sys_instruction_posts: string;
    sys_instruction_comment: string;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
})[]>;
export declare const likeTarget: (userId: string, targetId: string, targetType: "Post" | "Comment") => Promise<mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    userId: mongoose.Types.ObjectId;
    targetId: mongoose.Types.ObjectId;
    targetType: "Post" | "Comment";
}, {}, {
    timestamps: true;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    userId: mongoose.Types.ObjectId;
    targetId: mongoose.Types.ObjectId;
    targetType: "Post" | "Comment";
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export declare const getLikes: (userId: string) => Promise<(mongoose.FlattenMaps<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
    userId: mongoose.Types.ObjectId;
    targetId: mongoose.Types.ObjectId;
    targetType: "Post" | "Comment";
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
})[]>;
export declare const unlikeTarget: (userId: string, targetId: string, targetType: "Post" | "Comment") => Promise<(mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    userId: mongoose.Types.ObjectId;
    targetId: mongoose.Types.ObjectId;
    targetType: "Post" | "Comment";
}, {}, {
    timestamps: true;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    userId: mongoose.Types.ObjectId;
    targetId: mongoose.Types.ObjectId;
    targetType: "Post" | "Comment";
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}) | null>;
export declare const getUsers: () => Promise<(mongoose.FlattenMaps<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
    username: string;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
})[]>;
//# sourceMappingURL=storing.d.ts.map