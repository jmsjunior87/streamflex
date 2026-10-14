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
      id: 'yt-QieuZpptjPA',
      title: 'Ação & Games',
      externalThumbnail: 'https://img.youtube.com/vi/QieuZpptjPA/hqdefault.jpg',
      duration: '11.0:44.0',
      ageRating: 'L',
      categoryId: 'Oswaldo',
      subcategoryId: 'Oswaldo - Temporada 1',
      category: 'Oswaldo',
      description: '',
      videoUrl: 'https://www.youtube.com/watch?v=QieuZpptjPA',
      youtubeId: 'QieuZpptjPA',
  },

  {
      id: 'yt-vs1hRYg5zoo',
      title: 'Morte de Principiante',
      externalThumbnail: 'https://img.youtube.com/vi/vs1hRYg5zoo/hqdefault.jpg',
      duration: '11.0:44.0',
      ageRating: 'L',
      categoryId: 'Oswaldo',
      subcategoryId: 'Oswaldo - Temporada 1',
      category: 'Oswaldo',
      description: '',
      videoUrl: 'https://www.youtube.com/watch?v=vs1hRYg5zoo',
      youtubeId: 'vs1hRYg5zoo',
  },

  {
      id: 'yt-rRcxA_1LYPw',
      title: 'Oswiral',
      externalThumbnail: 'https://img.youtube.com/vi/rRcxA_1LYPw/hqdefault.jpg',
      duration: '11.0:44.0',
      ageRating: 'L',
      categoryId: 'Oswaldo',
      subcategoryId: 'Oswaldo - Temporada 1',
      category: 'Oswaldo',
      description: '',
      videoUrl: 'https://www.youtube.com/watch?v=rRcxA_1LYPw',
      youtubeId: 'rRcxA_1LYPw',
  },

  {
      id: 'yt-mgxMVqSx3Z0',
      title: 'A Última figurinha',
      externalThumbnail: 'https://img.youtube.com/vi/mgxMVqSx3Z0/hqdefault.jpg',
      duration: '11.0:44.0',
      ageRating: 'L',
      categoryId: 'Oswaldo',
      subcategoryId: 'Oswaldo - Temporada 1',
      category: 'Oswaldo',
      description: '',
      videoUrl: 'https://www.youtube.com/watch?v=mgxMVqSx3Z0',
      youtubeId: 'mgxMVqSx3Z0',
  },

  {
      id: 'yt-05tFBF2WrXM',
      title: 'O Melhor Amigo',
      externalThumbnail: 'https://img.youtube.com/vi/05tFBF2WrXM/hqdefault.jpg',
      duration: '11.0:44.0',
      ageRating: 'L',
      categoryId: 'Oswaldo',
      subcategoryId: 'Oswaldo - Temporada 1',
      category: 'Oswaldo',
      description: '',
      videoUrl: 'https://www.youtube.com/watch?v=05tFBF2WrXM',
      youtubeId: '05tFBF2WrXM',
  },

  {
      id: 'yt-3gto14hMKAw',
      title: 'O Método Oswaldo',
      externalThumbnail: 'https://img.youtube.com/vi/3gto14hMKAw/hqdefault.jpg',
      duration: '11.0:44.0',
      ageRating: 'L',
      categoryId: 'Oswaldo',
      subcategoryId: 'Oswaldo - Temporada 1',
      category: 'Oswaldo',
      description: '',
      videoUrl: 'https://www.youtube.com/watch?v=3gto14hMKAw',
      youtubeId: '3gto14hMKAw',
  },

  {
      id: 'yt-N6PtADC05wk',
      title: 'O Picolé de PF',
      externalThumbnail: 'https://img.youtube.com/vi/N6PtADC05wk/hqdefault.jpg',
      duration: '11.0:44.0',
      ageRating: 'L',
      categoryId: 'Oswaldo',
      subcategoryId: 'Oswaldo - Temporada 1',
      category: 'Oswaldo',
      description: '',
      videoUrl: 'https://www.youtube.com/watch?v=N6PtADC05wk',
      youtubeId: 'N6PtADC05wk',
  },

  {
      id: 'yt-EywkYFSBbJo',
      title: 'Sobre Meninos e Bobos',
      externalThumbnail: 'https://img.youtube.com/vi/EywkYFSBbJo/hqdefault.jpg',
      duration: '11.0:42.0',
      ageRating: 'L',
      categoryId: 'Oswaldo',
      subcategoryId: 'Oswaldo - Temporada 1',
      category: 'Oswaldo',
      description: '',
      videoUrl: 'https://www.youtube.com/watch?v=EywkYFSBbJo',
      youtubeId: 'EywkYFSBbJo',
  },

  {
      id: 'yt-gEXLAbRjWps',
      title: 'Amigo Oculto',
      externalThumbnail: 'https://img.youtube.com/vi/gEXLAbRjWps/hqdefault.jpg',
      duration: '11.0:42.0',
      ageRating: 'L',
      categoryId: 'Oswaldo',
      subcategoryId: 'Oswaldo - Temporada 1',
      category: 'Oswaldo',
      description: '',
      videoUrl: 'https://www.youtube.com/watch?v=gEXLAbRjWps',
      youtubeId: 'gEXLAbRjWps',
  },

  {
      id: 'yt-a-XUkjkFbOA',
      title: 'A Feira Sci Fi',
      externalThumbnail: 'https://img.youtube.com/vi/a-XUkjkFbOA/hqdefault.jpg',
      duration: '11.0:42.0',
      ageRating: 'L',
      categoryId: 'Oswaldo',
      subcategoryId: 'Oswaldo - Temporada 1',
      category: 'Oswaldo',
      description: '',
      videoUrl: 'https://www.youtube.com/watch?v=a-XUkjkFbOA',
      youtubeId: 'a-XUkjkFbOA',
  },

  {
      id: 'yt-st0GvBN9R6k',
      title: 'Oswaldobias',
      externalThumbnail: 'https://img.youtube.com/vi/st0GvBN9R6k/hqdefault.jpg',
      duration: '11.0:42.0',
      ageRating: 'L',
      categoryId: 'Oswaldo',
      subcategoryId: 'Oswaldo - Temporada 1',
      category: 'Oswaldo',
      description: '',
      videoUrl: 'https://www.youtube.com/watch?v=st0GvBN9R6k',
      youtubeId: 'st0GvBN9R6k',
  },

  {
      id: 'yt-rbL2reC8ATQ',
      title: 'O livro jogo',
      externalThumbnail: 'https://img.youtube.com/vi/rbL2reC8ATQ/hqdefault.jpg',
      duration: '11.0:42.0',
      ageRating: 'L',
      categoryId: 'Oswaldo',
      subcategoryId: 'Oswaldo - Temporada 1',
      category: 'Oswaldo',
      description: '',
      videoUrl: 'https://www.youtube.com/watch?v=rbL2reC8ATQ',
      youtubeId: 'rbL2reC8ATQ',
  },

  {
      id: 'yt-svvaHOpYhEg',
      title: 'Me pego lá fora',
      externalThumbnail: 'https://img.youtube.com/vi/svvaHOpYhEg/hqdefault.jpg',
      duration: '11.0:42.0',
      ageRating: 'L',
      categoryId: 'Oswaldo',
      subcategoryId: 'Oswaldo - Temporada 1',
      category: 'Oswaldo',
      description: '',
      videoUrl: 'https://www.youtube.com/watch?v=svvaHOpYhEg',
      youtubeId: 'svvaHOpYhEg',
  },

  {
    id: 'yt-ESBrCCqP-nE',
    title: 'O Incrível Circo Digital S01E01 WEB DL 1080p x264 DUAL 2 0',
    externalThumbnail: 'https://img.youtube.com/vi/ESBrCCqP-nE/hqdefault.jpg',
    duration: '27.0:4.0',
    ageRating: '12',
    categoryId: 'O Incrível Circo Digital',
    subcategoryId: 'O Incrível Circo Digital - Temporada 1',
    category: 'O Incrível Circo Digital',
    description: '',
    videoUrl: 'https://www.youtube.com/watch?v=ESBrCCqP-nE',
    youtubeId: 'ESBrCCqP-nE',
},

