import mongoose from "mongoose"
import { User } from "../schemas/userSchema.js"

export const register = async (req, res, next) => {
    const login = req.body.login
    const password = req.body.password
    const username = req.body.username

    try {
        mongoose.connect(process.env.mongo_url)
        const user = await User.findOne({ login });
        if (user) {
            return res.status(200).send({ "result": "fail", "message": "exists" })
        }
        const newUser = new User({ login, password, username })
        await newUser.save()
        res.status(201).json({ "result": "success" })
    } catch (error) {
        res.status(500).json({ "result": "fail" })
    }
}