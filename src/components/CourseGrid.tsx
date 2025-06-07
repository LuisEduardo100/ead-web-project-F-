import { useEffect, useState } from "react";
import type { Course } from "../types/Course";
import { LoadingSpinner } from "./common/LoadingSpinner";
import { CourseCard } from "./CourseCard";

interface CourseGridProps {
  courses: Course[];
  error: string | null;
  loading: boolean;
}

export function CourseGrid({ courses, error, loading }: CourseGridProps) {
  const [showError, setShowError] = useState(false);
  const [showNoCoursesMessage, setShowNoCoursesMessage] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    let noCoursesTimer: NodeJS.Timeout;

    if (error && !loading && !showError) {
      timer = setTimeout(() => {
        setShowError(true);
      }, 500);
    } else if (!error || loading) {
      setShowError(false);
    }

    if (!error && !loading && courses.length === 0 && !showNoCoursesMessage) {
      noCoursesTimer = setTimeout(() => {
        setShowNoCoursesMessage(true);
      }, 500);
    } else if (error || loading || courses.length > 0) {
      setShowNoCoursesMessage(false);
    }
    return () => {
      clearTimeout(timer);
      clearTimeout(noCoursesTimer);
    };
  }, [error, loading, courses.length, showError, showNoCoursesMessage]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (courses.length === 0 && showNoCoursesMessage) {
    return (
      <div className="text-center p-8 text-gray-600">
        Nenhum curso encontrado para esta categoria. C
      </div>
    );
  }

  if (error && showError) {
    return (
      <div className="text-center p-8 text-red-600">
        Erro ao carregar cursos: {error}
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
