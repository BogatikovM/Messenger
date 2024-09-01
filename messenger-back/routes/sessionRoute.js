import express from 'express'
import { checkSession } from '../controllers/sessionController.js'
const router = express.Router()

router.post('/session', checkSession)

export default router