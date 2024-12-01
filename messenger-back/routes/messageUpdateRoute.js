import express from 'express'
import { updateMessage } from '../controllers/messageUpdateController.js'
const router = express.Router()

router.post('/update', updateMessage)

export default router