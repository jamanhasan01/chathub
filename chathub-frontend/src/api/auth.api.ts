import api from '@/lib/axios'
import type { IUser } from '@/types/user.types'

export interface ApiResponse<T> {
  status: boolean
  message: string
  data?: T
}

export interface ILoginPayload {
  email: string
  password: string
}

/* =============================== types ================================ */
export interface IApiError {
  message: string
}


export const userRegister = async (data: IUser) => {
  const res = await api.post<ApiResponse<IUser>>('/auth/register', data)
  console.log(res.data)
  return res.data
}

export const userLogin = async (data: ILoginPayload) => {
  const res = await api.post('auth/login', data)
  console.log('login ', res.data)

  return res.data
}

export const getMe = async () => {
  const res = await api.get<ApiResponse<IUser>>('/auth/me')
  return res.data
}

export const getAllUser=async()=>{
  const res=await api.get('/users')
  console.log('users ',res.data);
  
  return res.data
}
