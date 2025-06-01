export interface Course {
  id: number;
  name: string;
  synopsis: string;
  thumbnailUrl: string;
}

export interface CourseDetails extends Course {
  favorited: boolean;
  liked: boolean;
  // episodes: Episodes[];
}
