// server/http.ts
import express from "express";
import {
  createUser,
  createPersona,
  createPost,
  getPosts,
  createComment,
  getCommentsForPost,
  likeTarget,
  unlikeTarget,
  getPersonas,
} from "./storing.js";


const router = express.Router();

// === USERS ===
router.post("/users", async (req, res) => {
  try {
    const { username } = req.body;
    const user = await createUser(username);

    res.json({ success: true, user });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    res.status(400).json({ success: false, error: message });
  }
});
router.post("/personas", async (req, res) => {
  try {
    const { username, sys_instruction_posts, sys_instruction_comment } = req.body;
    const persona = await createPersona(username, sys_instruction_posts, sys_instruction_comment);
    res.json({ success: true, persona });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    res.status(400).json({ success: false, error: message });
  }
});

// === POSTS ===
router.post("/posts", async (req, res) => {
  try {
    const {
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
      shareLink
    } = req.body;

    // console.log(mediaType ?? "undefined");
    // console.log(mediaSubType ?? "undefined");
    // console.log(mediaYear ?? "undefined");
    // console.log(mediaAuthor ?? "undefined");
    // console.log(mediaArtist ?? "undefined");
    // console.log("If you dont work i will find you i will end you.");

    const post = await createPost(
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
      shareLink
    );

    res.json({ success: true, post });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    res.status(400).json({ success: false, error: message });
  }
});


router.get("/personas", async (_req, res) => {
  try {
    const personas = await getPersonas();
    res.json({ success: true, personas });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    res.status(400).json({ success: false, error: message });
  }
});

router.get("/posts", async (_req, res) => {
  try {
    console.log("starting to post something");
    const posts = await getPosts();

    const postsWithComments = await Promise.all(
      posts.map(async (post) => {
        // returns a nested tree of comments
        const nestedComments = await getCommentsForPost(post._id.toString());

        return {
          ...post,
          comments: nestedComments,  // <-- better naming
        };
      })
    );

    res.json({ success: true, posts: postsWithComments });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    res.status(500).json({ success: false, error: message });
  }
});

// === COMMENTS ===
router.post("/posts/:postId/comments", async (req, res) => {
  try {
    const { authorId, content, parentCommentId } = req.body;
    const postId = req.body.postId || req.params.postId; // <- important

    console.log({ authorId, postId, content, parentCommentId });

    const comment = await createComment(authorId, postId, content, parentCommentId);
    res.json({ success: true, comment });
  } catch (err) {
    console.log(err);
    const message = err instanceof Error ? err.message : String(err);
    res.status(400).json({ success: false, error: message });
  }
});


router.get("/comments/:postId", async (req, res) => {
  try {
    const comments = await getCommentsForPost(req.params.postId);
    res.json({ success: true, comments });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    res.status(500).json({ success: false, error: message });
  }
});

router.get("/", async (_req, res) => {
    console.log("atleast i am working dont feel bad!");
    res.json({ success: true, message: "atleast i am working dont feel bad!" });
});
  
// === LIKES ===
router.post("/likes", async (req, res) => {
  try {
    const { userId, targetId, targetType } = req.body;
    const like = await likeTarget(userId, targetId, targetType);
    res.json({ success: true, like });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    res.status(400).json({ success: false, error: message });
  }
});

router.delete("/likes", async (req, res) => {
  try {
    const { userId, targetId, targetType } = req.body;
    await unlikeTarget(userId, targetId, targetType);
    res.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    res.status(400).json({ success: false, error: message });
  }
});

export default router;
