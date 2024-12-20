import mongoose from "mongoose"
import bcrypt from "bcrypt"
import { isEmpty } from "../check.js"
import { User } from "../schemas/userSchema.js"

export const login = async (req, res, next) => {
	const login = req.body.login
	const password = req.body.password

	if (isEmpty(login) || isEmpty(password)) {
        return res.status(400).json({ "result": "fail", "message": "Empty value" });
    }

	try {
		mongoose.connect(process.env.mongo_url)
		const user = await User.findOne({ login })
		if (!user) {
			return res.status(200).send({ "result": "fail" })
		}
		const isValid = await bcrypt.compare(password, user.password)
		if (!isValid) {
			return res.status(200).send({ "result": "fail" })
		}
		req.session.user = login
		res.status(200).json({ "result": "success" })
	} catch (err) {
		res.status(500).send({ "result": "fail" })
	}
}