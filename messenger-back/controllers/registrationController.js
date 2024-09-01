import mongoose from "mongoose"
import { User } from "../schemas/userSchema.js"

export const register = (req, res, next) => {
    const login = req.body.login
    const password = req.body.password
    const username = req.body.username

    mongoose.connect("mongodb://localhost/Messenger")
    /*
    const newUser = new User({
        login: login,
        password: password,
        username: username
    })

    newUser.save()
    */
    const newUser = User.create({
        login: login,
        password: password,
        username: username
    })
    //users.push(newUser)
    res.status(201).json({"result": "true"})
}