import { api } from "../api/axios";
import type { CourseDetails } from "../types/Course";

export async function getCourseDetails(
  id: string
): Promise<CourseDetails | null> {
  const response = await api.get(`/courses/${id}`).catch((err) => {
    if (err.response.status === 404) {
      return console.error("Curso não encontrado: ", err.response);
    }
    return err;
  });

  if (response.status === 200) {
    return response.data;
  }
  return null;
}

export async function likeCourse(courseId: string): Promise<boolean> {
  try {
    const response = await api.post(`/courses/${courseId}/like`);
    return response.status === 200; // Retorna true se sucesso
  } catch (error) {
    console.error(
      "Erro ao curtir o curso:",
      (error as AxiosError).response?.data || error
    );
    return false;
  }
}

export async function unlikeCourse(courseId: string): Promise<boolean> {
  try {
    const response = await api.delete(`/courses/${courseId}/like`);
    return response.status === 200;
  } catch (error) {
    console.error(
      "Erro ao descurtir o curso:",
      (error as AxiosError).response?.data || error
    );
    return false;
  }
}

export async function favoriteCourse(courseId: string): Promise<boolean> {
  try {
    const response = await api.post(`/courses/${courseId}/favorite`);
    return response.status === 200;
  } catch (error) {
    console.error(
      "Erro ao favoritar o curso:",
      (error as AxiosError).response?.data || error
    );
    return false;
  }
}

export async function unfavoriteCourse(courseId: string): Promise<boolean> {
  try {
    const response = await api.delete(`/courses/${courseId}/favorite`);
    return response.status === 200;
  } catch (error) {
    console.error(
      "Erro ao desfavoritar o curso:",
      (error as AxiosError).response?.data || error
    );
    return false;
  }
}
