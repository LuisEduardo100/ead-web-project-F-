import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CourseGrid } from "../components/CourseGrid";
import {
  getCategories,
  getCoursesByCategory,
} from "../services/categoryService";
import type { Category } from "../types/Category";
import type { Course } from "../types/Course";
import ContinueWatching from "../components/ContinueWatching";
import CategoryBar from "../components/CategoryBar";
import HeaderAuth from "../components/HeaderAuth";
import { getFavoriteCourses } from "../services/favoriteService";

const FAVORITES_CATEGORY_ID = -1;

export function HomeAuth() {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loadingCourses, setLoadingCourses] = useState(false);
  const [errorCategories, setErrorCategories] = useState<string | null>(null);
  const [errorCourses, setErrorCourses] = useState<string | null>(null);
  const [hasFavorites, setHasFavorites] = useState(false);
  const [favoriteCourses, setFavoriteCourses] = useState<Course[]>([]);

  useEffect(() => {
    const authenticate = async () => {
      if (!token) {
        navigate("/");
      }
    };
    authenticate();
  }, [navigate, token]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let fetchedFavorites: Course[] = [];
        try {
          const favoritesData = await getFavoriteCourses();
          if (favoritesData.courses && favoritesData.courses.length > 0) {
            setHasFavorites(true);
            fetchedFavorites = favoritesData.courses;
            setFavoriteCourses(favoritesData.courses);
          } else {
            setHasFavorites(false);
            setFavoriteCourses([]);
          }
        } catch (favErr) {
          console.error(
            "Erro ao buscar cursos favoritos (na inicialização):",
            favErr
          );
          setHasFavorites(false);
          setFavoriteCourses([]);
        }

        const categoriesData = await getCategories();
        setCategories(categoriesData.categories);

        if (fetchedFavorites.length > 0) {
          setSelectedCategory(FAVORITES_CATEGORY_ID);
        } else if (categoriesData.categories.length > 0) {
          setSelectedCategory(categoriesData.categories[0].id);
        } else {
          setSelectedCategory(null);
        }
      } catch (err) {
        if (err instanceof Error) {
          setErrorCategories(err.message);
        } else {
          setErrorCategories("Erro ao carregar categorias.");
        }
      }
    };

    fetchData();
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

        let dataCourses: Course[];
        if (selectedCategory === FAVORITES_CATEGORY_ID) {
          dataCourses = favoriteCourses;
        } else {
          const data = await getCoursesByCategory(selectedCategory);
          dataCourses = data.courses;
        }
        setCourses(dataCourses);
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
  }, [selectedCategory, favoriteCourses]);

  const handleSelectCategory = useCallback((categoryId: number) => {
    setSelectedCategory(categoryId);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <HeaderAuth />
      <section className="bg-gray-50 flex-grow py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContinueWatching />
          <CategoryBar
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={handleSelectCategory}
            error={errorCategories}
            hasFavorites={hasFavorites}
            favoritesId={FAVORITES_CATEGORY_ID}
          />
          <CourseGrid
            courses={courses}
            error={errorCourses}
            loading={loadingCourses}
          />
        </div>
      </section>
    </div>
  );
}
