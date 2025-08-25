import { Schema, model } from "mongoose";
const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    // later: email, passwordHash, avatar, bio etc
}, { timestamps: true });
export const User = model("User", userSchema);
//# sourceMappingURL=user-model.js.map