import { useNavigate } from "react-router-dom";
import type { EpisodeWatching } from "../types/Episode";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

interface ContinueWatchingCardProps {
  episode: EpisodeWatching;
}

export default function ContinueWatchingCard({
  episode,
}: ContinueWatchingCardProps) {
  const navigate = useNavigate();

  const progress = (episode.watchTime.seconds / episode.secondsLong) * 100;

  const handleClick = () => {
    navigate(`/episodes/${episode.id}?courseid=${episode.course.id}`, {
      state: { initialWatchTime: episode.watchTime.seconds },
    });
  };

  return (
    <div
      className="relative w-full max-w-xs rounded-lg overflow-hidden shadow-md bg-white cursor-pointer hover:shadow-lg transition-shadow duration-300 transform "
      onClick={handleClick}
    >
      <div className="w-full h-40 bg-gray-200 flex items-center justify-center relative">
        {episode.course.thumbnailUrl && (
          <img
            src={`${import.meta.env.VITE_PUBLIC_API_URL}/${
              episode.course.thumbnailUrl
            }`}
            alt={episode.course.name}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 flex items-center justify-center  bg-opacity-30">
          <div className="text-white bg-main-red/50 p-2 sm:p-4 rounded-full transition-colors duration-200 hover:bg-main-red-hover cursor-pointer">
            <PlayArrowIcon sx={{ fontSize: 60 }} />
          </div>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate mb-1">
          {episode.name}
        </h3>
        <p className="text-sm text-gray-600 mb-2">{episode.course.name}</p>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-main-red h-2.5 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          {Math.floor(episode.watchTime.seconds / 60)}m{" "}
          {episode.watchTime.seconds % 60}s /{" "}
          {Math.floor(episode.secondsLong / 60)}m {episode.secondsLong % 60}s
        </p>
      </div>
    </div>
  );
}
