import type { Episode } from "./Episode";

export interface Course {
  id: number;
  name: string;
  synopsis: string;
  thumbnailUrl: string;
}

export interface CourseDetails extends Course {
  favorited: boolean;
  liked: boolean;
  episodes: Episode[];
}

export interface FavoriteCoursesResponse {
  userId: number;
  courses: Course[];
}
