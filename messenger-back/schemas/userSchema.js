import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    login: String,
    password: String,
    username: String
})

export const User = mongoose.model("Users", userSchema)

//mongoose.connect("mongodb://localhost/Messenger")