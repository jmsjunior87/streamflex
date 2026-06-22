
import { useState } from 'react';
import { Heart, Clock, Search } from 'lucide-react';

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

interface SearchPageProps {
  videos: Video[];
  searchQuery: string;
  onVideoSelect: (video: Video) => void;
  favorites: string[];
  onToggleFavorite: (videoId: string) => void;
}

export const SearchPage = ({ 
  videos, 
  searchQuery, 
  onVideoSelect, 
  favorites, 
  onToggleFavorite 
}: SearchPageProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedAge, setSelectedAge] = useState<string>('All');

  const categories = ['All', 'Cartoons', 'Educational', 'Adventure', 'Animals', 'Music Videos', 'Bedtime Stories'];
  const ageRatings = ['All', '1+', '2+', '3+', '4+'];

  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || video.category === selectedCategory;
    const matchesAge = selectedAge === 'All' || video.ageRating === selectedAge;
    
    return matchesSearch && matchesCategory && matchesAge;
  });

  return (
    <div className="pt-6 md:pt-0 px-4 md:px-8">
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
          {searchQuery ? `Search Results for "${searchQuery}"` : 'Browse All Videos'}
        </h2>
        
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border-2 border-gray-200 rounded-full focus:border-blue-400 focus:outline-none"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">Age Rating</label>
            <select
              value={selectedAge}
              onChange={(e) => setSelectedAge(e.target.value)}
              className="px-4 py-2 border-2 border-gray-200 rounded-full focus:border-blue-400 focus:outline-none"
            >
              {ageRatings.map(age => (
                <option key={age} value={age}>{age}</option>
              ))}
            </select>
          </div>
        </div>
        
        <p className="text-gray-600">
          {filteredVideos.length} video{filteredVideos.length !== 1 ? 's' : ''} found
        </p>
      </div>
      
      {filteredVideos.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">No videos found</h3>
          <p className="text-gray-600 text-lg">
            Try adjusting your search or filters to find what you're looking for!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {filteredVideos.map((video) => (
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
              
              <div className="space-y-1">
                <h4 className="font-semibold text-lg text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2">
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
