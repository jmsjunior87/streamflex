import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Check, X } from 'lucide-react';
import { Profile, getDefaultProfiles } from '@/types/Profile';

interface ProfileManagerProps {
  onProfileSelect: (profile: Profile) => void;
}

const defaultAvatars = ['🦄', '🐱', '🐶', '🦊', '🐸', '🐼', '🦋', '🌟'];

export const ProfileManager: React.FC<ProfileManagerProps> = ({ onProfileSelect }) => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [editingProfile, setEditingProfile] = useState<Profile | null>(null);
  const [newProfile, setNewProfile] = useState<Omit<Profile, 'id'> | null>(null);

  useEffect(() => {
  const savedProfiles = localStorage.getItem('profiles');
  const defaultProfiles = getDefaultProfiles();

  if (savedProfiles) {
    const parsedProfiles = JSON.parse(savedProfiles);
    // Mescla os perfis salvos com os padrões, mantendo os existentes e adicionando os que faltam
    const mergedProfiles = [
      ...parsedProfiles,
      ...defaultProfiles.filter(defaultProfile => 
        !parsedProfiles.some(savedProfile => savedProfile.id === defaultProfile.id)
      )
    ];
    setProfiles(mergedProfiles);
    localStorage.setItem('profiles', JSON.stringify(mergedProfiles));
  } else {
    setProfiles(defaultProfiles);
    localStorage.setItem('profiles', JSON.stringify(defaultProfiles));
  }
}, []);

  const saveProfiles = (updatedProfiles: Profile[]) => {
    localStorage.setItem('profiles', JSON.stringify(updatedProfiles));
    setProfiles(updatedProfiles);
  };

  const handleEditProfile = (profile: Profile) => {
    setEditingProfile(profile);
  };

  const handleCreateProfile = () => {
    console.log('Creating new profile');
    setNewProfile({ name: '', avatar: defaultAvatars[0] });
  };

  const handleSaveNewProfile = () => {
    console.log('Saving new profile:', newProfile);
    if (newProfile && newProfile.name.trim()) {
      const newProfileWithId: Profile = {
        ...newProfile,
        id: Date.now().toString(),
      };
      const updatedProfiles = [...profiles, newProfileWithId];
      saveProfiles(updatedProfiles);
      setNewProfile(null);
    } else {
      alert('Por favor, preencha o nome do perfil.');
    }
  };

  const handleSaveEditProfile = () => {
    if (editingProfile && editingProfile.name.trim()) {
      const updatedProfiles = profiles.map(p => 
        p.id === editingProfile.id ? editingProfile : p
      );
      saveProfiles(updatedProfiles);
      setEditingProfile(null);
    } else {
      alert('Por favor, preencha o nome do perfil.');
    }
  };

  const handleDeleteProfile = (profileId: string) => {
    const updatedProfiles = profiles.filter(p => p.id !== profileId);
    saveProfiles(updatedProfiles);
  };

  const handleProfileClick = (profile: Profile) => {
    onProfileSelect(profile);
  };

  const renderProfileForm = (profile: Omit<Profile, 'id'>, onSave: () => void, onCancel: () => void) => (
    <div className="flex flex-col items-center space-y-4 p-6 bg-white rounded-3xl shadow-xl">
      <input
        type="text"
        value={profile.name}
        onChange={(e) => setNewProfile({ ...profile, name: e.target.value })}
        placeholder="Nome do perfil"
        className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <div className="flex flex-wrap justify-center gap-2">
        {defaultAvatars.map((avatar) => (
          <button
            key={avatar}
            onClick={() => setNewProfile({ ...profile, avatar })}
            className={`w-10 h-10 text-2xl rounded-full ${profile.avatar === avatar ? 'bg-blue-100 ring-2 ring-blue-400' : 'bg-gray-100'}`}
          >
            {avatar}
          </button>
        ))}
      </div>
      <div className="flex space-x-4">
        <button onClick={onSave} className="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600">
          <Check className="w-5 h-5" />
        </button>
        <button onClick={onCancel} className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600">
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-8">
          Gerenciar Perfis
        </h1>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-8">
          {profiles.map((profile) => (
            <div key={profile.id} className="relative group">
              {editingProfile?.id === profile.id ? (
                renderProfileForm(
                  editingProfile,
                  handleSaveEditProfile,
                  () => setEditingProfile(null)
                )
              ) : (
                <button
                  onClick={() => handleProfileClick(profile)}
                  className="flex flex-col items-center space-y-4 p-6 rounded-3xl bg-white hover:shadow-xl transition-all transform hover:scale-105 w-full"
                >
                  <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-4xl md:text-5xl shadow-lg">
                    {profile.avatar}
                  </div>
                  <span className="text-xl md:text-2xl font-bold text-gray-800">
                    {profile.name}
                  </span>
                </button>
              )}
              {!editingProfile && (
                <div className="absolute top-2 right-2 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditProfile(profile);
                    }}
                    className="p-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteProfile(profile.id);
                    }}
                    className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ))}
          
          {newProfile ? (
            renderProfileForm(
              newProfile,
              handleSaveNewProfile,
              () => setNewProfile(null)
            )
          ) : (
            <button
              onClick={handleCreateProfile}
              className="flex flex-col items-center justify-center space-y-4 p-6 rounded-3xl bg-white hover:shadow-xl transition-all transform hover:scale-105 border-2 border-dashed border-gray-300 hover:border-blue-400"
            >
              <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center shadow-lg">
                <Plus className="w-12 h-12 md:w-16 md:h-16 text-gray-600" />
              </div>
              <span className="text-xl md:text-2xl font-bold text-gray-600">
                Criar Perfil
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};