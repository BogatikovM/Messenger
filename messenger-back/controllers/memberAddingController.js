import mongoose from "mongoose"
import bcrypt from "bcrypt"
import { Chat } from "../schemas/chatSchema.js"
import { User } from "../schemas/userSchema.js"

export const addMember = async (req, res, next) => {
    const memberName = req.body.name
    const chatName = req.body.chat
    const user = req.session.user

    try {
        mongoose.connect(process.env.mongo_url)
        const chat = await Chat.findOne({ name:chatName });
        if (chat.members.includes(memberName)){
            return res.status(200).send({ "result": "fail", "message": "exists" })
        } else {
            const member = await User.findOne({ login:memberName });
            if (member){
                chat.members.push(member.login)
                await chat.save()
                return res.status(200).send({ "result": "success", "message": "added" })
            } else {
                return res.status(200).send({ "result": "fail", "message": "user not found" })
            }
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({"result": "fail"})
    }
    
}