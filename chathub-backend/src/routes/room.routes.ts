import { Router } from 'express'
import { createRoom } from '../controllers/room.controller'
import { verifyToken } from '../middlewares/auth.middleware'

const router = Router()
router.post('/room', verifyToken, createRoom)

export default router
