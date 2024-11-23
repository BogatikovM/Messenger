import express from 'express'
import { leaveChat } from '../controllers/chatLeaveController.js'
const router = express.Router()

router.post('/leave', leaveChat)

export default router