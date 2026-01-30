/* =============================== types ================================ */

export interface IUser {
  name: string
  email: string
  phone: string
  password: string
  file: FileList
}
export interface IUserResponse {
  message: string
  user: {
    id: string
    name: string
    email: string
  }
}