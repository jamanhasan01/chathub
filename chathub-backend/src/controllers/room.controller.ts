import { NextFunction, Request, Response } from 'express'
import { AuthRequest } from '../types/auth.type'
import ChatRoom from '../models/Room.model'

export const createRoom = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const senderId = req.user?.userId
    const reciverId = req.body?.id
    if (!senderId) {
      return res.status(401).json({ success: false, message: 'unauthorize to access' })
    }
    const room = await ChatRoom.findOne({ members: { $all: [senderId, reciverId] } })

    if (!room) {
      const create = await ChatRoom.create({ members: [senderId, reciverId] })
      return res.json({ message: 'successfully create room', data: create })
    }
    /* =============================== response ================================ */
    res.status(200).json({
      message: 'Room ready',
      data: room,
    })
  } catch (error) {
    next(error)
  }
}
