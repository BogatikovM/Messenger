import mongoose from "mongoose"
import bcrypt from "bcrypt"
import { Chat } from "../schemas/chatSchema.js"

export const getChat = async (req, res, next) => {
    const chat = req.query.chat

    try {
        mongoose.connect(process.env.mongo_url)
        const chatInfo = await Chat.find({ name: chat });
        res.status(201).json({"result": "success", "data": chatInfo})
    } catch (error) {
        res.status(500).json({"result": "fail"})
    }
    
}