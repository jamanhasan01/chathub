import { Document } from 'mongoose'


export interface IUser extends Document {
  name: string
  email: string
  password: string
  image: string

  phone: string
  isBlocked: boolean
  isOnline: boolean
  comparePassword(candidatePassword: string): Promise<boolean>
}
