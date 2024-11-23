import express from 'express'
import { deleteMember } from '../controllers/memberDeleteController.js'
const router = express.Router()

router.post('/delete', deleteMember)

export default router