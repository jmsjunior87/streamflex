
import { useState } from 'react';
import { User, Plus } from 'lucide-react';

interface ProfileSelectorProps {
  onProfileSelect: (profileName: string) => void;
}

const profileAvatars = ['🦄', '🐱', '🐶', '🦊', '🐸', '🐼', '🦋', '🌟'];

export const ProfileSelector = ({ onProfileSelect }: ProfileSelectorProps) => {
  const [profiles] = useState([
    { name: 'Emma', avatar: '🦄' },
    { name: 'Alex', avatar: '🐱' },
    { name: 'Sophie', avatar: '🐶' },
  ]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
            StreamFlex
          </h1>
          <p className="text-xl md:text-2xl text-gray-600">
            Choose your profile to start watching!
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-8">
          {profiles.map((profile) => (
            <button
              key={profile.name}
              onClick={() => onProfileSelect(profile.name)}
              className="group flex flex-col items-center space-y-4 p-6 rounded-3xl hover:bg-white hover:shadow-xl transition-all transform hover:scale-105"
            >
              <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-4xl md:text-5xl shadow-lg group-hover:shadow-xl transition-all">
                {profile.avatar}
              </div>
              <span className="text-xl md:text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                {profile.name}
              </span>
            </button>
          ))}
          
          <button className="group flex flex-col items-center space-y-4 p-6 rounded-3xl hover:bg-white hover:shadow-xl transition-all transform hover:scale-105 border-2 border-dashed border-gray-300 hover:border-blue-400">
            <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all">
              <Plus className="w-8 h-8 md:w-12 md:h-12 text-gray-600 group-hover:text-blue-600 transition-colors" />
            </div>
            <span className="text-xl md:text-2xl font-bold text-gray-600 group-hover:text-blue-600 transition-colors">
              Add Profile
            </span>
          </button>
        </div>
        
        <p className="text-gray-500 text-lg">
          Select a profile to continue to your personalized StreamFlex experience
        </p>
      </div>
    </div>
  );
};
