
import { Play, Heart } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getAgeRatingClassName, getFallbackThumbnailUrl } from '@/lib/utils';

interface Video {
  id: string;
  title: string;
  duration: string;
  ageRating: string;
  category: string;
  description: string;
  videoUrl: string;
  externalThumbnail: string;
}

interface FeaturedBannerProps {
  video: Video;
  onPlay: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  image?: string;
  logo?: string;
}

export const FeaturedBanner = ({ video, onPlay, isFavorite, onToggleFavorite, image, logo }: FeaturedBannerProps) => {
  const [thumbnail, setThumbnail] = useState(image ?? video.externalThumbnail);

  useEffect(() => {
    setThumbnail(image ?? video.externalThumbnail);
  }, [image, video.externalThumbnail]);

  const handleThumbnailError = () => {
    setThumbnail((current) => {
      const next = getFallbackThumbnailUrl(current);
      return next !== current ? next : current;
    });
  };

  return (
    <div className="relative h-64 md:h-96 mb-8 mx-4 md:mx-8 rounded-3xl overflow-hidden shadow-2xl">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${thumbnail})` }}
      />
      <img
        src={thumbnail}
        alt={video.title}
        onError={(event) => {
          event.currentTarget.onerror = null;
          const nextSrc = getFallbackThumbnailUrl(event.currentTarget.src);
          if (nextSrc !== event.currentTarget.src) {
            event.currentTarget.src = nextSrc;
          }
        }}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
      
      <div className="absolute inset-0 flex items-center">
        <div className="p-6 md:p-12 text-white max-w-2xl">
          <div className="flex items-center space-x-3 mb-4">
            <span className="px-3 py-1 bg-blue-500 rounded-full text-sm font-semibold">
              {video.category}
            </span>
            <span className={`px-3 py-1 ${getAgeRatingClassName(video.ageRating)} rounded-full text-sm font-semibold`}>
              {video.ageRating}
            </span>
            <span className="text-sm opacity-90">{video.duration}</span>
          </div>
          
          {logo ? (
            <img src={logo} alt={video.category} className="mb-4 max-h-20 max-w-72 object-contain object-left" />
          ) : (
            <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
              {video.title}
            </h2>
          )}
          
          {video.description && (
            <p className="text-lg md:text-xl opacity-90 mb-8 leading-relaxed">
              {video.description}
            </p>
          )}
          
          <div className="flex items-center space-x-4">
            <button
              onClick={onPlay}
              className="flex items-center space-x-3 px-8 py-4 bg-blue-600 text-white rounded-full font-bold text-lg hover:bg-blue-500 transition-all transform hover:scale-105 shadow-lg dark:bg-blue-500 dark:hover:bg-blue-400"
            >
              <Play className="w-6 h-6" />
              <span>Play Now</span>
            </button>
            
            <button
              onClick={onToggleFavorite}
              className={`p-4 rounded-full transition-all transform hover:scale-110 ${
                isFavorite 
                  ? 'bg-pink-500 text-white' 
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              <Heart className={`w-6 h-6 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
