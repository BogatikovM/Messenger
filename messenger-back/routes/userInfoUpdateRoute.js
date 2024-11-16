import express from 'express'
import { updateInfo } from '../controllers/userInfoUpdateController.js'
const router = express.Router()

router.post('/info', updateInfo)

export default router