import { Router } from 'express'

import { verifyToken } from '../middlewares/auth.middleware'
import { chatMessage, messages } from '../controllers/message.controller'

const router = Router()
router.post('/message', verifyToken, chatMessage)
router.get('/message/:roomId', messages)
export default router
