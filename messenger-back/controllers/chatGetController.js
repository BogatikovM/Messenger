import mongoose from "mongoose"
import { isEmpty } from "../check.js"
import { Chat } from "../schemas/chatSchema.js"

export const getChat = async (req, res, next) => {
    const chat = req.query.chat
    const user = req.session.user

    if (isEmpty(chat)) {
        return res.status(400).json({ "result": "fail", "message": "Empty value" });
    }

    try {
        mongoose.connect(process.env.mongo_url)
        const chatInfo = await Chat.findOne({ name: chat });
        const isAdmin = chatInfo.admins.includes(user) ? true : false;
        res.status(201).json({"result": "success", "data": chatInfo, "isAdmin": isAdmin})
    } catch (error) {
        res.status(500).json({"result": "fail"})
    } 
}