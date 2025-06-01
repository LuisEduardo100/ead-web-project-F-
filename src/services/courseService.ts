import { api } from "../api/axios";
import type { CourseDetails } from "../types/Course";

export async function getCourseDetails(
  id: string
): Promise<CourseDetails | null> {
  const token = sessionStorage.getItem("token");

  const response = await api
    .get(`/courses/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => {
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

export async function getCourseDetailsNoAuth(
  id: string
): Promise<CourseDetails | null> {
  const response = await api.get(`/course/${id}`).catch((err) => {
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
  const token = sessionStorage.getItem("token");
  try {
    const response = await api.post(
      `/likes`,
      { courseId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.status === 200 || response.status === 201;
  } catch (error) {
    console.error("Erro ao curtir o curso:", error);
    return false;
  }
}

export async function unlikeCourse(courseId: string): Promise<boolean> {
  const token = sessionStorage.getItem("token");

  try {
    const response = await api.delete(`/likes`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { courseId },
    });
    return response.status === 200 || response.status === 204;
  } catch (error) {
    console.error("Erro ao descurtir o curso: ", error);
    return false;
  }
}

export async function favoriteCourse(courseId: string): Promise<boolean> {
  const token = sessionStorage.getItem("token");
  try {
    const response = await api.post(
      `/favorites`,
      { courseId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.status === 200 || response.status === 201;
  } catch (error) {
    console.error("Erro ao favoritar o curso: ", error);
    return false;
  }
}

export async function unfavoriteCourse(courseId: string): Promise<boolean> {
  const token = sessionStorage.getItem("token");
  try {
    const response = await api.delete(`/favorites`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { courseId },
    });
    return response.status === 200 || response.status === 204;
  } catch (error) {
    console.error("Erro ao desfavoritar o curso:", error);
    return false;
  }
}
