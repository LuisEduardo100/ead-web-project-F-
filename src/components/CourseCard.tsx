import { Link } from 'react-router-dom';
import type { Course } from '../types/Course';

interface Props {
  course: Course;
}

export function CourseCard({ course }: Props) {
  return (
    <Link to={`/courses/${course.id}`} className="block overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 bg-white">
      <img
        src={`${import.meta.env.VITE_PUBLIC_API_URL}/${course.thumbnailUrl}`}
        alt={course.name}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">
          {course.name}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-2">
          {course.synopsis}
        </p>
        <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
          <span className="text-main-red font-medium">Nota Dez</span>
        </div>
      </div>
    </Link>
  );
}