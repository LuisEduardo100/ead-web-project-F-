import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LoadingSpinner } from "../components/common/LoadingSpinner";
import { Header } from "../components/Header";
import { HeaderAuth } from "../components/HeaderAuth";
import {
  favoriteCourse,
  getCourseDetails,
  getCourseDetailsNoAuth,
  likeCourse,
  unfavoriteCourse,
  unlikeCourse,
} from "../services/courseService";
import type { CourseDetails } from "../types/Course";
import { useToast } from "../contexts/ToastContext";
import EpisodeList from "../components/EpisodeList";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
import ArrowBackButton from "../components/common/ArrowBackButton";

export default function CourseDetailsPage() {
  const { showToast } = useToast();

  const { id } = useParams<{ id: string }>();

  const [course, setCourse] = useState<CourseDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isFavorited, setIsFavorited] = useState<boolean>(false);
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (!id) {
      setError("ID do curso não fornecido!");
      setLoading(false);
      return;
    }

    const fetchDetails = async () => {
      try {
        setLoading(true);
        let data;
        if (token) {
          data = await getCourseDetails(id);
        } else {
          data = await getCourseDetailsNoAuth(id);
        }

        if (data) {
          setCourse(data);
          setIsLiked(data.liked);
          setIsFavorited(data.favorited);
        } else {
          setError("Curso não encontrado.");
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Ocorreu um erro desconhecido.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id, token]);

  const handleLikeClick = async () => {
    if (!token) {
      alert("Você precisa estar logado para curtir um curso!");
      return;
    }
    if (id) {
      const success = isLiked ? await unlikeCourse(id) : await likeCourse(id);
      if (success) {
        setIsLiked(!isLiked);
      } else {
        showToast({
          message: `Erro ao ${isFavorited ? "descutir" : "curtir"} o curso.`,
          type: "error",
        });
      }
    }
  };

  const handleFavoriteClick = async () => {
    if (!token) {
      alert("Você precisa estar logado para favoritar um curso!");
      return;
    }
    if (id) {
      const success = isFavorited
        ? await unfavoriteCourse(id)
        : await favoriteCourse(id);
      if (success) {
        setIsFavorited(!isFavorited);
      } else {
        showToast({
          message: `Erro ao ${
            isFavorited ? "desfavoritar" : "favoritar"
          } o curso.`,
          type: "error",
        });
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (error) {
    return <div className="text-center p-8 text-red-600">Erro: {error}</div>;
  }

  if (!course) {
    return <div className="text-center p-8">Curso não encontrado.</div>;
  }

  return (
    <>
      {token ? <HeaderAuth /> : <Header />}
      <div className="bg-gray-50" style={{ minHeight: "calc(100vh - 58px)" }}>
        <div className="max-w-6xl py-6 container mx-auto p-4">
          <div
            className="relative w-full h-rounded-lg mb-6 overflow-hidden rounded-2xl"
            style={{ paddingTop: "36.25%" }}
          >
            <img
              src={`${import.meta.env.VITE_PUBLIC_API_URL}/${
                course.thumbnailUrl
              }`}
              alt={course.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="flex items-center gap-3 md:gap-4 mb-4">
            <ArrowBackButton token={token} />
            <h1 className="text-2xl md:text-4xl font-bold leading-tight">
              {course.name}
            </h1>

            {token && (
              <div className="flex items-center gap-2 ml-auto">
                <button
                  onClick={handleLikeClick}
                  className={`cursor-pointer p-2 rounded-full transition-colors duration-200 ${
                    isLiked
                      ? "text-red-500 hover:bg-red-100 focus:ring-red-300"
                      : "text-gray-500 hover:bg-gray-200 focus:ring-gray-300"
                  }`}
                >
                  <FavoriteIcon sx={{ fontSize: { xs: 24, sm: 28, md: 32 } }} />
                </button>
                <button
                  onClick={handleFavoriteClick}
                  className={`cursor-pointer p-2 rounded-full transition-colors duration-200 ${
                    isFavorited
                      ? "text-yellow-500 hover:bg-yellow-100 focus:ring-yellow-300"
                      : "text-gray-500 hover:bg-gray-200 focus:ring-gray-300"
                  }`}
                >
                  <StarIcon sx={{ fontSize: { xs: 24, sm: 28, md: 32 } }} />
                </button>
              </div>
            )}
          </div>
          <p className="text-base md:text-lg text-gray-700 mb-6">
            {course.synopsis}
          </p>
          <div className="bg-gray-100 p-4 rounded-2xl">
            <h2 className="text-2xl font-semibold mb-2">
              Episódios do curso: {course?.episodes.length}
            </h2>
            {course.episodes && course.episodes.length > 0 && (
              <EpisodeList episodes={course.episodes} courseId={course.id} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
