import express from 'express'
import { getMessages } from '../controllers/chatGetController.js'
const router = express.Router()

router.get('/messages', getMessages)

export default router