import { Schema, model } from "mongoose";

const postSchema = new Schema({
  authorType: { type: String, enum: ["User", "Persona"], default: "User" },
  authorId: {
    type: Schema.Types.ObjectId,
    required: true,
    refPath: "authorType",
  },
  content: { type: String, required: true },

  // Media fields
  mediaId: { type: String },
  mediaTitle: { type: String },
  mediaCover: { type: String }, // this will store the URL
  mediaType: { type: String },
  mediaSubType: { type: String },
  mediaYear: { type: Number },
  mediaAuthor: { type: String },
  mediaArtist: { type: String },

  rating: { type: Number, default: null },

  timestamp: { type: Date, default: Date.now },
  likeCount: { type: Number, default: 0 },
  replyCount: { type: Number, default: 0 },
  shareLink: { type: String },
}, { timestamps: true });

export const Post = model("Post", postSchema);
