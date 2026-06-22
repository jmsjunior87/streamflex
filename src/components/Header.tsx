
import { Search, User, Home, Heart, Settings } from 'lucide-react';
import { useState } from 'react';
import { ThemeToggle } from './ThemeToggle';

interface HeaderProps {
  currentPage: 'home' | 'search' | 'favorites' | 'profiles';
  onPageChange: (page: 'home' | 'search' | 'favorites' | 'profiles') => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  profileName: string;
  onProfileChange: () => void;
}

export const Header = ({ 
  currentPage, 
  onPageChange, 
  searchQuery, 
  onSearchChange, 
  profileName,
  onProfileChange 
}: HeaderProps) => {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <>
      {/* Desktop Header */}
      <header className="hidden md:flex items-center justify-between p-6 bg-background/80 backdrop-blur-sm shadow-sm sticky top-0 z-40 border-b">
        <div className="flex items-center space-x-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            StreamFlex
          </h1>
          
          <nav className="flex space-x-6">
            <button
              onClick={() => onPageChange('home')}
              className={`px-4 py-2 rounded-full transition-all ${
                currentPage === 'home' 
                  ? 'bg-blue-500 text-white shadow-lg' 
                  : 'text-muted-foreground hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => onPageChange('favorites')}
              className={`px-4 py-2 rounded-full transition-all ${
                currentPage === 'favorites'
                  ? 'bg-pink-500 text-white shadow-lg'
                  : 'text-muted-foreground hover:text-pink-600 hover:bg-pink-50 dark:hover:bg-pink-950'
              }`}
            >
              Favorites
            </button>
          </nav>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search videos..."
              value={searchQuery}
              onChange={(e) => {
                onSearchChange(e.target.value);
                if (e.target.value) onPageChange('search');
              }}
              className="pl-10 pr-4 py-2 rounded-full border-2 border-border bg-background focus:border-blue-400 focus:outline-none w-64 transition-all"
            />
            <Search className="absolute left-3 top-2.5 text-muted-foreground w-5 h-5" />
          </div>
          
          <ThemeToggle />
          
          <button
            onClick={onProfileChange}
            className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg transition-all"
          >
            <User className="w-5 h-5" />
            <span>{profileName}</span>
          </button>
        </div>
      </header>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t-2 border-border z-50">
        <div className="flex justify-around py-2">
          <button
            onClick={() => onPageChange('home')}
            className={`flex flex-col items-center space-y-1 px-4 py-2 rounded-lg transition-all ${
              currentPage === 'home' 
                ? 'text-blue-600 bg-blue-50 dark:bg-blue-950' 
                : 'text-muted-foreground'
            }`}
          >
            <Home className="w-6 h-6" />
            <span className="text-xs font-medium">Home</span>
          </button>
          
          <button
            onClick={() => setShowSearch(!showSearch)}
            className={`flex flex-col items-center space-y-1 px-4 py-2 rounded-lg transition-all ${
              currentPage === 'search' 
                ? 'text-green-600 bg-green-50 dark:bg-green-950' 
                : 'text-muted-foreground'
            }`}
          >
            <Search className="w-6 h-6" />
            <span className="text-xs font-medium">Search</span>
          </button>
          
          <button
            onClick={() => onPageChange('favorites')}
            className={`flex flex-col items-center space-y-1 px-4 py-2 rounded-lg transition-all ${
              currentPage === 'favorites'
                ? 'text-pink-600 bg-pink-50 dark:bg-pink-950'
                : 'text-muted-foreground'
            }`}
          >
            <Heart className="w-6 h-6" />
            <span className="text-xs font-medium">Favorites</span>
          </button>
          
          <button
            onClick={onProfileChange}
            className="flex flex-col items-center space-y-1 px-4 py-2 rounded-lg text-purple-600 bg-purple-50 dark:bg-purple-950"
          >
            <User className="w-6 h-6" />
            <span className="text-xs font-medium">{profileName}</span>
          </button>
        </div>
      </nav>

      {/* Mobile Search Overlay */}
      {showSearch && (
        <div className="md:hidden fixed top-0 left-0 right-0 bg-background p-4 shadow-lg z-50 border-b border-border">
          <div className="relative">
            <input
              type="text"
              placeholder="Search videos..."
              value={searchQuery}
              onChange={(e) => {
                onSearchChange(e.target.value);
                if (e.target.value) onPageChange('search');
              }}
              className="w-full pl-10 pr-4 py-3 rounded-full border-2 border-border bg-background focus:border-blue-400 focus:outline-none text-lg"
              autoFocus
            />
            <Search className="absolute left-3 top-3.5 text-muted-foreground w-6 h-6" />
            <button
              onClick={() => setShowSearch(false)}
              className="absolute right-3 top-3 px-3 py-1 text-sm text-muted-foreground hover:text-foreground"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};
