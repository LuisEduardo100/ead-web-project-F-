import { api } from "../api/axios";

// interface RegisterParams {
//     firstName: string;
//     lastName: string;
//     serie: string;
//     phone: string;
//     birth: string;
//     email: string;
//     password: string;
// }

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

// export async function register(params: RegisterParams) {

// }
