import mongoose from "mongoose"
import bcrypt from "bcrypt"
import { Message } from "../schemas/messageSchema.js"

export const send = async (req, res, next) => {
    const content = req.body.content
    const chat = req.body.chat
    const user = req.session.user

    try {
        mongoose.connect(process.env.mongo_url)
        const newMessage = new Message({sender: user, content: content, chat: chat})
        console.log(newMessage)
        await newMessage.save()
        res.status(201).json({"result": "success"})
    } catch (error) {
        res.status(500).json({"result": "fail"})
    }
}