import { api } from "../api/axios";
import type { FavoriteCoursesResponse } from "../types/Course";

export async function getFavoriteCourses(): Promise<FavoriteCoursesResponse> {
  try {
    const token = sessionStorage.getItem("token");
    const response = await api.get<FavoriteCoursesResponse>("/favorites", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar cursos favoritos:", error);
    throw error;
  }
}
