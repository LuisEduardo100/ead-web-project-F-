import { api } from "../api/axios";
import type { Categories, CategoriesWithCourse } from "../types/Category";

export async function getCategories(): Promise<Categories> {
  const token = sessionStorage.getItem("token");

  try {
    const response = await api.get(
      `${import.meta.env.VITE_PUBLIC_API_URL}/categories`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar categorias:", error);
    throw error;
  }
}

export async function getCoursesByCategory(
  categoryId: number | string
): Promise<CategoriesWithCourse[]> {
  const token = sessionStorage.getItem("token");

  try {
    const response = await api.get(
      `${import.meta.env.VITE_PUBLIC_API_URL}/categories/${categoryId}/courses`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar cursos da categoria ${categoryId}:`, error);
    throw error;
  }
}
