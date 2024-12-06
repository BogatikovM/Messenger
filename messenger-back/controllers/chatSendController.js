import mongoose from "mongoose"
import { isEmpty } from "../check.js"
import { Message } from "../schemas/messageSchema.js"

export const send = async (req, res, next) => {
    const content = req.body.content
    const chat = req.body.chat
    const user = req.session.user

    if (isEmpty(content) || isEmpty(chat)) {
        return res.status(400).json({ "result": "fail", "message": "Empty value" });
    }

    try {
        mongoose.connect(process.env.mongo_url)
        const newMessage = new Message({sender: user, content: content, chat: chat})
        await newMessage.save()
        res.status(201).json({"result": "success"})
    } catch (error) {
        res.status(500).json({"result": "fail"})
    }
}