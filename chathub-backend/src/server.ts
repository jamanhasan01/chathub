/* =============================== Imports ================================ */
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import authRoutes from './routes/auth.routes'
import userRoutes from './routes/user.routes'
import roomRoutes from './routes/room.routes'
import messageRoutes from './routes/message.routes'

import connectDB from './config/connectDB'
import { errorMiddleware } from './middlewares/error.middleware'
import { app, io, server } from './utils/socket'

dotenv.config()

/* =============================== CORS CONFIG ================================ */
app.use(
  cors({
    origin: ['https://chathub-frontend-beta.vercel.app/'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  }),
)

/* =============================== Global Middleware ================================ */
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/* =============================== Connect DB ================================ */
connectDB()

/* =============================== Test Route ================================ */
app.get('/', (_req, res) => {
  res.send('server running well')
})

/* =============================== Routes ================================ */
app.use('/api/auth', authRoutes)
app.use('/api', userRoutes)
app.use('/api/chat', roomRoutes)
app.use('/api/chat', messageRoutes)

/* =============================== Error Middleware ================================ */
app.use(errorMiddleware)

/* =============================== Socket.IO ================================ */
io.on('connection', (socket) => {
  console.log('User connected:', socket.id)

  /* =============================== Join Room ================================ */
  socket.on('join-room', (roomId: string) => {
    if (!roomId) return
    socket.join(roomId)
    console.log(`Socket ${socket.id} joined room ${roomId}`)
  })

  /* =============================== Leave Room ================================ */
  socket.on('leave-room', (roomId: string) => {
    if (!roomId) return
    socket.leave(roomId)
    console.log(`Socket ${socket.id} left room ${roomId}`)
  })

  /* =============================== Disconnect ================================ */
  socket.on('disconnect', (reason) => {
    console.log('User disconnected:', socket.id, reason)
  })
})

/* =============================== Server Start ================================ */
server.listen(process.env.PORT, () => {
  console.log('Server running on', process.env.PORT)
})
