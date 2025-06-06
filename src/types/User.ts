export interface User {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  birth: string;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserUpdateInputs {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  birth: string;
}

export interface UpdateUser {
  firstName?: string;
  lastName?: string;
  phone?: string;
  birth?: string;
  email?: string;
  password?: string;
}

export interface UpdateUserPassword {
  currentPassword?: string;
  newPassword?: string;
}

export interface PasswordUpdateInputs {
  currentPassword?: string;
  newPassword?: string;
}
