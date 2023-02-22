export interface User {
  
  name: string;
  username: string;
  email: string;
  password: string;
  cpf: string;
  isAdmin: string;
  imageUrl: string;
}

export interface UserUpdate {
  user: User;
  id: string;
}

export interface UserResponse {
  id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  cpf: string;
  isAdmin: string;
  imageUrl: string;
  updatedAt?: string;
  createdAt?: string;
}