{
    id: 'yt-dgStYZcW7Ec',
    title: 'O Incrível Circo Digital S01E02 WEB DL 1080p x264 DUAL 2 0',
    externalThumbnail: 'https://img.youtube.com/vi/dgStYZcW7Ec/hqdefault.jpg',
    duration: '26.0:59.0',
    ageRating: '12',
    categoryId: 'O Incrível Circo Digital',
    subcategoryId: 'O Incrível Circo Digital - Temporada 1',
    category: 'O Incrível Circo Digital',
    description: '',
    videoUrl: 'https://www.youtube.com/watch?v=dgStYZcW7Ec',
    youtubeId: 'dgStYZcW7Ec',
},

{
    id: 'yt-k6mrpEXRwgM',
    title: 'O Incrível Circo Digital S01E03 WEB DL 1080p x264 DUAL 2 0',
    externalThumbnail: 'https://img.youtube.com/vi/k6mrpEXRwgM/hqdefault.jpg',
    duration: '26.0:4.0',
    ageRating: '12',
    categoryId: 'O Incrível Circo Digital',
    subcategoryId: 'O Incrível Circo Digital - Temporada 1',
    category: 'O Incrível Circo Digital',
    description: '',
    videoUrl: 'https://www.youtube.com/watch?v=k6mrpEXRwgM',
    youtubeId: 'k6mrpEXRwgM',
},

