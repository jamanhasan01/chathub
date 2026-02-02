/* =============================== types ================================ */

export interface IUser {
  name: string
  email: string
  phone: string
  password: string
  image: string
}
export interface IUserResponse {
  message: string
  user: {
    id: string
    name: string
    email: string
  }
}


