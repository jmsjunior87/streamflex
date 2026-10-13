import { useState } from 'react';
import { Header } from '@/components/Header';
import { FeaturedBanner } from '@/components/FeaturedBanner';
import { CategoryCarousel } from '@/components/CategoryCarousel';
import { VideoPlayer } from '@/components/VideoPlayer';
import { SearchPage } from '@/components/SearchPage';
import { FavoritesPage } from '@/components/FavoritesPage';
import { ThemeProvider } from '@/hooks/useTheme';
import { ProfileManager } from '@/components/ProfileManager';
import { Profile } from '@/types/Profile';
import { Video } from '@/types/Video';
import { Category } from '@/types/Category';

const initialMockVideos: Video[] = [
    {
      id: 'yt-IQqkFqUvuoI',
      title: 'Ação & Games',
      externalThumbnail: 'https://img.youtube.com/vi/IQqkFqUvuoI/hqdefault.jpg',
      duration: '11.0:44.0',
      ageRating: 'L',
      categoryId: 'Oswaldo',
      subcategoryId: 'Temporada 1',
      category: 'Oswaldo',
      description: '',
      videoUrl: 'https://www.youtube.com/watch?v=IQqkFqUvuoI',
      youtubeId: 'IQqkFqUvuoI',
  },

  {
      id: 'yt-dhuptQESpkI',
      title: 'Morte de Principiante',
      externalThumbnail: 'https://img.youtube.com/vi/dhuptQESpkI/hqdefault.jpg',
      duration: '11.0:44.0',
      ageRating: 'L',
      categoryId: 'Oswaldo',
      subcategoryId: 'Temporada 1',
      category: 'Oswaldo',
      description: '',
      videoUrl: 'https://www.youtube.com/watch?v=dhuptQESpkI',
      youtubeId: 'dhuptQESpkI',
  },

  {
      id: 'yt-BJOOP1-dFQY',
      title: 'Oswiral',
      externalThumbnail: 'https://img.youtube.com/vi/BJOOP1-dFQY/hqdefault.jpg',
      duration: '11.0:44.0',
      ageRating: 'L',
      categoryId: 'Oswaldo',
      subcategoryId: 'Temporada 1',
      category: 'Oswaldo',
      description: '',
      videoUrl: 'https://www.youtube.com/watch?v=BJOOP1-dFQY',
      youtubeId: 'BJOOP1-dFQY',
  },

  {
      id: 'yt-bXVtJ-KEtQE',
      title: 'A Última figurinha',
      externalThumbnail: 'https://img.youtube.com/vi/bXVtJ-KEtQE/hqdefault.jpg',
      duration: '11.0:44.0',
      ageRating: 'L',
      categoryId: 'Oswaldo',
      subcategoryId: 'Temporada 1',
      category: 'Oswaldo',
      description: '',
      videoUrl: 'https://www.youtube.com/watch?v=bXVtJ-KEtQE',
      youtubeId: 'bXVtJ-KEtQE',
  },

  {
      id: 'yt-MWmanSfxMiA',
      title: 'O Melhor Amigo',
      externalThumbnail: 'https://img.youtube.com/vi/MWmanSfxMiA/hqdefault.jpg',
      duration: '11.0:44.0',
      ageRating: 'L',
      categoryId: 'Oswaldo',
      subcategoryId: 'Temporada 1',
      category: 'Oswaldo',
      description: '',
      videoUrl: 'https://www.youtube.com/watch?v=MWmanSfxMiA',
      youtubeId: 'MWmanSfxMiA',
  },

  {
      id: 'yt-uwx4rOGkPgQ',
      title: 'O Método Oswaldo',
      externalThumbnail: 'https://img.youtube.com/vi/uwx4rOGkPgQ/hqdefault.jpg',
      duration: '11.0:44.0',
      ageRating: 'L',
      categoryId: 'Oswaldo',
      subcategoryId: 'Temporada 1',
      category: 'Oswaldo',
      description: '',
      videoUrl: 'https://www.youtube.com/watch?v=uwx4rOGkPgQ',
      youtubeId: 'uwx4rOGkPgQ',
  },

  {
      id: 'yt-PAxpMsGmVgw',
      title: 'O Picolé de PF',
      externalThumbnail: 'https://img.youtube.com/vi/PAxpMsGmVgw/hqdefault.jpg',
      duration: '11.0:44.0',
      ageRating: 'L',
      categoryId: 'Oswaldo',
      subcategoryId: 'Temporada 1',
      category: 'Oswaldo',
      description: '',
      videoUrl: 'https://www.youtube.com/watch?v=PAxpMsGmVgw',
      youtubeId: 'PAxpMsGmVgw',
  },

  {
      id: 'yt-cLpSTWp9ENM',
      title: 'Sobre Meninos e Bobos',
      externalThumbnail: 'https://img.youtube.com/vi/cLpSTWp9ENM/hqdefault.jpg',
      duration: '11.0:42.0',
      ageRating: 'L',
      categoryId: 'Oswaldo',
      subcategoryId: 'Temporada 1',
      category: 'Oswaldo',
      description: '',
      videoUrl: 'https://www.youtube.com/watch?v=cLpSTWp9ENM',
      youtubeId: 'cLpSTWp9ENM',
  },

  {
      id: 'yt-Po4DZKCCc1M',
      title: 'Amigo Oculto',
      externalThumbnail: 'https://img.youtube.com/vi/Po4DZKCCc1M/hqdefault.jpg',
      duration: '11.0:42.0',
      ageRating: 'L',
      categoryId: 'Oswaldo',
      subcategoryId: 'Temporada 1',
      category: 'Oswaldo',
      description: '',
      videoUrl: 'https://www.youtube.com/watch?v=Po4DZKCCc1M',
      youtubeId: 'Po4DZKCCc1M',
  },

  {
      id: 'yt-28IYO9MImWw',
      title: 'A Feira Sci Fi',
      externalThumbnail: 'https://img.youtube.com/vi/28IYO9MImWw/hqdefault.jpg',
      duration: '11.0:42.0',
      ageRating: 'L',
      categoryId: 'Oswaldo',
      subcategoryId: 'Temporada 1',
      category: 'Oswaldo',
      description: '',
      videoUrl: 'https://www.youtube.com/watch?v=28IYO9MImWw',
      youtubeId: '28IYO9MImWw',
  },

  {
      id: 'yt-WTCCMYRH1wM',
      title: 'Oswladobias',
      externalThumbnail: 'https://img.youtube.com/vi/WTCCMYRH1wM/hqdefault.jpg',
      duration: '11.0:42.0',
      ageRating: 'L',
      categoryId: 'Oswaldo',
      subcategoryId: 'Temporada 1',
      category: 'Oswaldo',
      description: '',
      videoUrl: 'https://www.youtube.com/watch?v=WTCCMYRH1wM',
      youtubeId: 'WTCCMYRH1wM',
  },

  {
      id: 'yt-9U1nmB1fHNc',
      title: 'O livro jogo',
      externalThumbnail: 'https://img.youtube.com/vi/9U1nmB1fHNc/hqdefault.jpg',
      duration: '11.0:42.0',
      ageRating: 'L',
      categoryId: 'Oswaldo',
      subcategoryId: 'Temporada 1',
      category: 'Oswaldo',
      description: '',
      videoUrl: 'https://www.youtube.com/watch?v=9U1nmB1fHNc',
      youtubeId: '9U1nmB1fHNc',
  },

  {
      id: 'yt-y_CmoHCKJZU',
      title: 'Me pego lá fora',
      externalThumbnail: 'https://img.youtube.com/vi/y_CmoHCKJZU/hqdefault.jpg',
      duration: '11.0:42.0',
      ageRating: 'L',
      categoryId: 'Oswaldo',
      subcategoryId: 'Temporada 1',
      category: 'Oswaldo',
      description: '',
      videoUrl: 'https://www.youtube.com/watch?v=y_CmoHCKJZU',
      youtubeId: 'y_CmoHCKJZU',
  }
];

