import type { Course } from "../types/Course";

interface Props {
  course: Course;
}

export function CourseSlideCard({ course }: Props) {
  return (
    <div className="min-w-[250px] bg-white rounded-2xl shadow hover:shadow-lg transition-shadow">
      <img
        src={`${import.meta.env.VITE_PUBLIC_API_URL}/${course.thumbnailUrl}`}
        alt={course.name}
        className="w-full h-48 object-cover rounded-t-2xl"
      />
      <div className="p-3">
        <h3 className="text-lg font-bold">{course.name}</h3>
        <p className="text-sm text-gray-500">{course.synopsis}</p>
      </div>
    </div>
  );
}
