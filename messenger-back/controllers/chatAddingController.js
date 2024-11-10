import mongoose from "mongoose"
import bcrypt from "bcrypt"
import { Chat } from "../schemas/chatSchema.js"

export const addChat = async (req, res, next) => {
    const name = req.body.name
    const user = req.session.user

    try {
        mongoose.connect(process.env.mongo_url)
        const chat = await Chat.findOne({ name });
        if (chat) {
            return res.status(200).send({ "result": "fail", "message": "exists" })
        }
        const newChat = new Chat({name: name, members: [user], admins: [user]})
        await newChat.save()
        res.status(201).json({"result": "success"})
    } catch (error) {
        res.status(500).json({"result": "fail"})
    }
    
}