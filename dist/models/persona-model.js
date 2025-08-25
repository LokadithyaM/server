import { Schema, model } from "mongoose";
const personaSchema = new Schema({
    username: { type: String, required: true, unique: true },
    sys_instruction_posts: { type: String, required: true },
    sys_instruction_comment: { type: String, required: true }
}, { timestamps: true });
export const Persona = model("Persona", personaSchema);
//# sourceMappingURL=persona-model.js.map