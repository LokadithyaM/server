import 'dotenv/config';
import express from 'express';
import { WebSocketServer } from 'ws';
import { GoogleGenerativeAI } from '@google/generative-ai';
import router from "./http.js";
import mongoose from 'mongoose';
import { Post } from "./models/posts-model.js";
import { Comment } from "./models/comments-model.js"
import cors from 'cors';


const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", router);
const MONGO_URI = process.env.MONGODB_URI || "";

// interface Reply {
//   id: string;
//   content: string;
//   author: 'user' | 'gemini';
//   timestamp: Date;
//   replies: Reply[];
//   likes: number;
//   isLiked: boolean;
// }

// interface Post {
//   id: string;
//   content: string;
//   author: 'user' | 'gemini';
//   timestamp: Date;
//   likes: number;
//   replies: Reply[];
//   isLiked: boolean;
// }

// // In-memory storage
// const posts: Post[] = [];


mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");

    // Start server only after Mongo connects
    const server = app.listen(8080, () => {
      console.log("🚀 Server running on http://localhost:8080");
    });

    // Gemini setup
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || '');
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      tools: [{ codeExecution: {} }],
    });

    const wss = new WebSocketServer({ server });

    // Broadcast helper
    const broadcast = (msg: any) => {
      wss.clients.forEach((client) => {
        if (client.readyState === client.OPEN) client.send(JSON.stringify(msg));
      });
    };

    // Generate Gemini reply
    const generateGeminiReply = async (message: string,sys: string) => {
      const chatSession = model.startChat({
        history: [
          { role: 'user', parts: [{ text: message }] }
        ],
        systemInstruction: {
          role: 'system',
          parts: [{ text: sys }],
        },
      });

      const result = await chatSession.sendMessage(message);
      return result.response.text();
    };



    // // // Auto-generate Gemini posts every 2 mins
    // setInterval(async () => {
    //   const geminiPrompts = [
    //     "give a twiter style post of your favorite movie",
    //     "what is your favorite song?",
    //     "Tell us something about the movie industry",
    //     "Tell something regarding music direction history",
    //   ];

    //   const res = await fetch("http://localhost:8080/api/personas");
    //   const data = await res.json();
    //   // console.log(data);
  
    //   if (!data.success || !data.personas || data.personas.length === 0) {
    //     console.warn("No personas available");
    //     return;
    //   }
  
    //   const personas = data.personas;
  

    //   const randomPersona = personas[Math.floor(Math.random() * personas.length)];


    //   // console.log("the person who wants to post is ",randomPersona.username);
    //   console.log(randomPersona);
      

    //   const randomPrompt = geminiPrompts[Math.floor(Math.random() * personas.length)];
    //   try {
    //     const replyText = await generateGeminiReply(randomPrompt || "tell me something funny",randomPersona.sys_instruction_posts);
    //     const created = await fetch('http://localhost:8080/api/posts', {
    //       method: 'POST',
    //       headers: { 'Content-Type': 'application/json' },
    //       body: JSON.stringify({
    //         authorId: randomPersona._id,
    //         content: replyText,
    //         type: 'Persona',
    //       }),
    //     }).then(res => res.json());
    //     if (created.success) {
    //       // broadcast to clients
    //       const populated = await Post.findById(created.post._id).populate("authorId", "username").lean();
    //       broadcast({ type: 'post', post: populated });
    //     } else {
    //       console.log("Failed to create Gemini post via API");
    //     }
        
    //   } catch (err) {
    //     console.error('Error generating Gemini post:', err);
    //   }
    // }, 1100000);

    // === WebSocket logic ===
    wss.on('connection', async (ws) => {
      console.log('New client connected');

      // // Initial sync: fetch posts from HTTP
      // const posts = await fetch('http://localhost:8080/api/posts').then(res => res.json());
      // ws.send(JSON.stringify({ type: 'init', posts }));

      ws.on('message', async (rawMsg) => {
        try {
          const msg = JSON.parse(rawMsg.toString());

          if(msg.type==="auth"){
            const postsRes = await fetch(
              `http://localhost:8080/api/posts?userId=${msg.userId}`
            ).then((res) => res.json());
          
            ws.send(JSON.stringify({
              type: "init",
              posts: postsRes.posts,
              nextCursor: postsRes.nextCursor,
            }));
          
            return;
          }
          

          switch (msg.type) {
            case 'newPost': {
            console.log("mediaType:", msg.mediaType ?? "undefined");
            console.log("mediaSubType:", msg.mediaSubType ?? "undefined");
            console.log("mediaYear:", msg.mediaYear ?? "undefined");
            console.log("mediaAuthor:", msg.mediaAuthor ?? "undefined");
            console.log("mediaArtist:", msg.mediaArtist ?? "undefined");

              console.log("heading to post the above");
              const created = await fetch('http://localhost:8080/api/posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  authorId: msg.authorId,
                  content: msg.content,
                  authorType: msg.authorType,
                  mediaId: msg.mediaId,
                  mediaTitle: msg.mediaTitle,
                  mediaCover: msg.mediaCover,
                  mediaType: msg.mediaType,
                  mediaSubType: msg.mediaSubType,
                  mediaYear: msg.mediaYear,
                  mediaAuthor: msg.mediaAuthor,
                  mediaArtist: msg.mediaArtist,
                  rating: msg.rating
                }),
              }).then(res => res.json());

              if (created.success) {
                const populated = await Post.findById(created.post._id)
                  .populate("authorId", "username")
                  .lean();

                broadcast({ type: 'post', post: populated });
              } else {
                console.log("failed to generate in websockets 205");
              }
              break;
            }


            case 'newReply': {
              console.log(msg);
              const created = await fetch(`http://localhost:8080/api/posts/${msg.postId}/comments`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  authorId: msg.authorId,
                  postId: msg.postId,
                  content: msg.content,
                  parentCommentId: msg.parentReplyId || null,
                }),
              }).then(res => res.json());

              const populated = await Comment.findById(created.comment._id)
              .populate("authorId", "username")
              .lean();
            
              broadcast({ type: "comment", comment: populated, postId: msg.postId });
            
              break;
            }

            case 'likePost': {
              console.log("is it hitting this?");
              await fetch(`http://localhost:8080/api/likes`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  userId: msg.userId,
                  targetId: msg.postId,
                  targetType:  msg.targetType,
                })
              });

              await Post.findByIdAndUpdate(msg.postId, { $inc: { likeCount: 1 } });

              broadcast({ type: 'likePost', postId: msg.postId, userId: msg.userId });
              break;
            }
            
            case 'unlikePost': {
              console.log("is it hitting this?");
              await fetch(`http://localhost:8080/api/likes`, {
                method: 'DELETE',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  userId: msg.userId,
                  targetId: msg.postId,
                  targetType:  msg.targetType,
                })
              });
              await Post.findByIdAndUpdate(msg.postId, { $inc: { likeCount: -1 } });
              broadcast({ type: 'unlikePost', postId: msg.postId, userId: msg.userId });
              break;
            }
            
            case 'likeReply': {
              await fetch(`http://localhost:8080/api/likes`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  userId: msg.userId,
                  targetId: msg.replyId,
                  targetType: msg.targetType,
                })
              });
              await Comment.findByIdAndUpdate(msg.replyId, { $inc: { likeCount: 1 } });
              broadcast({ type: 'likeReply', postId: msg.postId, replyId: msg.replyId, userId: msg.userId });
              break;
            }
            
            case 'unlikeReply': {
              await fetch(`http://localhost:8080/api/likes`, {
                method: 'DELETE',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  userId: msg.userId,
                  targetId: msg.replyId,
                  targetType: msg.targetType,
                })
              });
              await Comment.findByIdAndUpdate(msg.replyId, { $inc: { likeCount: -1 } });
              broadcast({ type: 'unlikeReply', postId: msg.postId, replyId: msg.replyId, userId: msg.userId });
              break;
            }
            default:
              console.warn('Unknown WS message:', msg);
          }
        } catch (err) {
          console.error('Error handling WS message:', err);
        }
      });
    });
  })
  .catch(err => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });