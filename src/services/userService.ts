import { api } from "../api/axios";
import type { UpdateUser, UpdateUserPassword, User } from "../types/User";

export async function getCurrentUser(): Promise<User> {
  const token = sessionStorage.getItem("token");

  try {
    const response = await api.get<User>("/users/current", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar o usuário atual:", error);
    throw error;
  }
}

export async function updateUser(data: UpdateUser): Promise<User> {
  const token = sessionStorage.getItem("token");

  try {
    const response = await api.put<User>("/users/current", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar o usuário:", error);
    throw error;
  }
}

export async function updatePassword(data: UpdateUserPassword): Promise<void> {
  const token = sessionStorage.getItem("token");
  try {
    await api.put("/users/current/password", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Erro ao atualizar a senha:", error);
    throw error;
  }
}
