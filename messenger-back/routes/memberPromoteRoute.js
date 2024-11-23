import express from 'express'
import { promoteMember } from '../controllers/memberPromoteController.js'
const router = express.Router()

router.post('/promote', promoteMember)

export default router