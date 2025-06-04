import type { Course } from "./Course";

export interface Category {
  id: number;
  name: string;
  position: number;
}

export interface Categories {
  categories: Category[];
  page: number;
  perPage: number;
  total: number;
}

export interface CategoryWithCourse {
  id: number;
  name: string;
  courses: Course[];
}
