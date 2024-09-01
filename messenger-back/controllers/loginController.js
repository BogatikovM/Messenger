import mongoose from "mongoose"
import { User } from "../schemas/userSchema.js"

export const login = (req, res, next) => {
    const login = req.body.login
    const password = req.body.password

    mongoose.connect("mongodb://localhost/Messenger")

    const user = User.exists({login: login, password: password})

    console.log(user)

    if (user){
        res.status(200).json({"result": "true"})
    } else {
        res.status(200).json({"result": "false"})
    }
    
}