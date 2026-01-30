import api from '@/lib/axios'
import type { IUserResponse } from '@/types/user.types'
import type { AxiosResponse } from 'axios'

/* =============================== register user ================================ */

export const userRegister = async (payload: FormData): Promise<AxiosResponse<IUserResponse>> => {
  try {
    const res = await api.post<IUserResponse>('/auth/register', payload)
    return res
  } catch (error: any) {
    throw error.response?.data || error
  }
}
