import mongoose from "mongoose"
import { isEmpty } from "../check.js"
import { Message } from "../schemas/messageSchema.js"
import { User } from "../schemas/userSchema.js"
import { Chat } from "../schemas/chatSchema.js"

export const deleteMessage = async (req, res, next) => {
    const messageId = req.body.messageId
    const chatName = req.body.chat
    const user = req.session.user

    if (isEmpty(messageId) || isEmpty(chatName)) {
        return res.status(400).json({ "result": "fail", "message": "Empty value" });
    }

    try {
        mongoose.connect(process.env.mongo_url)
        const member = await User.findOne({ login: user })
        if (!member) {
            return res.status(200).send({ "result": "fail", "message": "user not found" })
        }
        const chat = await Chat.findOne({ name: chatName })
        const message = await Message.findOne({ _id: messageId });
        if ((message.sender === user) || (chat.admins.includes(user))) {
            await Message.deleteOne({ _id: messageId })
            return res.status(200).send({ "result": "success", "message": "deleted" })
        } else {
            return res.status(200).send({ "result": "fail", "message": "not permitted" })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ "result": "fail" })
    }
}