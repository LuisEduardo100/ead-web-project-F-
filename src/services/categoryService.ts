import { api } from "../api/axios";
import type { Categories, CategoryWithCourse } from "../types/Category";

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
): Promise<CategoryWithCourse> {
  const token = sessionStorage.getItem("token");

  try {
    const response = await api.get(
      `${import.meta.env.VITE_PUBLIC_API_URL}/categories/${categoryId}`,
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
