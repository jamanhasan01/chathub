import api from '@/lib/axios'
import type { IUser } from '@/types/user.types'

export interface ApiResponse<T> {
  status: boolean
  message: string
  data?: T
}

export interface RegisterPayload {
  name: string
  email: string
  phone: string
  password: string
}

export interface ILoginPayload {
  email: string
  password: string
}

/* =============================== types ================================ */
export interface IApiError {
  message: string
}

export const userRegister = async (data: RegisterPayload) => {
  const res = await api.post<ApiResponse<IUser>>('/auth/register', data)

  return res.data
}

export const userLogin = async (data: ILoginPayload) => {
  const res = await api.post('auth/login', data)
  return res.data
}

export const getMe = async () => {
  const res = await api.get<ApiResponse<IUser>>('/auth/me')
  return res.data
}

export const getAllUser = async () => {
  const res = await api.get('/users')

  return res.data
}
