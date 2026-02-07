import { Router } from 'express'
import { getAllUser, getSingleUser } from '../controllers/user.controller.js'

const router = Router()
router.get('/users',getAllUser)
router.get('/users/:id', getSingleUser)

export default router
