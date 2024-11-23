import express from 'express'
import { demoteMember } from '../controllers/memberDemoteController.js'
const router = express.Router()

router.post('/demote', demoteMember)

export default router