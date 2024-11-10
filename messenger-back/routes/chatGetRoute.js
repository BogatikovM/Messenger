import express from 'express'
import { getChat } from '../controllers/chatGetController.js'
const router = express.Router()

router.get('/info', getChat)

export default router