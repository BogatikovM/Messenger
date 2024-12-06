import mongoose from "mongoose"
import { isEmpty } from "../check.js"
import { Chat } from "../schemas/chatSchema.js"
import { User } from "../schemas/userSchema.js"

export const demoteMember = async (req, res, next) => {
    const memberName = req.body.name
    const chatName = req.body.chat
    const user = req.session.user

    if (isEmpty(memberName) || isEmpty(chatName)) {
        return res.status(400).json({ "result": "fail", "message": "Empty value" });
    }

    try {
        mongoose.connect(process.env.mongo_url)
        const chat = await Chat.findOne({ name: chatName });
        if (!chat.members.includes(memberName)) {
            return res.status(200).send({ "result": "fail", "message": "not exists" })
        }
        const member = await User.findOne({ login: memberName })
        if (!member) {
            return res.status(200).send({ "result": "fail", "message": "user not found" })
        }
        if (!chat.admins.includes(user)) {
            return res.status(200).send({ "result": "fail", "message": "not permitted" })
        }
        if (!chat.admins.includes(memberName)) {
            return res.status(200).send({ "result": "fail", "message": "not admin" })
        }
        if (chat.admins.indexOf(user) < chat.admins.indexOf(memberName)) {
            chat.admins.pull(memberName)
            await chat.save()
            return res.status(201).send({ "result": "success", "message": "demoted" })
        } else {
            return res.status(200).send({ "result": "fail", "message": "not permitted" })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ "result": "fail" })
    }
}