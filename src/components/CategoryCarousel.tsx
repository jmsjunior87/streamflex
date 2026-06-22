
import { Heart, Clock } from 'lucide-react';
import { useRef } from 'react';

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

interface CategoryCarouselProps {
  title: string;
  videos: Video[];
  onVideoSelect: (video: Video) => void;
  favorites: string[];
  onToggleFavorite: (videoId: string) => void;
}

export const CategoryCarousel = ({ 
  title, 
  videos, 
  onVideoSelect, 
  favorites, 
  onToggleFavorite 
}: CategoryCarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-2xl md:text-3xl font-bold text-gray-800 px-2">
        {title}
      </h3>
      
      <div className="relative">
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all md:block hidden"
        >
          ←
        </button>
        
        <div
          ref={scrollRef}
          className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4 px-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {videos.map((video) => (
            <div
              key={video.id}
              className="flex-none w-48 md:w-64 group cursor-pointer"
              onClick={() => onVideoSelect(video)}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-lg group-hover:shadow-xl transition-all transform group-hover:scale-105">
                <img
                  src={video.externalThumbnail}
                  alt={video.title}
                  className="w-full h-28 md:h-36 object-cover"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(video.id);
                  }}
                  className={`absolute top-2 right-2 p-2 rounded-full transition-all ${
                    favorites.includes(video.id)
                      ? 'bg-pink-500 text-white'
                      : 'bg-white/20 text-white opacity-0 group-hover:opacity-100'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${favorites.includes(video.id) ? 'fill-current' : ''}`} />
                </button>
                
                <div className="absolute bottom-2 left-2 flex items-center space-x-1 text-white text-xs">
                  <Clock className="w-3 h-3" />
                  <span>{video.duration}</span>
                </div>
                
                <div className="absolute bottom-2 right-2 text-white text-xs">
                  <span className="bg-green-500 px-2 py-1 rounded-full">
                    {video.ageRating}
                  </span>
                </div>
              </div>
              
              <div className="p-3">
                <h4 className="font-semibold text-lg text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {video.title}
                </h4>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                  {video.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all md:block hidden"
        >
          →
        </button>
      </div>
    </div>
  );
};
