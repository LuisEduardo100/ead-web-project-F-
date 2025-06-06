import { useNavigate } from "react-router-dom";
import type { Episode } from "../types/Episode";
import { useToast } from "../contexts/ToastContext";

export interface EpisodeListProps {
  episodes: Episode[];
  courseId: number;
}

export default function EpisodeList({ episodes, courseId }: EpisodeListProps) {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const { showToast } = useToast();
  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}min ${remainingSeconds}s`;
  };

  const handleEpisodeClick = (episodeId: number) => {
    if (!token) {
      showToast({
        message: "Seja aluno para acessar o episódio",
        type: "error",
        duration: 1500,
      });
      return;
    }
    navigate(`/episodes/${episodeId}?courseid=${courseId}`);
  };

  return (
    <div className="bg-white shadow-md rounded-2xl mt-6">
      {episodes.length === 0 ? (
        <p className="text-gray-600">
          Nenhum episódio disponível para este curso.
        </p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {episodes
            .sort((a, b) => a.order - b.order)
            .map((episode) => (
              <li
                key={episode.id}
                className="py-4 px-3 cursor-pointer hover:bg-gray-50 transition-colors duration-200 rounded-2xl"
                onClick={() => handleEpisodeClick(episode.id)}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {episode.order}. {episode.name}
                  </h3>
                  <span className="text-sm text-gray-500">
                    {formatDuration(episode.secondsLong)}
                  </span>
                </div>
                <p className="text-gray-600 mt-1 text-sm">{episode.synopsis}</p>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
