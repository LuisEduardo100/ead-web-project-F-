import { useEffect, useState, useRef, useCallback } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../components/common/LoadingSpinner";
import Button from "../components/common/Button";
import {
  getCourseDetails,
  getCourseDetailsNoAuth,
} from "../services/courseService";
import type { Episode } from "../types/Episode";
import type { CourseDetails } from "../types/Course";
import {
  getEpisodeStream,
  getEpisodeWatchTime,
  setEpisodeWatchTime,
} from "../services/episodeService";
import ReactPlayer from "react-player";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import Replay10 from "@mui/icons-material/Replay10";
import Forward10 from "@mui/icons-material/Forward10";
import ArrowBackButton from "../components/common/ArrowBackButton";
import HeaderAuth from "../components/HeaderAuth";

export default function EpisodePage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const playerRef = useRef<ReactPlayer>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const episodeRef = useRef<Episode | null>(null);

  const [episode, setEpisode] = useState<Episode | null>(null);
  const [course, setCourse] = useState<CourseDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [currentWatchTime, setCurrentWatchTime] = useState(0);

  const token = sessionStorage.getItem("token");

  const [prevEpisode, setPrevEpisode] = useState<Episode | null>(null);
  const [nextEpisode, setNextEpisode] = useState<Episode | null>(null);

  /**
   * ESTADOS DOS CONTROLES CUSTOMIZADOS
   */
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);
  const initialPlayAttempted = useRef(false);

  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const hideControls = useCallback(() => {
    if (playing) {
      controlsTimeoutRef.current = setTimeout(() => {
        setControlsVisible(false);
      }, 3000);
    }
  }, [playing]);

  const showControls = useCallback(() => {
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    setControlsVisible(true);
    hideControls();
  }, [hideControls]);

  const handleMouseMove = useCallback(() => {
    showControls();
  }, [showControls]);

  const handleMouseLeave = useCallback(() => {
    if (playing) {
      setControlsVisible(false);
    }
  }, [playing]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const courseId = queryParams.get("courseid");

    if (!id || !courseId) {
      setError("ID do episódio ou do curso não fornecido na URL!");
      setLoading(false);
      return;
    }

    const fetchEpisodeAndCourseDetails = async () => {
      try {
        setLoading(true);

        let courseData;
        if (token) {
          courseData = await getCourseDetails(courseId);
        } else {
          courseData = await getCourseDetailsNoAuth(courseId);
        }

        if (courseData) {
          setCourse(courseData);
          const sortedEpisodes = courseData.episodes.sort(
            (a: Episode, b: Episode) => a.order - b.order
          );
          const foundEpisodeIndex = sortedEpisodes.findIndex(
            (ep: Episode) => ep.id.toString() === id
          );

          if (foundEpisodeIndex !== -1) {
            const foundEpisode = sortedEpisodes[foundEpisodeIndex];
            setEpisode(foundEpisode);
            episodeRef.current = foundEpisode;

            setPrevEpisode(
              foundEpisodeIndex > 0
                ? sortedEpisodes[foundEpisodeIndex - 1]
                : null
            );
            setNextEpisode(
              foundEpisodeIndex < sortedEpisodes.length - 1
                ? sortedEpisodes[foundEpisodeIndex + 1]
                : null
            );

            const streamData = await getEpisodeStream(
              foundEpisode.videoUrl,
              token
            );
            setVideoUrl(streamData);

            if (token) {
              const watchTimeData = await getEpisodeWatchTime(foundEpisode.id);
              if (watchTimeData && watchTimeData.seconds) {
                setCurrentWatchTime(watchTimeData.seconds);
              } else {
                setCurrentWatchTime(0);
              }
            } else {
              setCurrentWatchTime(0);
            }
          } else {
            setError("Episódio não encontrado neste curso.");
          }
        } else {
          setError("Curso não encontrado.");
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Ocorreu um erro desconhecido ao carregar o episódio.");
        }
      } finally {
        setLoading(false);
        initialPlayAttempted.current = false;
      }
    };

    fetchEpisodeAndCourseDetails();

    return () => {
      if (playerRef.current && token && episodeRef.current) {
        const currentPlaybackTime = playerRef.current.getCurrentTime();
        setEpisodeWatchTime(
          episodeRef.current.id,
          Math.floor(currentPlaybackTime)
        );
      }
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }

      setPlaying(false);
      setVideoUrl(null);
      setCurrentWatchTime(0);
      setProgress(0);
      setDuration(0);
      initialPlayAttempted.current = false;
    };
  }, [id, location.search, token]);

  /**
   * FUNÇÕES DO CONTROLE CUSTOMIZADO
   */

  const handlePlayPause = useCallback(() => {
    setPlaying((prevPlaying) => !prevPlaying);
  }, []);

  const handleVolumeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newVolume = parseFloat(e.target.value);
      setVolume(newVolume);
      setMuted(newVolume === 0);
    },
    []
  );

  const handleToggleMuted = useCallback(() => {
    setMuted((prevMuted) => !prevMuted);
    setVolume((prevVolume) => (muted || prevVolume === 0 ? 0.8 : prevVolume));
  }, [muted]);

  const handleSeekMouseDown = useCallback(() => {
    setSeeking(true);
  }, []);

  const handleSeekChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newProgress = parseFloat(e.target.value);
      setProgress(newProgress);
    },
    []
  );

  const handleSeekMouseUp = useCallback(
    (e: React.MouseEvent<HTMLInputElement>) => {
      setSeeking(false);
      if (playerRef.current) {
        const seekToTime =
          parseFloat((e.target as HTMLInputElement).value) * duration;
        playerRef.current.seekTo(seekToTime, "seconds");
      }
    },
    [duration]
  );

  const handleProgress = useCallback(
    (state: {
      playedSeconds: number;
      played: number;
      loaded: number;
      loadedSeconds: number;
    }) => {
      if (!seeking) {
        setProgress(state.played);
      }

      const currentPlaybackTime = Math.floor(state.playedSeconds);

      if (token && episodeRef.current) {
        if (
          currentPlaybackTime % 5 === 0 ||
          currentPlaybackTime === 0 ||
          Math.abs(duration - currentPlaybackTime) < 1
        ) {
          setEpisodeWatchTime(episodeRef.current.id, currentPlaybackTime);
        }
      }
    },
    [seeking, token, duration]
  );

  const handleDuration = useCallback((d: number) => {
    setDuration(d);
  }, []);

  const handleNavigateEpisode = useCallback(
    (episodeToNavigate: Episode) => {
      if (playerRef.current && token && episodeRef.current) {
        setEpisodeWatchTime(
          episodeRef.current.id,
          Math.floor(playerRef.current.getCurrentTime())
        );
      }
      initialPlayAttempted.current = false;
      navigate(`/episodes/${episodeToNavigate.id}?courseid=${course?.id}`);
    },
    [token, episodeRef, course, navigate]
  );

  const handlePlayerStartedPlaying = useCallback(() => {
    setPlaying(true);
  }, []);

  const handlePlayerReady = useCallback(() => {
    if (!initialPlayAttempted.current) {
      if (playerRef.current) {
        if (currentWatchTime > 0) {
          playerRef.current.seekTo(currentWatchTime, "seconds");
          setPlaying(true);
        } else {
          setPlaying(true);
        }
        initialPlayAttempted.current = true;
      }
    }
  }, [currentWatchTime]);

  const handleEnded = useCallback(() => {
    if (playerRef.current && token && episodeRef.current) {
      setEpisodeWatchTime(
        episodeRef.current.id,
        Math.floor(playerRef.current.getDuration())
      );
      setPlaying(false);
      initialPlayAttempted.current = false;
      if (nextEpisode) {
        handleNavigateEpisode(nextEpisode);
      } else {
        navigate(`/courses/${course?.id}`);
      }
    }
  }, [token, nextEpisode, handleNavigateEpisode, navigate, course?.id]);

  const handleFullScreen = useCallback(() => {
    if (playerContainerRef.current) {
      if (!isFullScreen) {
        if (playerContainerRef.current.requestFullscreen) {
          playerContainerRef.current.requestFullscreen();
        } else if (playerContainerRef.current.mozRequestFullScreen) {
          playerContainerRef.current.mozRequestFullScreen();
        } else if (playerContainerRef.current.webkitRequestFullscreen) {
          playerContainerRef.current.webkitRequestFullscreen();
        } else if (playerContainerRef.current.msRequestFullscreen) {
          playerContainerRef.current.msRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      }
    }
  }, [isFullScreen]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullScreen(
        !!document.fullscreenElement ||
          !!document.webkitFullscreenElement ||
          !!document.mozFullScreenElement ||
          !!document.msFullscreenElement
      );
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "MSFullscreenChange",
        handleFullscreenChange
      );
    };
  }, []);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.code === "Space" && playerRef.current) {
        event.preventDefault();
        handlePlayPause();
      }
      if (event.code === "KeyM") {
        handleToggleMuted();
      }
      if (event.code === "KeyF") {
        handleFullScreen();
      }

      if (playerRef.current) {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          playerRef.current.seekTo(
            playerRef.current.getCurrentTime() - 5,
            "seconds"
          );
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          playerRef.current.seekTo(
            playerRef.current.getCurrentTime() + 5,
            "seconds"
          );
        }
      }
    },
    [handlePlayPause, handleToggleMuted, handleFullScreen]
  );

  const handleRewind = useCallback(() => {
    if (playerRef.current) {
      playerRef.current.seekTo(
        playerRef.current.getCurrentTime() - 10,
        "seconds"
      );
    }
  }, []);

  const handleForward = useCallback(() => {
    if (playerRef.current) {
      playerRef.current.seekTo(
        playerRef.current.getCurrentTime() + 10,
        "seconds"
      );
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds < 0) return "0:00";
    const totalSeconds = Math.floor(seconds);
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours > 0) {
      return `${hours}:${remainingMinutes < 10 ? "0" : ""}${remainingMinutes}:${
        remainingSeconds < 10 ? "0" : ""
      }${remainingSeconds}`;
    }
    return `${remainingMinutes}:${
      remainingSeconds < 10 ? "0" : ""
    }${remainingSeconds}`;
  };

  /**
   * TRATAMENTO DE ERRO E CARREGAMENTO
   */
  useEffect(() => {
    const authenticate = async () => {
      if (!token) {
        navigate("/");
      }
    };
    authenticate();
  }, [navigate, token]);

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

  if (!episode || !course) {
    return (
      <div className="text-center p-8">Episódio ou curso não encontrado.</div>
    );
  }

  return (
    <>
      <HeaderAuth />
      <div className="bg-gray-50" style={{ minHeight: "calc(100vh - 58px)" }}>
        <div className="max-w-6xl py-6 container mx-auto p-4">
          <div className="flex items-center gap-3 mb-4">
            <ArrowBackButton url={`/courses/${course.id}`} token={token} />
            <h1 className="md:text-4xl sm:text-2xl xs:text-lg font-bold ">
              {episode.order}. {episode.name}{" "}
            </h1>
          </div>

          {videoUrl && (
            <div
              ref={playerContainerRef}
              className={`relative w-full rounded-lg md:rounded-2xl overflow-hidden mb-6 bg-black
            ${isFullScreen ? "fixed inset-0 z-50 rounded-none" : "aspect-video"}
            group`}
              style={{ paddingTop: isFullScreen ? "0" : "56.25%" }}
              onDoubleClick={handleFullScreen}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <ReactPlayer
                ref={playerRef}
                url={videoUrl}
                controls={false}
                playing={playing}
                volume={muted ? 0 : volume}
                muted={muted}
                width="100%"
                height="100%"
                className="absolute inset-0"
                onProgress={handleProgress}
                onDuration={handleDuration}
                onEnded={handleEnded}
                onReady={handlePlayerReady}
                onStart={handlePlayerStartedPlaying}
                onClick={handlePlayPause}
              />
              <div
                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                  playing && controlsVisible
                    ? "opacity-0 pointer-events-none"
                    : "opacity-100 pointer-events-auto"
                }`}
              >
                {!playing && (
                  <button
                    onClick={handlePlayPause}
                    className="text-white bg-main-red/50 p-2 sm:p-4 rounded-full transition-colors duration-200 hover:bg-main-red-hover/75 cursor-pointer"
                  >
                    <PlayArrowIcon
                      sx={{ fontSize: { xs: 30, sm: 60, md: 80 } }}
                    />
                  </button>
                )}
              </div>

              <div
                className={`absolute bottom-0 left-0 right-0 p-2 sm:p-3 md:p-4 bg-gradient-to-t from-black/70 to-transparent flex flex-col transition-opacity duration-300 ${
                  controlsVisible
                    ? "opacity-100"
                    : "opacity-0 pointer-events-none"
                }`}
              >
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="any"
                  value={progress}
                  onMouseDown={handleSeekMouseDown}
                  onChange={handleSeekChange}
                  onMouseUp={handleSeekMouseUp}
                  onClick={(e) => {
                    if (!seeking) {
                      const target = e.target as HTMLInputElement;
                      const rect = target.getBoundingClientRect();
                      const clickX = e.clientX - rect.left;
                      const percentage = clickX / rect.width;
                      const newProgressValue =
                        percentage *
                          (parseFloat(target.max) - parseFloat(target.min)) +
                        parseFloat(target.min);

                      setProgress(newProgressValue);
                      if (playerRef.current) {
                        playerRef.current.seekTo(
                          newProgressValue * duration,
                          "seconds"
                        );
                      }
                    }
                  }}
                  className="w-full h-1 rounded-lg appearance-none cursor-pointer mb-2 bg-gray-600/70 custom-range-thumb"
                  style={{
                    background: `linear-gradient(to right, #ef4444 ${
                      progress * 100
                    }%, #4b5563 ${progress * 100}%)`,
                  }}
                />

                <div className="flex flex-wrap justify-between items-center text-white text-[0.6rem] sm:text-xs md:text-sm lg:text-base pointer-events-auto">
                  <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-4">
                    <button
                      onClick={handleRewind}
                      className="p-0.5 sm:p-1 text-white/80 hover:text-main-red transition-colors duration-200 cursor-pointer"
                    >
                      <Replay10 sx={{ fontSize: { xs: 20, sm: 24, md: 32 } }} />
                    </button>

                    <button
                      onClick={handlePlayPause}
                      className="p-0.5 sm:p-1 text-white/80 hover:text-main-red transition-colors duration-200 cursor-pointer"
                    >
                      {playing ? (
                        <PauseIcon
                          sx={{ fontSize: { xs: 20, sm: 24, md: 32 } }}
                        />
                      ) : (
                        <PlayArrowIcon
                          sx={{ fontSize: { xs: 20, sm: 24, md: 32 } }}
                        />
                      )}
                    </button>

                    <button
                      onClick={handleForward}
                      className="p-0.5 sm:p-1 text-white/80 hover:text-main-red transition-colors duration-200 cursor-pointer"
                    >
                      <Forward10
                        sx={{ fontSize: { xs: 20, sm: 24, md: 32 } }}
                      />
                    </button>

                    <div className="flex items-center space-x-1 sm:space-x-1 md:space-x-2">
                      <button
                        onClick={handleToggleMuted}
                        className="p-0.5 sm:p-1 text-white/80 hover:text-main-red transition-colors duration-200 cursor-pointer"
                      >
                        {muted || volume === 0 ? (
                          <VolumeOffIcon
                            sx={{ fontSize: { xs: 18, sm: 20, md: 28 } }}
                          />
                        ) : (
                          <VolumeUpIcon
                            sx={{ fontSize: { xs: 18, sm: 20, md: 28 } }}
                          />
                        )}
                      </button>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="any"
                        value={volume}
                        onChange={handleVolumeChange}
                        className="w-10 sm:w-16 md:w-24 h-1 appearance-none cursor-pointer bg-gray-600/70 rounded-lg custom-range-thumb-volume"
                        style={{
                          background: `linear-gradient(to right, #ef4444 ${
                            volume * 100
                          }%, #4b5563 ${volume * 100}%)`,
                        }}
                      />
                    </div>
                    <span className="text-[0.6rem] sm:text-xs md:text-sm whitespace-nowrap">
                      {formatTime(progress * duration)} / {formatTime(duration)}
                    </span>
                  </div>

                  <div className="flex items-center">
                    <button
                      onClick={handleFullScreen}
                      className="p-0.5 sm:p-1 text-white/80 hover:text-main-red transition-colors duration-200 cursor-pointer"
                    >
                      {isFullScreen ? (
                        <FullscreenExitIcon
                          sx={{ fontSize: { xs: 20, sm: 24, md: 32 } }}
                        />
                      ) : (
                        <FullscreenIcon
                          sx={{ fontSize: { xs: 20, sm: 24, md: 32 } }}
                        />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
            <Button
              onClick={() => prevEpisode && handleNavigateEpisode(prevEpisode)}
              state={!prevEpisode}
              className={`w-full sm:w-auto ${
                !prevEpisode
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-main-red hover:bg-main-red-hover"
              } text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200`}
            >
              Episódio Anterior
            </Button>
            <Button
              onClick={() => nextEpisode && handleNavigateEpisode(nextEpisode)}
              state={!nextEpisode}
              className={`w-full sm:w-auto ${
                !nextEpisode
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-main-red hover:bg-main-red-hover"
              } text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200`}
            >
              Próximo Episódio
            </Button>
          </div>

          <div className="bg-gray-100 p-4 rounded-2xl">
            <h2 className="text-xl md:text-2xl font-semibold mb-2">
              Sobre o episódio
            </h2>
            <p className="text-lg text-gray-700 mb-4">{episode.synopsis}</p>
          </div>
        </div>
      </div>
    </>
  );
}
