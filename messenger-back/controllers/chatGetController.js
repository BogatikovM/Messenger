import mongoose from "mongoose"
import bcrypt from "bcrypt"
import { Chat } from "../schemas/chatSchema.js"

export const getChat = async (req, res, next) => {
    const chat = req.query.chat
    const user = req.session.user

    try {
        mongoose.connect(process.env.mongo_url)
        const chatInfo = await Chat.findOne({ name: chat });
        const isAdmin = chatInfo.admins.includes(user) ? true : false;
        res.status(201).json({"result": "success", "data": chatInfo, "isAdmin": isAdmin})
    } catch (error) {
        res.status(500).json({"result": "fail"})
    }
    
}