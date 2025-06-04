import type { Course } from "../types/Course";
import { LoadingSpinner } from "./common/LoadingSpinner";
import { CourseCard } from "./CourseCard";

interface CourseGridProps {
  courses: Course[];
  loading: boolean;
  error: string | null;
}

export function CourseGrid({ courses, loading, error }: CourseGridProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8 text-red-600">
        Erro ao carregar cursos: {error}
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="text-center p-8 text-gray-600">
        Nenhum curso encontrado para esta categoria.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}