{
    id: 'yt-WUTnc__K-Fc',
    title: 'O Incrível Circo Digital S01E04 WEB DL 1080p x264 DUAL 2 0',
    externalThumbnail: 'https://img.youtube.com/vi/WUTnc__K-Fc/hqdefault.jpg',
    duration: '25.0:14.0',
    ageRating: '12',
    categoryId: 'O Incrível Circo Digital',
    subcategoryId: 'O Incrível Circo Digital - Temporada 1',
    category: 'O Incrível Circo Digital',
    description: '',
    videoUrl: 'https://www.youtube.com/watch?v=WUTnc__K-Fc',
    youtubeId: 'WUTnc__K-Fc',
},

{
    id: 'yt-KKaWVnEoFTs',
    title: 'O Incrível Circo Digital S01E05 WEB DL 1080p x264 DUAL 2 0',
    externalThumbnail: 'https://img.youtube.com/vi/KKaWVnEoFTs/hqdefault.jpg',
    duration: '27.0:11.0',
    ageRating: '12',
    categoryId: 'O Incrível Circo Digital',
    subcategoryId: 'O Incrível Circo Digital - Temporada 1',
    category: 'O Incrível Circo Digital',
    description: '',
    videoUrl: 'https://www.youtube.com/watch?v=KKaWVnEoFTs',
    youtubeId: 'KKaWVnEoFTs',
},

{
    id: 'yt-hiWg5iIrAuQ',
    title: 'O Incrível Circo Digital S01E06 WEB DL 1080p x264 DUAL 2 0',
    externalThumbnail: 'https://img.youtube.com/vi/hiWg5iIrAuQ/hqdefault.jpg',
    duration: '35.0:36.0',
    ageRating: '12',
    categoryId: 'O Incrível Circo Digital',
    subcategoryId: 'O Incrível Circo Digital - Temporada 1',
    category: 'O Incrível Circo Digital',
    description: '',
    videoUrl: 'https://www.youtube.com/watch?v=hiWg5iIrAuQ',
    youtubeId: 'hiWg5iIrAuQ',
},

{
    id: 'yt-9wnVGj15oGU',
    title: 'O Incrível Circo Digital S01E07 WEB DL 1080p x264 DUAL 2 0',
    externalThumbnail: 'https://img.youtube.com/vi/9wnVGj15oGU/hqdefault.jpg',
    duration: '34.0:44.0',
    ageRating: '12',
    categoryId: 'O Incrível Circo Digital',
    subcategoryId: 'O Incrível Circo Digital - Temporada 1',
    category: 'O Incrível Circo Digital',
    description: '',
    videoUrl: 'https://www.youtube.com/watch?v=9wnVGj15oGU',
    youtubeId: '9wnVGj15oGU',
},

