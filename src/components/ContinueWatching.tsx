import { useEffect, useState, memo } from "react";
import type { EpisodeWatching } from "../types/Episode";
import { getWatchingEpisode } from "../services/episodeService";
import ContinueWatchingCard from "./ContinueWatchingCard";

function ContinueWatching() {
  const [watchingEpisode, setWatchingEpisode] =
    useState<EpisodeWatching | null>(null);
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    const fetchWatchingEpisode = async () => {
      const data = await getWatchingEpisode();
      setWatchingEpisode(data);
    };

    fetchWatchingEpisode();
  }, [token]);

  if (!watchingEpisode) {
    return null;
  }

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 py-3 border-b border-gray-200">
        Continue assistindo
      </h2>
      <div className="flex sm:justify-start">
        <ContinueWatchingCard episode={watchingEpisode} />
      </div>
    </section>
  );
}

export default memo(ContinueWatching);