const CATEGORIES: Category[] = [
  { id: 'Oswaldo', name: 'Oswaldo' },
  { id: 'Temporada 1', name: 'Temporada 1', parentId: 'Oswaldo' },
];

const CATEGORY_COVER_IMAGES: Record<string, string> = {
  Oswaldo: 'https://drive.google.com/thumbnail?id=1-5_QOaTvVnE2-WBroFaYdBNV04di5VSt&sz=w1600',
};

const SERIES_HERO_IMAGES: Record<string, string> = {
  Oswaldo: 'https://drive.google.com/thumbnail?id=1GGr5aBkqasMKH5h1JDHuSANzTC27Ps7Z&sz=w1600',
};

const CATEGORY_LOGOS: Record<string, string> = {
  Oswaldo: 'https://drive.google.com/thumbnail?id=159TFW1Lub9nqMFDU_ZQR_Q9iu6FQCVdO&sz=w800',
};

const extractPlaylistId = (value: string) => {
  const trimmed = value.trim();
  if (!trimmed) return null;
  if (/^[a-zA-Z0-9_-]+$/.test(trimmed)) return trimmed;

  try {
    const url = new URL(trimmed, 'https://www.youtube.com');
    const listParam = url.searchParams.get('list');
    if (listParam) return listParam;
  } catch {
    // ignore invalid URL until regex fallback
  }

  const playlistIdMatch = trimmed.match(/(?:list=|playlist_id=)([a-zA-Z0-9_-]+)/);
  return playlistIdMatch?.[1] ?? null;
};

