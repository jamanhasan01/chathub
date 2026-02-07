import bcrypt from 'bcrypt'

import User from '../models/User.model.js'

/* =============================== resgister User Service ================================ */
export const registerUserService = async (
  name: string,
  email: string,
  password: string,
  phone: string,
) => {
  const userExists = await User.findOne({ email })
  if (userExists) {
    throw new Error('A user with this email already exists.')
  }

  const newUser = await User.create({ name, email, password, phone })

  return newUser
}

/* =============================== Login User Service ================================ */
export const loginUserService = async (email: string, password: string) => {
  const userExists = await User.findOne({ email }).select('+password')
  if (!userExists) {
    throw new Error('User not found')
  }
  const isMatch = await bcrypt.compare(password, userExists.password)

  return {
    isMatch,
    userExists,
  }
}
