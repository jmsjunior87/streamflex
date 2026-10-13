import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Play, Pause, Volume, VolumeOff, Maximize, ArrowLeft, Heart, X } from 'lucide-react';

interface YouTubePlayerInstance {
  destroy: () => void;
  loadVideoById: (videoId: string) => void;
  pauseVideo: () => void;
  playVideo: () => void;
  getCurrentTime: () => number;
  getDuration: () => number;
  getIframe: () => HTMLIFrameElement;
}

interface YouTubeApi {
  Player: new (
    element: HTMLElement,
    options: {
      videoId: string;
      playerVars: Record<string, number | string>;
      events: {
        onReady: (event: { target: YouTubePlayerInstance }) => void;
        onStateChange: (event: { data: number }) => void;
        onError: (event: { data: number }) => void;
      };
    },
  ) => YouTubePlayerInstance;
  PlayerState: {
    ENDED: number;
    PLAYING: number;
    PAUSED: number;
  };
}

declare global {
  interface Window {
    YT?: YouTubeApi;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let youtubeApiPromise: Promise<YouTubeApi> | undefined;

const loadYouTubeIframeApi = () => {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (youtubeApiPromise) return youtubeApiPromise;

  youtubeApiPromise = new Promise<YouTubeApi>((resolve, reject) => {
    const previousCallback = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (window.YT?.Player) {
        resolve(window.YT);
      } else {
        reject(new Error('A API de reprodução do YouTube não foi inicializada.'));
      }
      previousCallback?.();
    };

    let script = document.querySelector<HTMLScriptElement>('script[src="https://www.youtube.com/iframe_api"]');
    if (!script) {
      script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      document.head.appendChild(script);
    }

    script.addEventListener('error', () => {
      youtubeApiPromise = undefined;
      reject(new Error('Não foi possível carregar a API de reprodução do YouTube.'));
    }, { once: true });
  });

  return youtubeApiPromise;
};

interface Video {
  id: string;
  title: string;
  duration: string;
  ageRating: string;
  category: string;
  description: string;
  videoUrl: string;
  youtubeId?: string;
  externalThumbnail: string;
  extractionCode?: string;
}

interface VideoPlayerProps {
  video: Video;
  onClose: () => void;
  relatedVideos: Video[];
  onVideoSelect: (video: Video) => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  hasNextEpisode?: boolean;
  onEnded?: () => void;
}

const getYouTubeId = (url?: string) => {
  if (!url) return null;
  const patterns = [
    /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/, 
    /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/, 
    /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/, 
    /(?:youtube\.com\/v\/)([a-zA-Z0-9_-]{11})/
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match?.[1]) return match[1];
  }
  return null;
};

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  video,
  onClose,
  relatedVideos,
  onVideoSelect,
  isFavorite,
  onToggleFavorite,
  hasNextEpisode = false,
  onEnded,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const youtubePlayerRef = useRef<YouTubePlayerInstance | null>(null);
  const youtubeContainerRef = useRef<HTMLDivElement | null>(null);
  const activeYoutubeIdRef = useRef<string | null>(null);
  const currentYoutubeIdRef = useRef<string | null>(null);
  const onEndedRef = useRef(onEnded);
  const hasNextEpisodeRef = useRef(hasNextEpisode);
  const nextEpisodeCancelledRef = useRef(false);
  const youtubeProgressIntervalRef = useRef<number | null>(null);
  const ageRatingTimeoutRef = useRef<number | null>(null);
  const ageRatingShownForVideoRef = useRef(false);

  // Mantemos a referência de objeto de URL apenas para vídeos locais, se necessário.
  const hlsRef = useRef<any>(null);
  const objectUrlRef = useRef<string | null>(null);

  const youtubeId = video.youtubeId || getYouTubeId(video.videoUrl);
  currentYoutubeIdRef.current = youtubeId;
  onEndedRef.current = onEnded;
  hasNextEpisodeRef.current = hasNextEpisode;
  const isYouTubeVideo = Boolean(youtubeId);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  // força o layout a preencher a viewport do navegador ao abrir
  const [fillViewport, setFillViewport] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nextEpisodeCountdown, setNextEpisodeCountdown] = useState<number | null>(null);
  const [showAgeRating, setShowAgeRating] = useState(false);

  const showAgeRatingOnStart = useCallback(() => {
    if (ageRatingShownForVideoRef.current) return;

    ageRatingShownForVideoRef.current = true;
    setShowAgeRating(true);
    ageRatingTimeoutRef.current = window.setTimeout(() => {
      setShowAgeRating(false);
      ageRatingTimeoutRef.current = null;
    }, 5000);
  }, []);

  const clearNextEpisodeCountdown = useCallback(() => {
    setNextEpisodeCountdown(null);
  }, []);

  const updateNextEpisodeCountdown = useCallback((remainingSeconds: number) => {
    if (
      !hasNextEpisodeRef.current ||
      nextEpisodeCancelledRef.current ||
      !Number.isFinite(remainingSeconds) ||
      remainingSeconds > 10
    ) {
      setNextEpisodeCountdown(null);
      return;
    }

    setNextEpisodeCountdown(Math.max(0, Math.ceil(remainingSeconds)));
  }, []);

  const cancelNextEpisode = useCallback(() => {
    nextEpisodeCancelledRef.current = true;
    clearNextEpisodeCountdown();
  }, [clearNextEpisodeCountdown]);

  const handleEpisodeEnded = useCallback(() => {
    const shouldAdvance = hasNextEpisodeRef.current && !nextEpisodeCancelledRef.current;
    nextEpisodeCancelledRef.current = true;
    clearNextEpisodeCountdown();
    if (shouldAdvance) onEndedRef.current?.();
  }, [clearNextEpisodeCountdown]);

  const playNextEpisode = useCallback(() => {
    if (!hasNextEpisodeRef.current || nextEpisodeCancelledRef.current) return;
    nextEpisodeCancelledRef.current = true;
    clearNextEpisodeCountdown();
    onEndedRef.current?.();
  }, [clearNextEpisodeCountdown]);

  useEffect(() => {
    nextEpisodeCancelledRef.current = false;
    clearNextEpisodeCountdown();
    ageRatingShownForVideoRef.current = false;
    setShowAgeRating(false);
    if (ageRatingTimeoutRef.current !== null) {
      window.clearTimeout(ageRatingTimeoutRef.current);
      ageRatingTimeoutRef.current = null;
    }

    return () => {
      if (ageRatingTimeoutRef.current !== null) {
        window.clearTimeout(ageRatingTimeoutRef.current);
        ageRatingTimeoutRef.current = null;
      }
    };
  }, [video.id, clearNextEpisodeCountdown]);

  useEffect(() => {
    if (!isYouTubeVideo || !youtubeContainerRef.current) return;

    let disposed = false;
    setError(null);
    setLoading(true);

    loadYouTubeIframeApi()
      .then(api => {
        if (disposed || !youtubeContainerRef.current) return;

        const playerElement = document.createElement('div');
        youtubeContainerRef.current.appendChild(playerElement);
        youtubePlayerRef.current = new api.Player(playerElement, {
          videoId: currentYoutubeIdRef.current ?? youtubeId ?? '',
          playerVars: {
            autoplay: 1,
            controls: 1,
            enablejsapi: 1,
            modestbranding: 1,
            playsinline: 1,
            rel: 0,
            origin: window.location.origin,
          },
          events: {
            onReady: event => {
              const iframe = event.target.getIframe();
              iframe.title = video.title;
              Object.assign(iframe.style, {
                position: 'absolute',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
                border: '0',
              });
              setLoading(false);
            },
            onStateChange: event => {
              if (event.data === api.PlayerState.ENDED) {
                setIsPlaying(false);
                if (youtubeProgressIntervalRef.current !== null) {
                  window.clearInterval(youtubeProgressIntervalRef.current);
                  youtubeProgressIntervalRef.current = null;
                }
                handleEpisodeEnded();
              } else if (event.data === api.PlayerState.PLAYING) {
                setIsPlaying(true);
                setLoading(false);
                showAgeRatingOnStart();
                if (youtubeProgressIntervalRef.current !== null) {
                  window.clearInterval(youtubeProgressIntervalRef.current);
                }
                youtubeProgressIntervalRef.current = window.setInterval(() => {
                  const player = youtubePlayerRef.current;
                  if (!player) return;
                  updateNextEpisodeCountdown(player.getDuration() - player.getCurrentTime());
                }, 250);
              } else if (event.data === api.PlayerState.PAUSED) {
                setIsPlaying(false);
                if (youtubeProgressIntervalRef.current !== null) {
                  window.clearInterval(youtubeProgressIntervalRef.current);
                  youtubeProgressIntervalRef.current = null;
                }
              }
            },
            onError: event => {
              console.error(`Erro do player do YouTube: código ${event.data}.`);
              setError(`O YouTube não conseguiu carregar este vídeo (código ${event.data}).`);
              setLoading(false);
            },
          },
        });
        activeYoutubeIdRef.current = currentYoutubeIdRef.current;
      })
      .catch(loadError => {
        if (disposed) return;
        console.error('Falha ao inicializar o player do YouTube:', loadError);
        setError('Não foi possível inicializar a reprodução do YouTube.');
        setLoading(false);
      });

    return () => {
      disposed = true;
      if (youtubeProgressIntervalRef.current !== null) {
        window.clearInterval(youtubeProgressIntervalRef.current);
        youtubeProgressIntervalRef.current = null;
      }
      youtubePlayerRef.current?.destroy();
      youtubePlayerRef.current = null;
      activeYoutubeIdRef.current = null;
      youtubeContainerRef.current?.replaceChildren();
    };
  }, [handleEpisodeEnded, isYouTubeVideo, showAgeRatingOnStart, updateNextEpisodeCountdown]);

  useEffect(() => {
    if (!isYouTubeVideo || !youtubeId || !youtubePlayerRef.current || activeYoutubeIdRef.current === youtubeId) return;

    setError(null);
    setLoading(false);
    youtubePlayerRef.current.getIframe().title = video.title;
    youtubePlayerRef.current.loadVideoById(youtubeId);
    activeYoutubeIdRef.current = youtubeId;
  }, [isYouTubeVideo, video.title, youtubeId]);

  // Eventos nativos do vídeo
  useEffect(() => {
    if (isYouTubeVideo) {
      return;
    }

    const el = videoRef.current;
    if (!el) return;

    const onLoadedData = () => {
      setDuration(Number.isFinite(el.duration) ? el.duration : 0);
      setLoading(false);
    };
    const onTimeUpdate = () => {
      setCurrentTime(el.currentTime);
      updateNextEpisodeCountdown(el.duration - el.currentTime);
    };
    const onPlay = () => {
      setIsPlaying(true);
      showAgeRatingOnStart();
    };
    const onPause = () => setIsPlaying(false);
    const onEndedEvent = handleEpisodeEnded;
    const onError = () => {
      console.error('Erro de mídia nativo. Verifique o src e o formato.');
      setError('Não foi possível reproduzir o vídeo. Formato ou URL inválida.');
      setLoading(false);
    };

    el.addEventListener('loadedmetadata', onLoadedData);
    el.addEventListener('timeupdate', onTimeUpdate);
    el.addEventListener('play', onPlay);
    el.addEventListener('pause', onPause);
    el.addEventListener('ended', onEndedEvent);
    el.addEventListener('error', onError);

    return () => {
      el.removeEventListener('loadedmetadata', onLoadedData);
      el.removeEventListener('timeupdate', onTimeUpdate);
      el.removeEventListener('play', onPlay);
      el.removeEventListener('pause', onPause);
      el.removeEventListener('ended', onEndedEvent);
      el.removeEventListener('error', onError);
    };
  }, [handleEpisodeEnded, isYouTubeVideo, showAgeRatingOnStart, updateNextEpisodeCountdown, video]);

  // Carregamento da fonte do vídeo
  useEffect(() => {
    const el = videoRef.current;
    if (hlsRef.current) {
      try {
        hlsRef.current.destroy();
      } catch {}
      hlsRef.current = null;
    }

    if (objectUrlRef.current) {
      try {
        URL.revokeObjectURL(objectUrlRef.current);
      } catch {}
      objectUrlRef.current = null;
    }

    setError(null);
    setLoading(true);

    if (isYouTubeVideo) {
      setLoading(false);
      return;
    }

    if (!el) return;

    el.crossOrigin = 'anonymous';
    el.playsInline = true;
    el.preload = 'metadata';

    console.log('URL de vídeo sendo usada:', video.videoUrl);

    el.src = video.videoUrl;
    el.load();

    // tenta iniciar a reprodução e marca como tocando; não usamos Fullscreen API aqui
    el.play()
      .then(() => {
        setLoading(false);
        setIsPlaying(true);
      })
      .catch(playError => {
        if (playError?.name === 'NotAllowedError' || playError?.name === 'AbortError') {
          console.log('Reprodução automática bloqueada ou abortada. Clique para iniciar.');
          setLoading(false);
        } else {
          console.error('Erro ao tentar reproduzir:', playError);
          setLoading(false);
        }
      });

    return () => {};
  }, [video.videoUrl, isYouTubeVideo, youtubeId, onEnded]);

  // não usamos fullscreen: deixamos o player preencher a viewport do navegador

  // Volume e mute
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
      videoRef.current.muted = isMuted;
    }
  }, [volume, isMuted, videoRef]);

  const handlePlayPause = async () => {
    if (isYouTubeVideo) {
      const player = youtubePlayerRef.current;
      if (!player) return;

      if (isPlaying) {
        player.pauseVideo?.();
      } else {
        player.playVideo?.();
      }
      return;
    }

    const el = videoRef.current;
    if (!el) return;

    if (isPlaying) el.pause();
    else await el.play().catch(() => {});
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value || '0');
    setCurrentTime(v);
    if (videoRef.current) videoRef.current.currentTime = v;
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    setIsMuted(v === 0);
    if (videoRef.current) videoRef.current.volume = v;
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const newMuted = !isMuted;
    videoRef.current.muted = newMuted;
    setIsMuted(newMuted);
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === containerRef.current);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const formatTime = (time: number) => {
    if (!Number.isFinite(time) || time <= 0) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 overflow-hidden"
    >
      <div className={`relative w-full`}>
        <div
          className={`relative w-full ${fillViewport || isFullscreen ? 'max-w-none' : 'max-w-4xl mx-auto'}`}
          style={{
            background: '#000',
            height: fillViewport || isFullscreen ? '100vh' : undefined,
          }}
        >
          {loading && (
            <div
              style={{
                position: 'absolute',
                left: 12,
                top: 12,
                color: '#fff',
                zIndex: 2,
              }}
            >
              Carregando...
            </div>
          )}
          {error && (
            <div
              style={{
                position: 'absolute',
                left: 12,
                top: 12,
                color: 'salmon',
                zIndex: 2,
              }}
            >
              {error}
            </div>
          )}
          {isYouTubeVideo ? (
            <div
              className={`relative w-full ${fillViewport || isFullscreen ? 'fullscreen' : ''}`}
              style={fillViewport || isFullscreen ? { height: '100vh' } : { paddingTop: '56.25%' }}
            >
              <div
                ref={youtubeContainerRef}
                aria-label={video.title}
                className="absolute inset-0 h-full w-full"
              />
            </div>
          ) : (
            <video 
              ref={videoRef}
              className="w-full"
              onClick={handlePlayPause}
              onEnded={onEnded}
              controls={false}
              style={{
                position: fillViewport || isFullscreen ? 'absolute' : undefined,
                top: 0,
                left: 0,
                width: '100%',
                height: fillViewport || isFullscreen ? '100vh' : 'auto',
                background: '#000',
                objectFit: 'cover',
              }}
            >
              <source src={video.videoUrl} type="video/mp4" /> 
              Seu navegador não suporta a tag de vídeo ou o formato MP4 não é reconhecido.
            </video>
          )}

          {!isYouTubeVideo ? (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
              <div className="flex items-center justify-between mb-2">
                <button onClick={handlePlayPause} className="text-white">
                  {isPlaying ? <Pause /> : <Play />}
                </button>
                <input
                  type="range"
                  min={0}
                  max={duration || 0}
                  value={currentTime}
                  onChange={handleSeek}
                  className="flex-grow mx-4"
                />
                <div className="text-white text-sm">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <button onClick={toggleMute} className="text-white mr-2">
                    {isMuted ? <VolumeOff /> : <Volume />}
                  </button>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.05}
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-24"
                  />
                </div>

                <div>
                  <button onClick={onToggleFavorite} className="text-white mr-4">
                    <Heart fill={isFavorite ? 'red' : 'none'} />
                  </button>
                  <button onClick={toggleFullscreen} className="text-white">
                    <Maximize />
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <button
        onClick={onClose}
        aria-label="Voltar"
        title="Voltar"
        className="absolute top-4 left-4 text-white bg-black bg-opacity-70 p-3 rounded-full shadow-lg"
        style={{ zIndex: 9999 }}
      >
        <ArrowLeft size={18} />
      </button>

      {nextEpisodeCountdown !== null && (
        <div className="absolute bottom-8 right-8 z-[10001] flex items-center gap-2 rounded-xl border border-white/15 bg-slate-950/90 p-2 text-white shadow-xl backdrop-blur-sm">
          <button
            onClick={playNextEpisode}
            className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-white/10"
          >
            Próximo episódio em <span className="font-bold tabular-nums">{nextEpisodeCountdown}</span>
          </button>
          <button
            onClick={cancelNextEpisode}
            aria-label="Cancelar próximo episódio"
            title="Cancelar"
            className="rounded-lg p-2 text-slate-300 hover:bg-white/10 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      <div className="fixed bottom-8 left-8 z-[10001] text-left text-white drop-shadow-lg">
        {showAgeRating && (
          <div
            role="status"
            aria-live="polite"
            className="rounded-lg border border-green-300 bg-green-700 px-4 py-3 text-sm font-medium text-white shadow-lg"
          >
            Classificação indicativa: <span className="font-bold">{video.ageRating}</span>
          </div>
        )}
      </div>
    </div>
  );
};
