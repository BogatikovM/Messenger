import express from 'express'
import { addMember } from '../controllers/memberAddingController.js'
const router = express.Router()

router.post('/add', addMember)

export default router