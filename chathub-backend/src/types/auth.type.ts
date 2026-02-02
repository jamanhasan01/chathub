import { Request } from 'express'

/* =============================== jwt payload ================================ */
export interface JWTPayload {
  userId: string
}

/* =============================== extend express request ================================ */

export interface AuthRequest extends Request {
  user?: JWTPayload
}
