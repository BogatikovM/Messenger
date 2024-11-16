import mongoose from "mongoose"
import { User } from "../schemas/userSchema.js"

export const getUser = async (req, res, next) => {
    const login = req.session.user

    try {
        mongoose.connect(process.env.mongo_url)
        const user = await User.find({ login:login });
        res.status(200).json({"result": "success", "data": user})
    } catch (error) {
        res.status(500).json({"result": "fail"})
    }
    
}