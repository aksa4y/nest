export interface User {
  id: number;
  email: string;
  name: string;
}

export interface LoginResponse {
  email: string;
  access_token: string;
}

export interface RegisterResponse {
  msg: string;
}