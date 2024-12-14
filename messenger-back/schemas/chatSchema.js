import mongoose from "mongoose"

const chatSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        default: '',
    },
    members: {
        type: [String],
        required: true,
    },
    admins: {
        type: [String],
        required: true,
    }
})

export const Chat = mongoose.model("Chats", chatSchema)