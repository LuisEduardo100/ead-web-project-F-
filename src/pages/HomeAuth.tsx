import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CategoryBar } from "../components/CategoryBar";
import { LoadingSpinner } from "../components/common/LoadingSpinner";
import { CourseGrid } from "../components/CourseGrid";
import { HeaderAuth } from "../components/HeaderAuth";
import {
  getCategories,
  getCoursesByCategory,
} from "../services/categoryService";
import type { Category } from "../types/Category";
import type { Course } from "../types/Course";

export function HomeAuth() {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingCourses, setLoadingCourses] = useState(false);
  const [errorCategories, setErrorCategories] = useState<string | null>(null);
  const [errorCourses, setErrorCourses] = useState<string | null>(null);

  useEffect(() => {
    const authenticate = async () => {
      if (!token) {
        navigate("/");
      }
    };
    authenticate();
  }, [navigate, token]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);
        const data = await getCategories();
        setCategories(data.categories);

        if (data.categories.length > 0) {
          setSelectedCategory(data.categories[0].id);
        }
      } catch (err) {
        if (err instanceof Error) {
          setErrorCategories(err.message);
        } else {
          setErrorCategories("Erro ao carregar categorias.");
        }
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      if (selectedCategory === null) {
        setCourses([]);
        return;
      }

      try {
        setLoadingCourses(true);
        setErrorCourses(null);
        const data = await getCoursesByCategory(selectedCategory);
        setCourses(data.courses);
      } catch (err) {
        if (err instanceof Error) {
          setErrorCourses(err.message);
        } else {
          setErrorCourses("Erro ao carregar cursos.");
        }
      } finally {
        setLoadingCourses(false);
      }
    };

    fetchCourses();
  }, [selectedCategory]);

  const handleSelectCategory = (categoryId: number) => {
    setSelectedCategory(categoryId);
  };

  if (loadingCategories || loadingCourses) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner size="large" />
      </div>
    );
  }
  return (
    <div className="min-h-screen flex flex-col">
      <HeaderAuth />
      <section className="bg-gray-50 flex-grow py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {loadingCategories ? (
            <div className="flex justify-center items-center py-10">
              <LoadingSpinner size="large" />
            </div>
          ) : errorCategories ? (
            <div className="text-center p-8 text-red-600">
              Erro ao carregar categorias: {errorCategories}
            </div>
          ) : (
            <CategoryBar
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={handleSelectCategory}
            />
          )}

          <CourseGrid courses={courses} error={errorCourses} />
        </div>
      </section>
    </div>
  );
}