const parseYouTubePlaylistXml = (xml: string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, 'application/xml');
  const parserError = doc.querySelector('parsererror');
  if (parserError) {
    throw new Error('Não foi possível ler a resposta do YouTube.');
  }

  const playlistTitle = doc.querySelector('feed > title')?.textContent?.trim() || '';
  const entries = Array.from(doc.querySelectorAll('entry')).map((entry, index) => {
    const getText = (tagName: string) => {
      const element = entry.getElementsByTagName(tagName)[0] ?? entry.getElementsByTagNameNS('*', tagName.replace(/.*:/, ''))[0];
      return element?.textContent?.trim() ?? '';
    };

    const videoId = getText('yt:videoId') || getText('videoId');
    const title = getText('title') || `YouTube vídeo ${index + 1}`;
    const description = getText('media:description') || getText('description');
    const thumb = entry.getElementsByTagName('media:thumbnail')[0]?.getAttribute('url')
      || `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;

    return {
      id: videoId ? `yt-${videoId}` : `yt-${index}`,
      title,
      externalThumbnail: thumb,
      duration: '--:--',
      ageRating: '3+',
      category: 'YouTube',
      description,
      videoUrl: `https://www.youtube.com/watch?v=${videoId}`,
      youtubeId: videoId || undefined,
    };
  }).filter(video => Boolean(video.youtubeId));

  return { playlistTitle, videos: entries };
};

