import { api } from "../api/axios";

export interface RegisterParams {
  firstName: string;
  lastName: string;
  phone: string;
  birth: string;
  email: string;
  password: string;
}

interface LoginParams {
  email: string;
  password: string;
}

export async function login(params: LoginParams) {
  const response = await api.post("/auth/login", params);

  if (response.status === 200) {
    sessionStorage.setItem("token", response.data.token);
  }

  return response;
}

export async function register(params: RegisterParams) {
  const response = await api.post("/auth/register", params, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
}
