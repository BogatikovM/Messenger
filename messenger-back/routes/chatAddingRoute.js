import express from 'express'
import { addChat } from '../controllers/chatAddingController.js'
const router = express.Router()

router.post('/add', addChat)

export default router