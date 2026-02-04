/* =============================== types ================================ */

/* =============================== user type ================================ */
export interface IUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
  image?: string;
  isOnline: boolean;
  createdAt: string;
  updatedAt: string;
}

/* =============================== api response ================================ */
export interface IUserResponse {
  success: boolean;
  data: IUser[];
  pagination: {
    page: number;
    limit: number;
    total_pages: number;
    total_user: number;
  };
}



export interface ILoginResponse {
  message: string
  user: {
    _id: string
    name: string
    email: string
  }
}

/* =============================== types ================================ */
export interface IRegisterPayload {
  name: string
  email: string
  phone: string
  password: string
}



