// server/storing.ts
import { User } from "./models/user-model.js";
import { Persona } from "./models/persona-model.js";
import { Post } from "./models/posts-model.js";
import { Comment } from "./models/comments-model.js";
import { Like } from "./models/likes-model.js";
import mongoose from "mongoose";

// === USERS ===
export const createUser = async (username: string) => {
  const user = new User({ username });
  return user.save();
};

// === PERSONAS ===
export const createPersona = async (
  username: string,
  sys_instruction_posts: string,
  sys_instruction_comment: string
) => {
  const persona = new Persona({ username, sys_instruction_posts, sys_instruction_comment });
  return persona.save();
};

// === POSTS ===
// === POSTS ===
export const createPost = async (
  authorId: string,
  content: string,
  authorType: string = "User",
  mediaId?: string,
  mediaTitle?: string,
  mediaCover?: string,
  mediaType?: string,
  mediaSubType?: string,
  mediaYear?: number,
  mediaAuthor?: string,
  mediaArtist?: string,
  rating?: number,
  shareLink?: string
) => {
  const post = new Post({
    authorId,
    content,
    authorType,
    mediaId,
    mediaTitle,
    mediaCover,
    mediaType,
    mediaSubType,
    mediaYear,
    mediaAuthor,
    mediaArtist,
    rating,
    shareLink,
  });

  console.log(post);

  return post.save();
};


export const getPosts = async (limit = 50, cursor?: string) => {
  const query: any = {};

  if (cursor) {
    query._id = { $lt: new mongoose.Types.ObjectId(cursor) };
  }

  const posts = await Post.find(query)
    .sort({ _id: -1 }) // sort by _id instead of createdAt for cursor-based pagination
    .limit(limit)
    .populate("authorId", "username")
    .lean();

  return posts;
};

// === COMMENTS ===
export const createComment = async (authorId: string, postId: string, content: string, parentCommentId?: string) => {
  const comment = new Comment({ authorId, postId, content, parentCommentId: parentCommentId || null });
  return comment.save();
};
export const getCommentsForPost = async (postId: string) => {
  // fetch all comments for post, with authors
  const comments = await Comment.find({ postId })
    .sort({ createdAt: 1 })
    .populate("authorId", "username")
    .lean();

  // build tree starting from top-level comments (parentId == null)
  return buildNestedComments(comments);
};

function buildNestedComments(comments: any[]) {
  const commentMap: Record<string, any> = {};

  // index by id
  comments.forEach(c => {
    commentMap[c._id] = { ...c, replies: [] };
  });

  const root: any[] = [];

  comments.forEach(c => {
    if (c.parentId) {
      // attach to parent
      if (commentMap[c.parentId]) {
        commentMap[c.parentId].replies.push(commentMap[c._id]);
      }
    } else {
      // root-level comment
      root.push(commentMap[c._id]);
    }
  });

  return root;
}

export const getPersonas = async () => {
  return Persona.find().lean(); // fetch all personas
};

// === LIKES ===
export const likeTarget = async (userId: string, targetId: string, targetType: "Post" | "Comment") => {
  const like = new Like({ userId, targetId, targetType });
  return like.save();
};

export const getLikes = async (userId: string) => {
  return Like.find({ userId }).lean();
};

export const unlikeTarget = async (userId: string, targetId: string, targetType: "Post" | "Comment") => {
  return Like.findOneAndDelete({ userId, targetId, targetType });
};

export const getUsers = async () => {
  return User.find().lean(); // all users
};