// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import "swiper/css";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import "swiper/css/navigation";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { CourseSlideCard } from "./CourseSlideCard";
import type { Course } from "../types/Course";
import { api } from "../api/axios";


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
          640: { slidesPerView: 1.2 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        loop
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
