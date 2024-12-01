import mongoose from "mongoose"
import { User } from "../schemas/userSchema.js"

export const updateInfo = async (req, res, next) => {
    const username = req.body.username
    const login = req.session.user

    try {
        mongoose.connect(process.env.mongo_url)
        const user = await User.findOne({ login: login });
        if (!user) {
            return res.status(200).send({ "result": "fail", "message": "user not found" })
        }
        user.username = username
        await user.save()
        return res.status(200).send({ "result": "success", "message": "updated" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ "result": "fail" })
    }
}