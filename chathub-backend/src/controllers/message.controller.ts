import { NextFunction, Response } from 'express'
import { AuthRequest } from '../types/auth.type.js'
import ChatMessage from '../models/Message.model.js'
import ChatRoom from '../models/Room.model.js'
import { io } from '../utils/socket.js'

export const chatMessage = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const sender = req.user?.userId
    const { roomId, content } = req.body

    if (!sender) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    if (!roomId || !content) {
      return res.status(400).json({ success: false, message: 'room and content is required' })
    }

    // 1️⃣ Save message
    const message = await ChatMessage.create({
      room: roomId,
      sender,
      content,
    })

    // 2️⃣ Populate sender (IMPORTANT)
    const populatedMessage = await message.populate('sender', 'name email avatar')

    // 3️⃣ Update room
    await ChatRoom.findByIdAndUpdate(roomId, {
      lastMessage: message._id,
    })

    // 4️⃣ 🔥 Emit FULL message object
    io.to(roomId).emit('new-message', populatedMessage)

    // 5️⃣ Response
    res.json({ success: true, data: populatedMessage })
  } catch (error) {
    next(error)
  }
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

    res.status(200).json({
      success: true,
      data: findMessages,
    })
  } catch (error) {
    next(error)
  }
}
