import mongoose from "mongoose"
import { Chat } from "../schemas/chatSchema.js"
import { User } from "../schemas/userSchema.js"

export const promoteMember = async (req, res, next) => {
    const memberName = req.body.name
    const chatName = req.body.chat
    const user = req.session.user

    try {
        mongoose.connect(process.env.mongo_url)
        const chat = await Chat.findOne({ name: chatName });
        if (!chat.members.includes(memberName)) {
            return res.status(200).send({ "result": "fail", "message": "not exists" })
        }
        const member = await User.findOne({ login: memberName });
        if (!member) {
            return res.status(200).send({ "result": "fail", "message": "user not found" })
        }
        if (!chat.admins.includes(user)) {
            return res.status(200).send({ "result": "fail", "message": "not permitted" })
        }
        if (chat.admins.includes(memberName)) {
            return res.status(200).send({ "result": "fail", "message": "already admin" })
        }
        chat.admins.push(memberName)
        await chat.save()
        return res.status(201).send({ "result": "success", "message": "promoted" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ "result": "fail" })
    }

}