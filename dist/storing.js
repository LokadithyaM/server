// server/storing.ts
import { User } from "./models/user-model.js";
import { Persona } from "./models/persona-model.js";
import { Post } from "./models/posts-model.js";
import { Comment } from "./models/comments-model.js";
import { Like } from "./models/likes-model.js";
// === USERS ===
export const createUser = async (username) => {
    const user = new User({ username });
    return user.save();
};
// === PERSONAS ===
export const createPersona = async (username, sys_instruction_posts, sys_instruction_comment) => {
    const persona = new Persona({ username, sys_instruction_posts, sys_instruction_comment });
    return persona.save();
};
// === POSTS ===
// === POSTS ===
export const createPost = async (authorId, content, authorType = "User", mediaId, mediaTitle, mediaCover, mediaType, mediaSubType, mediaYear, mediaAuthor, mediaArtist, rating, shareLink) => {
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
export const getPosts = async () => {
    return Post.find()
        .sort({ createdAt: -1 })
        .populate("authorId", "username") // only return username field
        .lean();
};
// === COMMENTS ===
export const createComment = async (authorId, postId, content, parentCommentId) => {
    const comment = new Comment({ authorId, postId, content, parentCommentId: parentCommentId || null });
    return comment.save();
};
export const getCommentsForPost = async (postId) => {
    // fetch all comments for post, with authors
    const comments = await Comment.find({ postId })
        .sort({ createdAt: 1 })
        .populate("authorId", "username")
        .lean();
    // build tree starting from top-level comments (parentId == null)
    return buildNestedComments(comments);
};
function buildNestedComments(comments) {
    const commentMap = {};
    // index by id
    comments.forEach(c => {
        commentMap[c._id] = { ...c, replies: [] };
    });
    const root = [];
    comments.forEach(c => {
        if (c.parentId) {
            // attach to parent
            if (commentMap[c.parentId]) {
                commentMap[c.parentId].replies.push(commentMap[c._id]);
            }
        }
        else {
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
export const likeTarget = async (userId, targetId, targetType) => {
    const like = new Like({ userId, targetId, targetType });
    return like.save();
};
export const getLikes = async (userId) => {
    return Like.find({ userId }).lean();
};
export const unlikeTarget = async (userId, targetId, targetType) => {
    return Like.findOneAndDelete({ userId, targetId, targetType });
};
export const getUsers = async () => {
    return User.find().lean(); // all users
};
//# sourceMappingURL=storing.js.map