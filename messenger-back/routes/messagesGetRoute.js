import express from 'express'
import { getMessages } from '../controllers/messagesGetController.js'
const router = express.Router()

router.get('/messages', getMessages)

export default router