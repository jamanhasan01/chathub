import { Router } from 'express'
import { getMe, loginUser, logoutUser, registerUser } from '../controllers/auth.controller'
import { upload } from '../middlewares/upload.middleware'

const router = Router()

router.post('/register', upload.single('file'), registerUser)

router.post('/login', loginUser)
router.post('/logout', logoutUser)
router.get('/me', getMe)

export default router