const Index = () => {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [currentPage, setCurrentPage] = useState<'home' | 'search' | 'favorites' | 'profiles'>('profiles');
  const [currentProfile, setCurrentProfile] = useState<Profile | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [mockVideos, setMockVideos] = useState<Video[]>(initialMockVideos);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState<string | null>(null);
  const [currentPlaylist, setCurrentPlaylist] = useState<Video[]>([]);

  const topCategories = CATEGORIES.filter(c => !c.parentId);
  const subcategories = selectedCategoryId
    ? CATEGORIES.filter(c => c.parentId === selectedCategoryId)
    : [];
  const selectedSubcategory = selectedSubcategoryId
    ? CATEGORIES.find(c => c.id === selectedSubcategoryId) ?? null
    : null;
  const subcategoryVideos = selectedSubcategoryId
    ? mockVideos.filter(v => v.subcategoryId === selectedSubcategoryId)
    : [];
  const activePlaylist = currentPlaylist.length
    ? currentPlaylist
    : selectedSubcategoryId
      ? mockVideos.filter(v => v.subcategoryId === selectedSubcategoryId)
      : [];
  const selectedVideoIndex = selectedVideo
    ? activePlaylist.findIndex(v => v.id === selectedVideo.id)
    : -1;
  const hasNextEpisode = selectedVideoIndex >= 0 && selectedVideoIndex < activePlaylist.length - 1;

  const getCoverForCategoryOrSubcategory = (id: string) => {
    if (CATEGORY_COVER_IMAGES[id]) return CATEGORY_COVER_IMAGES[id];
    const video = mockVideos.find(v => v.categoryId === id || v.subcategoryId === id);
    return video?.externalThumbnail ?? '';
  };

  const handleVideoSelect = (video: Video) => {
    if (video.subcategoryId) {
      setSelectedSubcategoryId(video.subcategoryId);
      setCurrentPlaylist(mockVideos.filter(v => v.subcategoryId === video.subcategoryId));
    } else {
      setCurrentPlaylist([]);
    }
    setSelectedVideo(video);
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    setSelectedSubcategoryId(null);
    setSelectedVideo(null);
  };

  const handleSubcategorySelect = (subcategoryId: string) => {
    const videos = mockVideos.filter(v => v.subcategoryId === subcategoryId);
    setSelectedSubcategoryId(subcategoryId);
    setCurrentPlaylist(videos);
    setSelectedVideo(null);
  };

  const handleVideoEnded = () => {
    if (hasNextEpisode) setSelectedVideo(activePlaylist[selectedVideoIndex + 1]);
  };

  const toggleFavorite = (videoId: string) => {
    setFavorites(prev => 
      prev.includes(videoId) 
        ? prev.filter(id => id !== videoId)
        : [...prev, videoId]
    );
  };

  const handleProfileSelect = (profile: Profile) => {
    setCurrentProfile(profile);
    setCurrentPage('home');
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background transition-colors">
        {!currentProfile ? (
          <ProfileManager onProfileSelect={handleProfileSelect} />
        ) : selectedVideo ? (
          <div className="min-h-screen bg-gray-900">
            <VideoPlayer 
              video={selectedVideo}
              onClose={() => setSelectedVideo(null)}
              relatedVideos={mockVideos.filter(v => v.id !== selectedVideo.id).slice(0, 4)}
              onVideoSelect={handleVideoSelect}
              isFavorite={favorites.includes(selectedVideo.id)}
              onToggleFavorite={() => toggleFavorite(selectedVideo.id)}
              hasNextEpisode={hasNextEpisode}
              onEnded={handleVideoEnded}
            />
          </div>
        ) : (
          <>
            <Header 
              currentPage={currentPage}
              onPageChange={setCurrentPage}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              profileName={currentProfile?.name}
              onProfileChange={() => setCurrentProfile(null)}
            />
            
            <main className="pb-20 md:pb-8">
              

              {currentPage === 'home' && (
                <>
                  {!selectedCategoryId ? (
                    <>
                      {mockVideos[0] && (
                        <FeaturedBanner
                          video={mockVideos[0]}
                          onPlay={() => handleVideoSelect(mockVideos[0])}
                          isFavorite={favorites.includes(mockVideos[0].id)}
                          onToggleFavorite={() => toggleFavorite(mockVideos[0].id)}
                        />
                      )}
                      {topCategories.length > 0 ? (
                        <div className="px-4 md:px-8">
                          <h2 className="text-2xl font-bold mb-4">Séries disponíveis</h2>
                          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {topCategories.map(cat => {
                              const cover = getCoverForCategoryOrSubcategory(cat.id);
                              return (
                                <button
                                  key={cat.id}
                                  onClick={() => handleCategorySelect(cat.id)}
                                  className="group rounded-3xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5 text-left shadow-sm hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md transition"
                                >
                                  <div className="aspect-[5/3] rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-700">
                                    {cover ? (
                                      <img
                                        src={cover}
                                        alt={cat.name}
                                        className="w-full h-full object-cover"
                                      />
                                    ) : (
                                      <div className="h-full flex items-center justify-center text-gray-400 dark:text-gray-500">
                                        Sem capa
                                      </div>
                                    )}
                                  </div>
                                  <div className="mt-4">
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                      {CATEGORY_LOGOS[cat.id] ? (
                                        <img
                                          src={CATEGORY_LOGOS[cat.id]}
                                          alt={cat.name}
                                          className="h-auto max-h-10 max-w-48 object-contain object-left"
                                        />
                                      ) : (
                                        cat.name
                                      )}
                                    </h3>
                                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Selecione essa série para ver as temporadas disponíveis.</p>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ) : (
                        <div className="px-4 md:px-8 py-16 text-center">
                          <h2 className="text-2xl font-bold">Seu catálogo está pronto para novos vídeos</h2>
                          <p className="mt-2 text-muted-foreground">Adicione vídeos e categorias para começar a assistir.</p>
                        </div>
                      )}
                    </>
                  ) : !selectedSubcategoryId ? (
                    <div className="px-4 md:px-8">
                      <button
                        onClick={() => setSelectedCategoryId(null)}
                        className="mb-6 text-sm text-blue-600 hover:underline dark:text-blue-400"
                      >
                        ← Voltar para categorias
                      </button>
                      <h2 className="mb-4">
                        {CATEGORY_LOGOS[selectedCategoryId] ? (
                          <img
                            src={CATEGORY_LOGOS[selectedCategoryId]}
                            alt={CATEGORIES.find(c => c.id === selectedCategoryId)?.name ?? selectedCategoryId}
                            className="h-auto max-h-20 max-w-64 object-contain object-left"
                          />
                        ) : (
                          <span className="text-2xl font-bold text-foreground">
                            {CATEGORIES.find(c => c.id === selectedCategoryId)?.name}
                          </span>
                        )}
                      </h2>
                      {subcategories.length > 0 ? (
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                          {subcategories.map(sub => {
                            const cover = getCoverForCategoryOrSubcategory(sub.id);
                            const videosCount = mockVideos.filter(v => v.subcategoryId === sub.id).length;
                            return (
                              <button
                                key={sub.id}
                                onClick={() => handleSubcategorySelect(sub.id)}
                                className="group rounded-3xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5 text-left shadow-sm hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md transition"
                              >
                                <div className="aspect-[5/3] rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-700">
                                  {cover ? (
                                    <img
                                      src={cover}
                                      alt={sub.name}
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                    <div className="h-full flex items-center justify-center text-gray-400 dark:text-gray-500">
                                      Sem capa
                                    </div>
                                  )}
                                </div>
                                <div className="mt-4">
                                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{sub.name}</h3>
                                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                                    {videosCount} vídeo{videosCount !== 1 ? 's' : ''}
                                  </p>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      ) : (
                        <p className="text-muted-foreground">Nenhuma subcategoria encontrada.</p>
                      )}
                    </div>
                  ) : (
                    <>
                      <section className="mx-4 mb-8 overflow-hidden rounded-3xl border border-border bg-card shadow-sm md:mx-8">
                        <div className="grid md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
                          <img
                            src={SERIES_HERO_IMAGES[selectedCategoryId] ?? CATEGORY_COVER_IMAGES.Oswaldo}
                            alt="Oswaldo"
                            className="aspect-[16/9] h-full w-full object-cover md:aspect-auto md:min-h-64"
                          />
                          <div className="flex flex-col justify-center p-6 md:p-8">
                            {CATEGORY_LOGOS[selectedCategoryId] && (
                              <img
                                src={CATEGORY_LOGOS[selectedCategoryId]}
                                alt="Oswaldo"
                                className="mb-4 h-auto max-h-20 max-w-72 object-contain object-left"
                              />
                            )}
                            <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                              Oswaldo é um pinguim em idade escolar, adotado e criado por pais humanos, que enfrenta seu maior desafio: sobreviver à escola. Viciado em cultura pop, ele conta com os melhores amigos Tobias e Leia para encarar professores rígidos, jogos de RPG que dão errado e projetos de ciências fora de controle.
                            </p>
                          </div>
                        </div>
                      </section>
                      <div className="px-4 md:px-8 mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                          <button
                            onClick={() => setSelectedSubcategoryId(null)}
                            className="text-sm text-blue-600 hover:underline dark:text-blue-400"
                          >
                            ← Voltar para subcategorias
                          </button>
                          <h2 className="text-2xl font-bold mt-3">{selectedSubcategory?.name}</h2>
                          <p className="text-sm text-muted-foreground">
                            {subcategoryVideos.length} episódio{subcategoryVideos.length !== 1 ? 's' : ''}
                          </p>
                        </div>
                        {subcategoryVideos[0] && (
                          <button
                            onClick={() => handleVideoSelect(subcategoryVideos[0])}
                            className="rounded-full bg-blue-600 px-5 py-3 text-white shadow hover:bg-blue-700 transition"
                          >
                            Assistir primeiro episódio
                          </button>
                        )}
                      </div>

                      <div className="px-4 md:px-8 space-y-12">
                        <CategoryCarousel
                          title="Episódios"
                          videos={subcategoryVideos}
                          onVideoSelect={handleVideoSelect}
                          favorites={favorites}
                          onToggleFavorite={toggleFavorite}
                        />
                      </div>
                    </>
                  )}
                </>
              )}

              {currentPage === 'search' && (
                <SearchPage
                  videos={mockVideos}
                  searchQuery={searchQuery}
                  onVideoSelect={handleVideoSelect}
                  favorites={favorites}
                  onToggleFavorite={toggleFavorite}
                />
              )}

              {currentPage === 'favorites' && (
                <FavoritesPage
                  videos={mockVideos.filter(v => favorites.includes(v.id))}
                  onVideoSelect={handleVideoSelect}
                  favorites={favorites}
                  onToggleFavorite={toggleFavorite}
                />
              )}

              {currentPage === 'profiles' && (
                <ProfileManager onProfileSelect={handleProfileSelect} />
              )}
            </main>
          </>
        )}
      </div>
    </ThemeProvider>
  );
};

export default Index;
