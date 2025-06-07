import { api } from "../api/axios";
import type { EpisodeWatching } from "../types/Episode";

interface WatchTimeResponse {
  seconds: number;
}

export async function getEpisodeStream(
  videoUrl: string,
  token: string | null
): Promise<string> {
  const url = `${
    import.meta.env.VITE_PUBLIC_API_URL
  }/episodes/stream?videoUrl=${videoUrl}&token=${token}`;
  return url;
}

export async function getEpisodeWatchTime(
  episodeId: number
): Promise<WatchTimeResponse | null> {
  const token = sessionStorage.getItem("token");
  if (!token) return null;

  try {
    const response = await api.get<WatchTimeResponse>(
      `/episodes/${episodeId}/watchTime`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar watch time do episódio:", error);
    return null;
  }
}

export async function setEpisodeWatchTime(
  episodeId: number,
  seconds: number
): Promise<boolean> {
  const token = sessionStorage.getItem("token");
  if (!token) return false;

  try {
    await api.post(
      `/episodes/${episodeId}/watchTime`,
      { seconds },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return true;
  } catch (error) {
    console.error("Erro ao definir watch time do episódio:", error);
    return false;
  }
}

export async function getWatchingEpisode(): Promise<EpisodeWatching | null> {
  const token = sessionStorage.getItem("token");
  try {
    const response = await api.get<EpisodeWatching[]>(
      "/users/current/watching",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.length > 0 ? response.data[0] : null;
  } catch (error) {
    console.error("Erro ao buscar episódio em andamento:", error);
    throw error;
  }
}
