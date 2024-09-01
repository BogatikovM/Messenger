import mongoose from "mongoose"
import { User } from "../schemas/userSchema.js"

export const checkSession = (req, res, next) => {
    res.status(200).json({"result": "true"})  
}