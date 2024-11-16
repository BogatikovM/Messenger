import express from 'express'
import { updatePassword } from '../controllers/userPasswordUpdateController.js'
const router = express.Router()

router.post('/password', updatePassword)

export default router