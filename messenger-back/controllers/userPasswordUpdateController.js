import mongoose from "mongoose"
import bcrypt from "bcrypt"
import { User } from "../schemas/userSchema.js"

export const updatePassword = async (req, res, next) => {
    const oldPassword = req.body.oldPassword
    const newPassword = req.body.newPassword
    const login = req.session.user

    try {
        mongoose.connect(process.env.mongo_url)
        const user = await User.findOne({ login:login });
        if (!user) {
            return res.status(200).send({ "result": "fail", "message": "user not found" })
        }

        const isValid = await bcrypt.compare(oldPassword, user.password);
        if (!isValid) {
            return res.status(200).send({ "result": "fail", "message": "wrong password" });
        }

        user.password = newPassword
        await user.save()
        return res.status(200).send({ "result": "success", "message": "updated" })
    } catch (error) {
        console.log(error)
        res.status(500).json({"result": "fail"})
    }
    
}