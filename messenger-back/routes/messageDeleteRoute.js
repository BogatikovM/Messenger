import express from 'express'
import { deleteMessage } from '../controllers/messageDeleteController.js'
const router = express.Router()

router.post('/delete', deleteMessage)

export default router