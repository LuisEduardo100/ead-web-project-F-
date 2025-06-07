import type { Course } from "./Course";

export interface Episode {
  id: number;
  name: string;
  synopsis: string;
  order: number;
  videoUrl: string;
  secondsLong: number;
}

export interface WatchTime {
  seconds: number;
  userId: number;
  episodeId: number;
  createdAt: string;
  updatedAt: string;
}

export interface EpisodeWatching extends Episode {
  watchTime: WatchTime;
  course: Course;
}
