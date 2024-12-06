import mongoose from "mongoose"
import { isEmpty } from "../check.js"
import { Message } from "../schemas/messageSchema.js"

export const getMessages = async (req, res, next) => {
    const user = req.session.user
    const chat = req.query.chat

    if (isEmpty(chat)) {
        return res.status(400).json({ "result": "fail", "message": "Empty value" });
    }

    try {
        mongoose.connect(process.env.mongo_url)
        const messages = await Message.find({ chat: chat });
        res.status(201).json({ "result": "success", "data": messages, "user": user })
    } catch (error) {
        res.status(500).json({ "result": "fail" })
    }
}