{
    id: 'yt-KJDv-nMIs3Y',
    title: '',
    externalThumbnail: 'https://img.youtube.com/vi/KJDv-nMIs3Y/hqdefault.jpg',
    duration: '0:00',
    ageRating: '12',
    categoryId: 'O Incrível Circo Digital',
    subcategoryId: 'O Incrível Circo Digital - Temporada 1',
    category: 'O Incrível Circo Digital',
    description: '',
    videoUrl: 'https://www.youtube.com/watch?v=KJDv-nMIs3Y',
    youtubeId: 'KJDv-nMIs3Y',
},

{
    id: 'yt-wcXToDtLYNk',
    title: '',
    externalThumbnail: 'https://img.youtube.com/vi/wcXToDtLYNk/hqdefault.jpg',
    duration: '0:00',
    ageRating: '12',
    categoryId: 'O Incrível Circo Digital',
    subcategoryId: 'O Incrível Circo Digital - Temporada 1',
    category: 'O Incrível Circo Digital',
    description: '',
    videoUrl: 'https://www.youtube.com/watch?v=wcXToDtLYNk',
    youtubeId: 'wcXToDtLYNk',
},




];

const CATEGORIES: Category[] = [
  { id: 'Oswaldo', name: 'Oswaldo' },
  { id: 'Oswaldo - Temporada 1', name: 'Oswaldo - Temporada 1', parentId: 'Oswaldo' },
  { id: 'O Incrível Circo Digital', name: 'O Incrível Circo Digital' },
  {
    id: 'O Incrível Circo Digital - Temporada 1',
    name: 'O Incrível Circo Digital - Temporada 1',
    parentId: 'O Incrível Circo Digital',
  },
];

const CATEGORY_COVER_IMAGES: Record<string, string> = {
  Oswaldo: 'https://drive.google.com/thumbnail?id=1-5_QOaTvVnE2-WBroFaYdBNV04di5VSt&sz=w1600',
  'O Incrível Circo Digital': 'https://drive.google.com/thumbnail?id=1UUcInQSKYAQNfKqTmcfiBjqxauocZHr6&sz=w1600',
};

const SERIES_HERO_IMAGES: Record<string, string> = {
  Oswaldo: 'https://drive.google.com/thumbnail?id=1GGr5aBkqasMKH5h1JDHuSANzTC27Ps7Z&sz=w1600',
  'O Incrível Circo Digital': 'https://drive.google.com/thumbnail?id=1A7bYFqgncJtL83BnsPZ8VnRNG6nLBC1i&sz=w1600',
};

const CATEGORY_LOGOS: Record<string, string> = {
  Oswaldo: 'https://drive.google.com/thumbnail?id=159TFW1Lub9nqMFDU_ZQR_Q9iu6FQCVdO&sz=w800',
  'O Incrível Circo Digital': 'https://drive.google.com/thumbnail?id=1cM73JzJYpw7-hVBEqW--A5NpQpSbm-uD&sz=w800',
};

