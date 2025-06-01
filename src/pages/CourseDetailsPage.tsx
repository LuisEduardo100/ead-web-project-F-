import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { CourseDetails } from "../types/Course";
import { LoadingSpinner } from "../components/common/LoadingSpinner";
import {
  favoriteCourse,
  getCourseDetails,
  likeCourse,
  unfavoriteCourse,
  unlikeCourse,
} from "../services/courseService";

export default function CourseDetailsPage() {
  const { id } = useParams<{ id: string }>();

  const [course, setCourse] = useState<CourseDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isFavorited, setIsFavorited] = useState<boolean>(false);
  const [tokenExists, setTokenExists] = useState<boolean>(false);

  useEffect(() => {
    setTokenExists(!!sessionStorage.getItem("token"));

    if (!id) {
      setError("ID do curso não fornecido!");
      setLoading(false);
      return;
    }

    const fetchDetails = async () => {
      try {
        setLoading(true);
        const data = await getCourseDetails(id);
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
  }, [id]);

  const handleLikeClick = async () => {
    if (!tokenExists) {
      alert("Você precisa estar logado para curtir um curso!");
      return;
    }
    if (id) {
      const success = isLiked ? await unlikeCourse(id) : await likeCourse(id);
      if (success) {
        setIsLiked(!isLiked);
      } else {
        alert(`Erro ao ${isLiked ? "descurtir" : "curtir"} o curso.`);
      }
    }
  };

  const handleFavoriteClick = async () => {
    if (!tokenExists) {
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
        alert(`Erro ao ${isFavorited ? "desfavoritar" : "favoritar"} o curso.`);
      }
    }
  };

  if (loading) {
    return <LoadingSpinner size="large" />;
  }

  if (error) {
    return <div className="text-center p-8 text-red-600">Erro: {error}</div>;
  }

  if (!course) {
    return <div className="text-center p-8">Curso não encontrado.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">{course.name}</h1>
      <img
        src={`${import.meta.env.VITE_PUBLIC_API_URL}/${course.thumbnailUrl}`}
        alt={course.name}
        className="w-full h-96 object-cover rounded-lg mb-6"
      />
      <p className="text-lg text-gray-700 mb-4">{course.synopsis}</p>

      <div className="flex items-center gap-4 mb-4">
        {tokenExists && (
          <>
            <button
              onClick={handleLikeClick}
              className={`px-4 py-2 rounded ${
                isLiked
                  ? "bg-green-500 text-white"
                  : "bg-gray-300 text-gray-700 hover:bg-gray-400"
              }`}
            >
              {isLiked ? "&#10003; Curtido" : "Curtir"}
            </button>

            <button
              onClick={handleFavoriteClick}
              className={`px-4 py-2 rounded ${
                isFavorited
                  ? "bg-yellow-500 text-white"
                  : "bg-gray-300 text-gray-700 hover:bg-gray-400"
              }`}
            >
              {isFavorited ? "&#9733; Favorito" : "Favoritar"}
            </button>
          </>
        )}
        {!tokenExists && (
          <p className="text-sm text-gray-600">
            Faça login para curtir e favoritar este curso.
          </p>
        )}
      </div>

      <div className="bg-gray-100 p-4 rounded-lg">
        <h2 className="text-2xl font-semibold mb-2">Detalhes:</h2>
      </div>

      <button
        onClick={() => window.history.back()}
        className="mt-6 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        Voltar
      </button>
    </div>
  );
}
