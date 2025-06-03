import { useNavigate } from "react-router-dom";
import type { Episode } from "../types/Episode";

export interface EpisodeListProps {
  episodes: Episode[];
}

export default function EpisodeList({ episodes }: EpisodeListProps) {
  const navigate = useNavigate();

  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}min ${remainingSeconds}s`;
  };

  const handleEpisodeClick = (episodeId: number) => {
    navigate(`/episodes/${episodeId}`);
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
                className="py-4 px-3 cursor-pointer hover:bg-gray-50 transition-colors duration-200 rounded-md"
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
