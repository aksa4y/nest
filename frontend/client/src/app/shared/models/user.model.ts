export interface User {
  id: number;
  email: string;
  name: string;
  avatar?: string;
  phone?: string;
  bio?: string;
  location?: string;
  website?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface LoginResponse {
  email: string;
  access_token: string;
}

export interface RegisterResponse {
  msg: string;
}

export interface ProfileUpdateRequest {
  name?: string;
  email?: string;
  avatar?: string;
  phone?: string;
  bio?: string;
  location?: string;
  website?: string;
}