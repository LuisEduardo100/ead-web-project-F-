import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/common/Button";
import { LoadingSpinner } from "../components/common/LoadingSpinner";
import EpisodeList from "../components/Episodes";
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

export default function CourseDetailsPage() {
  const { showToast } = useToast();

  const navigate = useNavigate();
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
            {" "}
            <img
              src={`${import.meta.env.VITE_PUBLIC_API_URL}/${
                course.thumbnailUrl
              }`}
              alt={course.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <Button
            onClick={() => {
              if (token) {
                navigate("/home");
              } else {
                navigate("/");
              }
            }}
          >
            Voltar
          </Button>
          <h1 className="text-4xl font-bold mt-3 mb-4">{course.name}</h1>
          <p className="text-lg text-gray-700 mb-4">{course.synopsis}</p>

          <div className="flex items-center gap-4 mb-4">
            {token && (
              <>
                <button
                  onClick={handleLikeClick}
                  className={`bg-main-red text-white px-4 py-2 rounded ${
                    isLiked
                      ? "bg-yellow-500 text-white"
                      : "bg-gray-300 text-gray-700 hover:bg-main-red-hover"
                  }`}
                >
                  {isLiked ? "Curtido" : "Curtir"}
                </button>

                <button
                  onClick={handleFavoriteClick}
                  className={`bg-main-red text-white px-4 py-2 rounded ${
                    isFavorited
                      ? "bg-yellow-500 text-white"
                      : "bg-gray-300 text-gray-700 hover:bg-main-red-hover"
                  }`}
                >
                  {isFavorited ? "Favorito" : "Favoritar"}
                </button>
              </>
            )}
            {!token && (
              <p className="text-sm text-gray-600">
                Faça login para curtir e favoritar este curso.
              </p>
            )}
          </div>

          <div className="bg-gray-100 p-4 rounded-2xl">
            <h2 className="text-2xl font-semibold mb-2">
              Episódios do curso: {course?.episodes.length}
            </h2>
            {course.episodes && course.episodes.length > 0 && (
              <EpisodeList episodes={course.episodes} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
