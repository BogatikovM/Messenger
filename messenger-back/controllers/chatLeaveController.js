import mongoose from "mongoose"
import { Chat } from "../schemas/chatSchema.js"
import { User } from "../schemas/userSchema.js"

export const leaveChat = async (req, res, next) => {
    const chatName = req.body.chat
    const userName = req.session.user

    try {
        mongoose.connect(process.env.mongo_url)
        const chat = await Chat.findOne({ name: chatName });
        if (!chat.members.includes(userName)) {
            return res.status(200).send({ "result": "fail", "message": "not exists" })
        }
        const user = await User.findOne({ login: userName });
        if (user) {
            chat.members.pull(userName)
            await chat.save()
            return res.status(200).send({ "result": "success", "message": "leaved" })
        } else {
            return res.status(200).send({ "result": "fail", "message": "user not found" })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ "result": "fail" })
    }
}