import { Router } from 'express'
import { createRoom } from '../controllers/room.controller.js'
import { verifyToken } from '../middlewares/auth.middleware.js'

const router = Router()
router.post('/room', verifyToken, createRoom)

export default router
