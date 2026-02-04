import { NextFunction, Response } from 'express'
import { AuthRequest } from '../types/auth.type'
import ChatMessage from '../models/Message.model'
import ChatRoom from '../models/Room.model'

export const chatMessage = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const sender = req.user?.userId
  const { roomId, content } = req.body
  if (!sender) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  if (!roomId || !content) {
    return res.status(401).json({ success: false, message: 'room and content is required' })
  }
  const message = await ChatMessage.create({ room: roomId, sender, content })
  console.log('message ', message)

  const storeInRoom = await ChatRoom.findByIdAndUpdate(
    roomId,
    { lastMessage: message._id },
    { new: true },
  )
  if (!storeInRoom) {
    return res.status(401).json({ success: false, message: 'room not found' })
  }
  res.json({ success: true, data: storeInRoom })
}

/* =============================== Get Messages by Room ================================ */
export const messages = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { roomId } = req.params

    if (!roomId) {
      return res.status(400).json({
        success: false,
        message: 'Room ID is required',
      })
    }

    const findMessages = await ChatMessage.find({ room: roomId })
      .populate('sender', 'name email avatar')
      .sort({ createdAt: 1 }) // oldest → newest
    console.log('find message', findMessages)

    res.status(200).json({
      success: true,
      data: findMessages,
    })
  } catch (error) {
    next(error)
  }
}
