import express from 'express'
import { createServer } from 'node:http'
import { Server } from 'socket.io'
const app = express()
const server = createServer(app)


const io = new Server(server, {
  cors: {
    origin: "https://chathub-frontend-beta.vercel.app",
    credentials: true
  }
});
export { app, server, io }