const SERIES_DESCRIPTIONS: Record<string, string> = {
  Oswaldo: 'Oswaldo é um pinguim em idade escolar, adotado e criado por pais humanos, que enfrenta seu maior desafio: sobreviver à escola. Viciado em cultura pop, ele conta com os melhores amigos Tobias e Leia para encarar professores rígidos, jogos de RPG que dão errado e projetos de ciências fora de controle.',
  'O Incrível Circo Digital': 'Pomni coloca um headset de realidade virtual e acorda presa em um circo digital, junto de outros jogadores que também não conseguem sair. Comandados por Caine, o apresentador, eles vivem aventuras malucas e coloridas enquanto tentam descobrir uma saída. Quanto mais o tempo passa, mais difícil fica manter a sanidade.',
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
  const featuredVideo = mockVideos.find(v => v.categoryId === 'O Incrível Circo Digital') ?? mockVideos[0];
  const subcategories = selectedCategoryId
    ? CATEGORIES.filter(c => c.parentId === selectedCategoryId)
    : [];
  const selectedSubcategory = selectedSubcategoryId
    ? CATEGORIES.find(c => c.id === selectedSubcategoryId) ?? null
    : null;
  const episodeVideos = selectedSubcategoryId
    ? mockVideos.filter(v => v.subcategoryId === selectedSubcategoryId)
    : selectedCategoryId
      ? mockVideos.filter(v => v.categoryId === selectedCategoryId)
    : [];
  const activePlaylist = currentPlaylist.length
    ? currentPlaylist
    : episodeVideos;
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
    const firstSubcategory = CATEGORIES.find(c => c.parentId === categoryId);
    const videos = firstSubcategory
      ? mockVideos.filter(v => v.subcategoryId === firstSubcategory.id)
      : mockVideos.filter(v => v.categoryId === categoryId);

    setSelectedCategoryId(categoryId);
    setSelectedSubcategoryId(firstSubcategory?.id ?? null);
    setCurrentPlaylist(videos);
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
                      {featuredVideo && (
                        <FeaturedBanner
                          video={featuredVideo}
                          onPlay={() => handleVideoSelect(featuredVideo)}
                          isFavorite={favorites.includes(featuredVideo.id)}
                          onToggleFavorite={() => toggleFavorite(featuredVideo.id)}
                          image={CATEGORY_COVER_IMAGES['O Incrível Circo Digital']}
                          logo={CATEGORY_LOGOS['O Incrível Circo Digital']}
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
                  ) : !selectedSubcategoryId && subcategories.length > 0 ? (
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
                            src={SERIES_HERO_IMAGES[selectedCategoryId] ?? getCoverForCategoryOrSubcategory(selectedCategoryId)}
                            alt={CATEGORIES.find(c => c.id === selectedCategoryId)?.name ?? selectedCategoryId}
                            className="aspect-[16/9] h-full w-full object-cover md:aspect-auto md:min-h-64"
                          />
                          <div className="flex flex-col justify-center p-6 md:p-8">
                            {CATEGORY_LOGOS[selectedCategoryId] && (
                              <img
                                src={CATEGORY_LOGOS[selectedCategoryId]}
                                alt={CATEGORIES.find(c => c.id === selectedCategoryId)?.name ?? selectedCategoryId}
                                className="mb-4 h-auto max-h-20 max-w-72 object-contain object-left"
                              />
                            )}
                            {SERIES_DESCRIPTIONS[selectedCategoryId] && (
                              <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                                {SERIES_DESCRIPTIONS[selectedCategoryId]}
                              </p>
                            )}
                          </div>
                        </div>
                      </section>
                      <div className="px-4 md:px-8 mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                          <button
                            onClick={() => {
                              setSelectedCategoryId(null);
                              setSelectedSubcategoryId(null);
                              setCurrentPlaylist([]);
                            }}
                            className="text-sm text-blue-600 hover:underline dark:text-blue-400"
                          >
                            ← Voltar para categorias
                          </button>
                          <h2 className="text-2xl font-bold mt-3">
                            {selectedSubcategory?.name ?? CATEGORIES.find(c => c.id === selectedCategoryId)?.name}
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            {episodeVideos.length} episódio{episodeVideos.length !== 1 ? 's' : ''}
                          </p>
                        </div>
                        {episodeVideos[0] && (
                          <button
                            onClick={() => handleVideoSelect(episodeVideos[0])}
                            className="rounded-full bg-blue-600 px-5 py-3 text-white shadow hover:bg-blue-700 transition"
                          >
                            Assistir primeiro episódio
                          </button>
                        )}
                      </div>

                      <div className="px-4 md:px-8 space-y-12">
                        <CategoryCarousel
                          title="Episódios"
                          videos={episodeVideos}
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
