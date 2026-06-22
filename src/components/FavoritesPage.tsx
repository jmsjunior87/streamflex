
import { Heart, Clock, Star } from 'lucide-react';

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

interface FavoritesPageProps {
  videos: Video[];
  onVideoSelect: (video: Video) => void;
  favorites: string[];
  onToggleFavorite: (videoId: string) => void;
}

export const FavoritesPage = ({ 
  videos, 
  onVideoSelect, 
  favorites, 
  onToggleFavorite 
}: FavoritesPageProps) => {
  return (
    <div className="pt-6 md:pt-0 px-4 md:px-8">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center">
            <Heart className="w-6 h-6 text-white fill-current" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            My Favorites
          </h2>
        </div>
        
        <p className="text-gray-600 text-lg">
          {videos.length === 0 
            ? "No favorites yet! Start adding videos you love." 
            : `${videos.length} favorite video${videos.length !== 1 ? 's' : ''}`
          }
        </p>
      </div>
      
      {videos.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-32 h-32 bg-gradient-to-br from-pink-100 to-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-16 h-16 text-pink-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">No favorites yet!</h3>
          <p className="text-gray-600 text-lg max-w-md mx-auto">
            Start exploring videos and tap the heart icon to add them to your favorites collection.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {videos.map((video) => (
            <div
              key={video.id}
              className="group cursor-pointer"
              onClick={() => onVideoSelect(video)}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-lg group-hover:shadow-xl transition-all transform group-hover:scale-105 mb-3">
                <img
                  src={video.externalThumbnail}
                  alt={video.title}
                  className="w-full h-32 md:h-40 object-cover"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(video.id);
                  }}
                  className="absolute top-2 right-2 p-2 bg-pink-500 text-white rounded-full transition-all transform hover:scale-110"
                >
                  <Heart className="w-4 h-4 fill-current" />
                </button>
                
                <div className="absolute top-2 left-2">
                  <div className="flex items-center space-x-1 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs">
                    <Star className="w-3 h-3 fill-current" />
                    <span>Favorite</span>
                  </div>
                </div>
                
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
              
              <div className="space-y-1">
                <h4 className="font-semibold text-lg text-gray-800 group-hover:text-pink-600 transition-colors line-clamp-2">
                  {video.title}
                </h4>
                <p className="text-sm text-gray-600 line-clamp-1">
                  {video.category}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
