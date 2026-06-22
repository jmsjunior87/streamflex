import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, Volume, VolumeOff, Maximize, ArrowLeft, Heart } from 'lucide-react';

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
  onEnded,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const youtubeEmbedRef = useRef<HTMLDivElement | null>(null);
  const youtubePlayerRef = useRef<any>(null);

  // Mantemos as referências, mas elas não serão usadas na lógica simplificada
  const hlsRef = useRef<any>(null);
  const objectUrlRef = useRef<string | null>(null);

  const youtubeId = video.youtubeId || getYouTubeId(video.videoUrl);
  const isYouTubeVideo = Boolean(youtubeId);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Eventos nativos do vídeo
  useEffect(() => {
    if (isYouTubeVideo) {
      setLoading(false);
      return;
    }

    const el = videoRef.current;
    if (!el) return;

    const onLoadedData = () => {
      setDuration(Number.isFinite(el.duration) ? el.duration : 0);
      setLoading(false);
    };
    const onTimeUpdate = () => setCurrentTime(el.currentTime);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEndedEvent = () => onEnded?.();
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
  }, [video, isYouTubeVideo, onEnded]);

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
      const loadYouTubePlayer = () => {
        if (!youtubeEmbedRef.current || !youtubeId) return;

        if (youtubePlayerRef.current) {
          try {
            youtubePlayerRef.current.destroy();
          } catch {}
          youtubePlayerRef.current = null;
        }

        youtubePlayerRef.current = new (window as any).YT.Player(youtubeEmbedRef.current, {
          videoId: youtubeId,
          playerVars: {
            autoplay: 1,
            controls: 1,
            rel: 0,
            modestbranding: 1,
            showinfo: 0,
            iv_load_policy: 3,
          },
          events: {
            onReady: (event: any) => {
              setLoading(false);
              setIsPlaying(true);
              try {
                event.target.playVideo();
              } catch {
                // autoplay pode falhar dependendo do navegador
              }
            },
            onStateChange: (event: any) => {
              if (event.data === (window as any).YT.PlayerState.ENDED) {
                setIsPlaying(false);
                onEnded?.();
              } else if (event.data === (window as any).YT.PlayerState.PLAYING) {
                setIsPlaying(true);
              } else if (event.data === (window as any).YT.PlayerState.PAUSED) {
                setIsPlaying(false);
              }
            },
          },
        });
      };

      const setupYouTubeApi = () => {
        const existingScript = document.querySelector('script[src="https://www.youtube.com/iframe_api"]');
        const previousCallback = (window as any).onYouTubeIframeAPIReady;

        (window as any).onYouTubeIframeAPIReady = () => {
          if (typeof previousCallback === 'function') {
            previousCallback();
          }
          loadYouTubePlayer();
        };

        if (!existingScript) {
          const script = document.createElement('script');
          script.src = 'https://www.youtube.com/iframe_api';
          document.body.appendChild(script);
        } else if ((window as any).YT && (window as any).YT.Player) {
          loadYouTubePlayer();
        }
      };

      setupYouTubeApi();
      return () => {
        if (youtubePlayerRef.current) {
          try {
            youtubePlayerRef.current.destroy();
          } catch {}
          youtubePlayerRef.current = null;
        }
      };
    }

    if (!el) return;

    el.crossOrigin = 'anonymous';
    el.playsInline = true;
    el.preload = 'metadata';

    console.log('URL de vídeo sendo usada:', video.videoUrl);

    el.src = video.videoUrl;
    el.load();

    el.play().catch(playError => {
      if (playError.name === 'NotAllowedError' || playError.name === 'AbortError') {
        console.log('Reprodução automática bloqueada ou abortada. Clique para iniciar.');
        setLoading(false);
      } else {
        console.error('Erro ao tentar reproduzir:', playError);
        setLoading(false);
      }
    });

    return () => {};
  }, [video.videoUrl, isYouTubeVideo, youtubeId, onEnded]);

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
      <div className={`relative w-full ${isFullscreen ? 'h-full' : ''}`}>
        <div
          className={`relative w-full ${isFullscreen ? 'h-full max-w-none' : 'max-w-4xl mx-auto'}`}
          style={{ background: '#000' }}
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
              ref={youtubeEmbedRef}
              className="relative w-full"
              style={isFullscreen ? { height: '100%' } : { paddingTop: '56.25%' }}
            />
          ) : (
            <video 
              ref={videoRef}
              className="w-full"
              onClick={handlePlayPause}
              onEnded={onEnded}
              controls={false}
              style={{ width: '100%', height: isFullscreen ? '100%' : 'auto', background: '#000' }}
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
        className="absolute top-4 left-4 text-white bg-black bg-opacity-50 p-2 rounded-full"
      >
        <ArrowLeft />
      </button>

      <div style={{ position: 'absolute', right: 16, top: 16, color: '#fff' }}>
        {video.title}
      </div>
    </div>
  );
};
