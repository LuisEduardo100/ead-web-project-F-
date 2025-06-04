// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import "swiper/css";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import { useEffect, useState } from "react";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { api } from "../api/axios";
import type { Course } from "../types/Course";
import { CourseSlideCard } from "./CourseSlideCard";


export function SlideSection() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await api.get("/courses/featured");
        if (Array.isArray(response.data)) {
          setCourses(response.data);
        } else {
          console.error("Resposta inválida: ", response.data);
        }
      } catch (error) {
        console.error("Erro ao buscar cursos em destaque", error);
      }
    }

    fetchCourses();
  }, []);

  return (
    <div>
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
        className="pb-8"
      >
        {courses.map((course) => (
          <SwiperSlide key={course.id}>
            <CourseSlideCard course={course} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
