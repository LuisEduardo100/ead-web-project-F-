// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import "swiper/css";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import { useEffect, useState } from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Course } from "../types/Course";
import { CourseSlideCard } from "./CourseSlideCard";
import { getFeaturedCourses } from "../services/courseService";

export function SlideSection() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const fetchCourses = async () => {
      const data = await getFeaturedCourses();

      timeoutId = setTimeout(() => {
        if (data) {
          setCourses(data);
        }
        setLoading(false);
      }, 300);
    };

    fetchCourses();

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="pb-8 fade-in-slide" style={{ animationDelay: `300ms` }}>
      <h2 className="text-2xl font-semibold mb-4 text-left">
        Cursos em destaque
      </h2>
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={12}
        slidesPerView={1.2}
        breakpoints={{
          300: { slidesPerView: 1.0 },
          460: { slidesPerView: 1.2 },
          640: { slidesPerView: 1.6 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {!loading &&
          courses.map((course) => (
            <SwiperSlide key={course.id}>
              <CourseSlideCard course={course} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}
