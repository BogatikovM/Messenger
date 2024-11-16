import mongoose from "mongoose"
import bcrypt from "bcrypt"
import { Chat } from "../schemas/chatSchema.js"

export const getChats = async (req, res, next) => {
    const user = req.session.user

    try {
        mongoose.connect(process.env.mongo_url)
        const chats = await Chat.find({ members: {$in: [user]} });
        res.status(200).json({"result": "success", "data": chats})
    } catch (error) {
        res.status(500).json({"result": "fail"})
    }
    
}