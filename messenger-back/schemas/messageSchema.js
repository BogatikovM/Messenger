import mongoose from "mongoose"

const messageSchema = new mongoose.Schema({
    sender: {
        type: String,
        required: true,
    },
    time_created: {
        type: Date,
        required: true,
        default: () => Date.now()
    },
    chat: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    }
})

export const Message = mongoose.model("Messages", messageSchema)