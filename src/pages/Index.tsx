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
    id: 'yt-KKc9SmCvKdw',
    title: 'TROTE PARA PIZZARIAS em 2024 🍕',
    externalThumbnail: 'https://img.youtube.com/vi/KKc9SmCvKdw/maxresdefault.jpg',
    duration: '--:--',
    ageRating: '12+',
    categoryId: 'kaykeflex',
    subcategoryId: 'kaykeflex-semana-do-trote',
    category: 'Kaykeflex',
    description: 'TROTE PARA PIZZARIAS em 2024 🍕',
    videoUrl: 'https://www.youtube.com/watch?v=KKc9SmCvKdw',
    youtubeId: 'KKc9SmCvKdw',
  },
  {
    id: 'yt-CYQpRDHH9Gg',
    title: 'TROTES RUINS PÉSSIMOS HORRÍVEIS KKKKKK',
    externalThumbnail: 'https://img.youtube.com/vi/CYQpRDHH9Gg/maxresdefault.jpg',
    duration: '--:--',
    ageRating: '12+',
    categoryId: 'kaykeflex',
    subcategoryId: 'kaykeflex-semana-do-trote',
    category: 'Kaykeflex',
    description: 'TROTES RUINS PÉSSIMOS HORRÍVEIS KKKKKK',
    videoUrl: 'https://www.youtube.com/watch?v=CYQpRDHH9Gg',
    youtubeId: 'CYQpRDHH9Gg',
  },
  {
    id: 'yt-CVcXnin2Hr0',
    title: 'TROTE para PAÍSES ALEATÓRIOS que FALAM PORTUGUÊS',
    externalThumbnail: 'https://img.youtube.com/vi/CVcXnin2Hr0/maxresdefault.jpg',
    duration: '--:--',
    ageRating: '12+',
    categoryId: 'kaykeflex',
    subcategoryId: 'kaykeflex-semana-do-trote',
    category: 'Kaykeflex',
    description: 'TROTE para PAÍSES ALEATÓRIOS que FALAM PORTUGUÊS',
    videoUrl: 'https://www.youtube.com/watch?v=CVcXnin2Hr0',
    youtubeId: 'CVcXnin2Hr0',
  },
  {
    id: 'yt-JUdpoTZk7FY',
    title: 'TROTE COM 1 OBJETIVO: Encher o S4CO kkkkkkkk',
    externalThumbnail: 'https://img.youtube.com/vi/JUdpoTZk7FY/maxresdefault.jpg',
    duration: '--:--',
    ageRating: '12+',
    categoryId: 'kaykeflex',
    subcategoryId: 'kaykeflex-semana-do-trote',
    category: 'Kaykeflex',
    description: 'TROTE COM 1 OBJETIVO: Encher o S4CO kkkkkkkk',
    videoUrl: 'https://www.youtube.com/watch?v=JUdpoTZk7FY',
    youtubeId: 'JUdpoTZk7FY',
  },
  {
    id: 'yt-zK-Po_Pnj20',
    title: 'PASSEI TROTE para o CEARÁ KKKKKKKK',
    externalThumbnail: 'https://img.youtube.com/vi/zK-Po_Pnj20/maxresdefault.jpg',
    duration: '--:--',
    ageRating: '12+',
    categoryId: 'kaykeflex',
    subcategoryId: 'kaykeflex-semana-do-trote',
    category: 'Kaykeflex',
    description: 'PASSEI TROTE para o CEARÁ KKKKKKKK',
    videoUrl: 'https://www.youtube.com/watch?v=zK-Po_Pnj20',
    youtubeId: 'zK-Po_Pnj20',
  },
  {
    id: 'yt-AcsdFVyfODM',
    title: 'PASSEI TROTE e FUI NO LOCAL...',
    externalThumbnail: 'https://img.youtube.com/vi/AcsdFVyfODM/maxresdefault.jpg',
    duration: '--:--',
    ageRating: '12+',
    categoryId: 'kaykeflex',
    subcategoryId: 'kaykeflex-semana-do-trote',
    category: 'Kaykeflex',
    description: 'PASSEI TROTE e FUI NO LOCAL...',
    videoUrl: 'https://www.youtube.com/watch?v=AcsdFVyfODM',
    youtubeId: 'AcsdFVyfODM',
  },
  {
    id: 'yt-fo6nCKfwhlo',
    title: 'TROTE PARA RESTAURANTE VEGANO 🚫🍖🚫',
    externalThumbnail: 'https://img.youtube.com/vi/fo6nCKfwhlo/maxresdefault.jpg',
    duration: '--:--',
    ageRating: '12+',
    categoryId: 'kaykeflex',
    category: 'Kaykeflex',
    subcategoryId: 'kaykeflex-semana-do-trote',
    description: 'TROTE PARA RESTAURANTE VEGANO 🚫🍖🚫',
    videoUrl: 'https://www.youtube.com/watch?v=fo6nCKfwhlo',
    youtubeId: 'fo6nCKfwhlo',
  },
  {
    id: 'yt-dIlQ_5zwFcg',
    title: 'CHAMEI A "LOLI" PARA GRAVAR OUTRO VÍDEO...',
    externalThumbnail: 'https://img.youtube.com/vi/dIlQ_5zwFcg/maxresdefault.jpg',
    duration: '--:--',
    ageRating: '3+',
    categoryId: 'kaykeflex',
    category: 'Kaykeflex',
    description: 'CHAMEI A "LOLI" PARA GRAVAR OUTRO VÍDEO...',
    videoUrl: 'https://www.youtube.com/watch?v=dIlQ_5zwFcg',
    youtubeId: 'dIlQ_5zwFcg',
  },
  {
    id: 'yt-_A2wHaVYIX4',
    title: 'CHAMEI A "LOLI" PARA GRAVAR UM VÍDEO DE TERROR..',
    externalThumbnail: 'https://img.youtube.com/vi/_A2wHaVYIX4/maxresdefault.jpg',
    duration: '--:--',
    ageRating: '3+',
    categoryId: 'kaykeflex',
    category: 'Kaykeflex',
    description: 'CHAMEI A "LOLI" PARA GRAVAR UM VÍDEO DE TERROR..',
    videoUrl: 'https://www.youtube.com/watch?v=_A2wHaVYIX4',
    youtubeId: '_A2wHaVYIX4',
  },
  {
    id: 'yt-3ab4MitQECg',
    title: 'TENTANDO ADIVINHAR PREÇOS DE COISAS ALEATÓRIAS (com a Julia) KKKK',
    externalThumbnail: 'https://img.youtube.com/vi/3ab4MitQECg/maxresdefault.jpg',
    duration: '--:--',
    ageRating: '3+',
    categoryId: 'kaykeflex',
    category: 'Kaykeflex',
    description: 'TENTANDO ADIVINHAR PREÇOS DE COISAS ALEATÓRIAS (com a Julia) KKKK',
    videoUrl: 'https://www.youtube.com/watch?v=3ab4MitQECg',
    youtubeId: '3ab4MitQECg',
  },
  {
    id: 'yt-QFIreHoKtCw',
    title: 'Respondendo PERGUNTAS RUINS com a JULIA...',
    externalThumbnail: 'https://img.youtube.com/vi/QFIreHoKtCw/maxresdefault.jpg',
    duration: '--:--',
    ageRating: '3+',
    categoryId: 'kaykeflex',
    category: 'Kaykeflex',
    description: 'Respondendo PERGUNTAS RUINS com a JULIA...',
    videoUrl: 'https://www.youtube.com/watch?v=QFIreHoKtCw',
    youtubeId: 'QFIreHoKtCw',
  },
  {
    id: 'yt-vdAAx_PKhtw',
    title: 'KAIKE + JULIA + MEMES = ??????',
    externalThumbnail: 'https://img.youtube.com/vi/vdAAx_PKhtw/maxresdefault.jpg',
    duration: '--:--',
    ageRating: '3+',
    categoryId: 'kaykeflex',
    subcategoryId: 'kaykeflex-kaike-e-julia',
    category: 'Kaykeflex',
    description: 'KAIKE + JULIA + MEMES = ??????',
    videoUrl: 'https://www.youtube.com/watch?v=vdAAx_PKhtw',
    youtubeId: 'vdAAx_PKhtw',
  },
  {
    id: 'yt-lNQPk7JUCpw',
    title: 'mano sério, esse vídeo ficou muito estranho...... (com a JULIA)',
    externalThumbnail: 'https://img.youtube.com/vi/lNQPk7JUCpw/maxresdefault.jpg',
    duration: '--:--',
    ageRating: '3+',
    categoryId: 'kaykeflex',
    subcategoryId: 'kaykeflex-kaike-e-julia',
    category: 'Kaykeflex',
    description: 'mano sério, esse vídeo ficou muito estranho...... (com a JULIA)',
    videoUrl: 'https://www.youtube.com/watch?v=lNQPk7JUCpw',
    youtubeId: 'lNQPk7JUCpw',
  },
  {
    id: 'yt-W1PgmrXtNH4',
    title: 'fazendo ESCOLHAS RUINS com a JULIA KKKKKK...',
    externalThumbnail: 'https://img.youtube.com/vi/W1PgmrXtNH4/maxresdefault.jpg',
    duration: '--:--',
    ageRating: '3+',
    categoryId: 'kaykeflex',
    subcategoryId: 'kaykeflex-kaike-e-julia',
    category: 'Kaykeflex',
    description: 'fazendo ESCOLHAS RUINS com a JULIA KKKKKK...',
    videoUrl: 'https://www.youtube.com/watch?v=W1PgmrXtNH4',
    youtubeId: 'W1PgmrXtNH4',
  },
  {
    id: 'yt-cgFbsjAlMOA',
    title: 'O ENCONTRO DA AMIZADE VIRTUAL ACONTECEU... 😎',
    externalThumbnail: 'https://img.youtube.com/vi/cgFbsjAlMOA/maxresdefault.jpg',
    duration: '--:--',
    ageRating: '3+',
    categoryId: 'kaykeflex',
    subcategoryId: 'kaykeflex-kaike-e-julia',
    category: 'Kaykeflex',
    description: 'O ENCONTRO DA AMIZADE VIRTUAL ACONTECEU... 😎',
    videoUrl: 'https://www.youtube.com/watch?v=cgFbsjAlMOA',
    youtubeId: 'cgFbsjAlMOA',
  },
  {
    id: 'yt--aVLuCsPwCY',
    title: 'A SÉRIE MAIS LIXO de MINECRAFT #1',
    externalThumbnail: 'https://img.youtube.com/vi/-aVLuCsPwCY/maxresdefault.jpg',
    duration: '14:34',
    ageRating: '12+',
    categoryId: 'kaykeflex',
    subcategoryId: 'kaykeflex-serie-mais-lixo',
    category: 'Kaykeflex',
    description: 'A primeira parte da série mais lixo de Minecraft.',
    videoUrl: 'https://www.youtube.com/watch?v=-aVLuCsPwCY',
    youtubeId: '-aVLuCsPwCY',
  },
  {
    id: 'yt-7bJ48xQdIY4',
    title: 'A SÉRIE MAIS LIXO de MINECRAFT #2',
    externalThumbnail: 'https://img.youtube.com/vi/7bJ48xQdIY4/maxresdefault.jpg',
    duration: '18:03',
    ageRating: '12+',
    categoryId: 'kaykeflex',
    subcategoryId: 'kaykeflex-serie-mais-lixo',
    category: 'Kaykeflex',
    description: 'O segundo episódio da série mais lixo de Minecraft.',
    videoUrl: 'https://www.youtube.com/watch?v=7bJ48xQdIY4',
    youtubeId: '7bJ48xQdIY4',
  },
  {
    id: 'yt-aM3SJHMwHe4',
    title: 'A SÉRIE MAIS LIXO de MINECRAFT #3',
    externalThumbnail: 'https://img.youtube.com/vi/aM3SJHMwHe4/maxresdefault.jpg',
    duration: '15:01',
    ageRating: '12+',
    categoryId: 'kaykeflex',
    subcategoryId: 'kaykeflex-serie-mais-lixo',
    category: 'Kaykeflex',
    description: 'O terceiro episódio da série mais lixo de Minecraft.',
    videoUrl: 'https://www.youtube.com/watch?v=aM3SJHMwHe4',
    youtubeId: 'aM3SJHMwHe4',
  },
  {
    id: 'yt-3HtbPxiLUKQ',
    title: 'A SÉRIE MAIS LIXO de MINECRAFT #4',
    externalThumbnail: 'https://img.youtube.com/vi/3HtbPxiLUKQ/maxresdefault.jpg',
    duration: '29:39',
    ageRating: '12+',
    categoryId: 'kaykeflex',
    subcategoryId: 'kaykeflex-serie-mais-lixo',
    category: 'Kaykeflex',
    description: 'O quarto episódio da série mais lixo de Minecraft.',
    videoUrl: 'https://www.youtube.com/watch?v=3HtbPxiLUKQ',
    youtubeId: '3HtbPxiLUKQ',
  },
  {
    id: 'yt-z2Qt7LrQT10',
    title: 'A SÉRIE MAIS LIXO de MINECRAFT #5',
    externalThumbnail: 'https://img.youtube.com/vi/z2Qt7LrQT10/maxresdefault.jpg',
    duration: '19:04',
    ageRating: '12+',
    categoryId: 'kaykeflex',
    subcategoryId: 'kaykeflex-serie-mais-lixo',
    category: 'Kaykeflex',
    description: 'O quinto episódio da série mais lixo de Minecraft.',
    videoUrl: 'https://www.youtube.com/watch?v=z2Qt7LrQT10',
    youtubeId: 'z2Qt7LrQT10',
  },
  {
    id: 'yt-9VE7Fhi33yg',
    title: 'A SÉRIE MAIS LIXO de MINECRAFT #6',
    externalThumbnail: 'https://img.youtube.com/vi/9VE7Fhi33yg/maxresdefault.jpg',
    duration: '24:56',
    ageRating: '12+',
    categoryId: 'kaykeflex',
    subcategoryId: 'kaykeflex-serie-mais-lixo',
    category: 'Kaykeflex',
    description: 'O sexto episódio da série mais lixo de Minecraft.',
    videoUrl: 'https://www.youtube.com/watch?v=9VE7Fhi33yg',
    youtubeId: '9VE7Fhi33yg',
  },
  {
    id: 'yt-tLIsVCI1hLM',
    title: 'ME SENTINDO UMA PRINCESA | Disney Vlog',
    externalThumbnail: 'https://img.youtube.com/vi/tLIsVCI1hLM/maxresdefault.jpg',
    duration: '5:22',
    ageRating: '12+',
    categoryId: 'kaykeflex',
    subcategoryId: 'kaykeflex-um-doido-pelo-mundo',
    category: 'Kaykeflex',
    description: 'KANUI!: http://kanui.me/1M3IJeD\nA melhor loja de pc GAMER BR: http://goo.gl/95c5ml                                                                                                       \n\nTwitter: http://www.twitter.com/kaikeflex\nFacebook: http://www.facebook.com/kaikeflex\nInstagram: http://www.instagram.com/kaikeflex\nCasal de Anões! https://www.youtube.com/user/CasalDeAnoes\nSnapchat: kaikeflexivel',
    videoUrl: 'https://www.youtube.com/watch?v=tLIsVCI1hLM',
    youtubeId: 'tLIsVCI1hLM',
},

{
    id: 'yt-0B_lNbF_x4M',
    title: 'O DIA QUE EU FUI PRA EUROPA KKKKK',
    externalThumbnail: 'https://img.youtube.com/vi/0B_lNbF_x4M/maxresdefault.jpg',
    duration: '9:22',
    ageRating: '12+',
    categoryId: 'kaykeflex',
    subcategoryId: 'kaykeflex-um-doido-pelo-mundo',
    category: 'Kaykeflex',
    description: 'Deixe sua avaliação! :D\n\nINSTAGRAM: http://www.instagram.com/kaikeflexoficial\nTwitter: http://www.twitter.com/kaikeflex\nFacebook: https://www.facebook.com/kaique.alex\n\nEmail para contato:\nkaikeflex.contato@gmail.com\n\nEu também produzo música eletrônica, sabia? Confira meu canal novo de música eletrônica:\nhttps://www.youtube.com/channel/UC4v53cdxysIMLNMLuRpYu-Q\n\nQuem escutar no Spotify ganha um biscoito!:\nhttps://open.spotify.com/track/0yQhCvxMrvMuAm61GcOrMb?si=ih_CfOqzSs-jqrEWBit4Hw',
    videoUrl: 'https://www.youtube.com/watch?v=0B_lNbF_x4M',
    youtubeId: '0B_lNbF_x4M',
},

{
    id: 'yt-_v-2Ilz15QA',
    title: 'O DIA QUE EU FUI PRA ARGENTINA KKKKK (do nada)',
    externalThumbnail: 'https://img.youtube.com/vi/_v-2Ilz15QA/maxresdefault.jpg',
    duration: '8:54',
    ageRating: '12+',
    categoryId: 'kaykeflex',
    subcategoryId: 'kaykeflex-um-doido-pelo-mundo',
    category: 'Kaykeflex',
    description: 'Deixe sua avaliação! :D\n\nINSTAGRAM: http://www.instagram.com/kaikeflex\n\nEmail para contato:\nkaikeflex.contato@gmail.com',
    videoUrl: 'https://www.youtube.com/watch?v=_v-2Ilz15QA',
    youtubeId: '_v-2Ilz15QA',
},

{
    id: 'yt-svRkheX418o',
    title: 'O DIA QUE EU FUI PRO CHILE KKKKKKKKK (do nada)',
    externalThumbnail: 'https://img.youtube.com/vi/svRkheX418o/maxresdefault.jpg',
    duration: '9:52',
    ageRating: '12+',
    categoryId: 'kaykeflex',
    subcategoryId: 'kaykeflex-um-doido-pelo-mundo',
    category: 'Kaykeflex',
    description: 'Deixe sua avaliação! :D\n\nVídeo da ARGENTINA:\nhttps://youtu.be/_v-2Ilz15QA\n\nVídeo EUROPA:\nhttps://youtu.be/0B_lNbF_x4M\n\nINSTAGRAM: http://www.instagram.com/kaikeflex\n\nEmail para contato:\nkaikeflex.contato@gmail.com',
    videoUrl: 'https://www.youtube.com/watch?v=svRkheX418o',
    youtubeId: 'svRkheX418o',
},

{
    id: 'yt-qiUc9UP04tM',
    title: 'a curiosa cidade "PAU" na FRANÇA KKKKKKKKKKK',
    externalThumbnail: 'https://img.youtube.com/vi/qiUc9UP04tM/maxresdefault.jpg',
    duration: '11:28',
    ageRating: '12+',
    categoryId: 'kaykeflex',
    subcategoryId: 'kaykeflex-um-doido-pelo-mundo',
    category: 'Kaykeflex',
    description: 'Playlist completa dos vídeos de viagens:\nhttps://youtube.com/playlist?list=PLho8mIvnaTfEetrsz75RNXsTxaezTcInu&si=N2IXJ1qp7TAUD4o9',
    videoUrl: 'https://www.youtube.com/watch?v=qiUc9UP04tM',
    youtubeId: 'qiUc9UP04tM',
},

{
    id: 'yt-pcQQPGiZyBM',
    title: 'UM DOIDO EM PARIS...',
    externalThumbnail: 'https://img.youtube.com/vi/pcQQPGiZyBM/maxresdefault.jpg',
    duration: '17:59',
    ageRating: '12+',
    categoryId: 'kaykeflex',
    subcategoryId: 'kaykeflex-um-doido-pelo-mundo',
    category: 'Kaykeflex',
    description: 'Playlist completa dos vídeos de viagens:\nhttps://youtube.com/playlist?list=PLho8mIvnaTfEetrsz75RNXsTxaezTcInu&si=N2IXJ1qp7TAUD4o9\n\nDeixe sua avaliação! :D\n\nINSTAGRAM: http://www.instagram.com/kaikeflex\n\nEmail para contato:\nkaikeflex.contato@gmail.com',
    videoUrl: 'https://www.youtube.com/watch?v=pcQQPGiZyBM',
    youtubeId: 'pcQQPGiZyBM',
},

{
    id: 'yt-XKYY1vR8fLo',
    title: 'AS AVENTURAS DE UM ESQUISITO EM BARCELONA...',
    externalThumbnail: 'https://img.youtube.com/vi/XKYY1vR8fLo/maxresdefault.jpg',
    duration: '19:55',
    ageRating: '12+',
    categoryId: 'kaykeflex',
    subcategoryId: 'kaykeflex-um-doido-pelo-mundo',
    category: 'Kaykeflex',
    description: 'Playlist completa dos vídeos de viagens:\nhttps://youtube.com/playlist?list=PLho8mIvnaTfEetrsz75RNXsTxaezTcInu&si=N2IXJ1qp7TAUD4o9\n\nDeixe sua avaliação! :D\n\nINSTAGRAM: http://www.instagram.com/kaikeflex',
    videoUrl: 'https://www.youtube.com/watch?v=XKYY1vR8fLo',
    youtubeId: 'XKYY1vR8fLo',
},

{
    id: 'yt-31pEiIiDPDo',
    title: 'UM DOIDO NA GRÉCIA...',
    externalThumbnail: 'https://img.youtube.com/vi/31pEiIiDPDo/maxresdefault.jpg',
    duration: '19:04',
    ageRating: '12+',
    categoryId: 'kaykeflex',
    subcategoryId: 'kaykeflex-um-doido-pelo-mundo',
    category: 'Kaykeflex',
    description: 'Playlist completa dos vídeos de viagens:\nhttps://youtube.com/playlist?list=PLho8mIvnaTfEetrsz75RNXsTxaezTcInu&si=N2IXJ1qp7TAUD4o9\n\nDeixe sua avaliação! :D\n\nINSTAGRAM: http://www.instagram.com/kaikeflex\n\nEmail para contato:\nkaikeflex.contato@gmail.com',
    videoUrl: 'https://www.youtube.com/watch?v=31pEiIiDPDo',
    youtubeId: '31pEiIiDPDo',
},

{
    id: 'yt-VbN9DIHYioA',
    title: 'Se eu for EXPULSO NA GRÉCIA, o vídeo acaba...',
    externalThumbnail: 'https://img.youtube.com/vi/VbN9DIHYioA/maxresdefault.jpg',
    duration: '10:36',
    ageRating: '12+',
    categoryId: 'kaykeflex',
    subcategoryId: 'kaykeflex-um-doido-pelo-mundo',
    category: 'Kaykeflex',
    description: 'Playlist completa dos vídeos de viagens:\nhttps://youtube.com/playlist?list=PLho8mIvnaTfEetrsz75RNXsTxaezTcInu&si=N2IXJ1qp7TAUD4o9\n\nDeixe sua avaliação! :D\n\nINSTAGRAM: http://www.instagram.com/kaikeflex\n\nEmail para contato:\nkaikeflex.contato@gmail.com',
    videoUrl: 'https://www.youtube.com/watch?v=VbN9DIHYioA',
    youtubeId: 'VbN9DIHYioA',
},

{
    id: 'yt-K2qn3lL-Miw',
    title: 'A estranha cidade "PINTO" na ESPANHA KKKKKKKKKK',
    externalThumbnail: 'https://img.youtube.com/vi/K2qn3lL-Miw/maxresdefault.jpg',
    duration: '15:07',
    ageRating: '12+',
    categoryId: 'kaykeflex',
    subcategoryId: 'kaykeflex-um-doido-pelo-mundo',
    category: 'Kaykeflex',
    description: 'Playlist completa dos vídeos de viagens:\nhttps://youtube.com/playlist?list=PLho8mIvnaTfEetrsz75RNXsTxaezTcInu&si=N2IXJ1qp7TAUD4o9\n\nDeixe sua avaliação! :D\n\nINSTAGRAM: http://www.instagram.com/kaikeflex\n\nEmail para contato:\nkaikeflex.contato@gmail.com',
    videoUrl: 'https://www.youtube.com/watch?v=K2qn3lL-Miw',
    youtubeId: 'K2qn3lL-Miw',
},

{
    id: 'yt-bL73rKwCUmQ',
    title: 'UM DOIDO EM MADRID...',
    externalThumbnail: 'https://img.youtube.com/vi/bL73rKwCUmQ/maxresdefault.jpg',
    duration: '24:11',
    ageRating: '12+',
    categoryId: 'kaykeflex',
    subcategoryId: 'kaykeflex-um-doido-pelo-mundo',
    category: 'Kaykeflex',
    description: 'Playlist completa dos vídeos de viagens:\nhttps://youtube.com/playlist?list=PLho8mIvnaTfEetrsz75RNXsTxaezTcInu&si=N2IXJ1qp7TAUD4o9\n\nDeixe sua avaliação! :D\n\nINSTAGRAM: http://www.instagram.com/kaikeflex\n\nEmail para contato:\nkaikeflex.contato@gmail.com',
    videoUrl: 'https://www.youtube.com/watch?v=bL73rKwCUmQ',
    youtubeId: 'bL73rKwCUmQ',
},

{
    id: 'yt-4O8xJgGaPEw',
    title: '10 minutos de um POBRE na SUIÇA.',
    externalThumbnail: 'https://img.youtube.com/vi/4O8xJgGaPEw/maxresdefault.jpg',
    duration: '10:51',
    ageRating: '12+',
    categoryId: 'kaykeflex',
    subcategoryId: 'kaykeflex-um-doido-pelo-mundo',
    category: 'Kaykeflex',
    description: 'Deixe sua avaliação! :D\n\nINSTAGRAM: kaikeflex\nhttp://www.instagram.com/kaikeflex\n\nEmail para contato:\nkaikeflex.contato@gmail.com',
    videoUrl: 'https://www.youtube.com/watch?v=4O8xJgGaPEw',
    youtubeId: '4O8xJgGaPEw',
},

{
    id: 'yt-Ff0sKF0rgc8',
    title: 'UM DOIDO na NEVE PELA PRIMEIRA VEZ KKKKKKK',
    externalThumbnail: 'https://img.youtube.com/vi/Ff0sKF0rgc8/maxresdefault.jpg',
    duration: '15:10',
    ageRating: '12+',
    categoryId: 'kaykeflex',
    subcategoryId: 'kaykeflex-um-doido-pelo-mundo',
    category: 'Kaykeflex',
    description: 'Deixe sua avaliação! :D\n\nINSTAGRAM: http://www.instagram.com/kaikeflex\nTwitter: http://www.twitter.com/kaikeflex\n\n\nEmail para contato:\nkaikeflex.contato@gmail.com',
    videoUrl: 'https://www.youtube.com/watch?v=Ff0sKF0rgc8',
    youtubeId: 'Ff0sKF0rgc8',
},

{
    id: 'yt-NpIScVRALCE',
    title: 'UM DOIDO EM ROMA...',
    externalThumbnail: 'https://img.youtube.com/vi/NpIScVRALCE/maxresdefault.jpg',
    duration: '33:51',
    ageRating: '12+',
    categoryId: 'kaykeflex',
    subcategoryId: 'kaykeflex-um-doido-pelo-mundo',
    category: 'Kaykeflex',
    description: 'Playlist completa dos vídeos de viagens:\nhttps://youtube.com/playlist?list=PLho8mIvnaTfEetrsz75RNXsTxaezTcInu&si=N2IXJ1qp7TAUD4o9\n\nDeixe sua avaliação! :D\n\nINSTAGRAM: http://www.instagram.com/kaikeflex\n\n\nEmail para contato:\nkaikeflex.contato@gmail.com',
    videoUrl: 'https://www.youtube.com/watch?v=NpIScVRALCE',
    youtubeId: 'NpIScVRALCE',
},

{
    id: 'yt-6tyG6Ifa6qo',
    title: 'LLANFAIRPWLLGWYNGYLLGOGERYCHWYRNDROBWLLLLANTYSILIOGOGOGOCH',
    externalThumbnail: 'https://img.youtube.com/vi/6tyG6Ifa6qo/maxresdefault.jpg',
    duration: '19:06',
    ageRating: '12+',
    categoryId: 'kaykeflex',
    subcategoryId: 'kaykeflex-um-doido-pelo-mundo',
    category: 'Kaykeflex',
    description: 'Playlist completa dos vídeos de viagens:\nhttps://youtube.com/playlist?list=PLho8mIvnaTfEetrsz75RNXsTxaezTcInu&si=N2IXJ1qp7TAUD4o9\n\nDeixe sua avaliação! :D\n\nINSTAGRAM: http://www.instagram.com/kaikeflex\n\nEmail para contato:\nkaikeflex.contato@gmail.com',
    videoUrl: 'https://www.youtube.com/watch?v=6tyG6Ifa6qo',
    youtubeId: '6tyG6Ifa6qo',
},

{
    id: 'yt-dBW8DmpPU1o',
    title: 'UM DOIDO NA CROÁCIA...',
    externalThumbnail: 'https://img.youtube.com/vi/dBW8DmpPU1o/maxresdefault.jpg',
    duration: '13:29',
    ageRating: '12+',
    categoryId: 'kaykeflex',
    subcategoryId: 'kaykeflex-um-doido-pelo-mundo',
    category: 'Kaykeflex',
    description: 'Playlist completa dos vídeos de viagens:\nhttps://youtube.com/playlist?list=PLho8mIvnaTfEetrsz75RNXsTxaezTcInu&si=N2IXJ1qp7TAUD4o9\n\nDeixe sua avaliação! :D\n\nINSTAGRAM: http://www.instagram.com/kaikeflex\n\n\nEmail para contato:\nkaikeflex.contato@gmail.com\n\n--------------------\n\n00:00 UM DOIDO NA CROÁCIA\n09:22 Futebol arte do Kaike',
    videoUrl: 'https://www.youtube.com/watch?v=dBW8DmpPU1o',
    youtubeId: 'dBW8DmpPU1o',
},

{
    id: 'yt-OIY_9531CDY',
    title: 'Fui pro PAÍS MAIS RICO do MUNDO (pra bisbilhotar)',
    externalThumbnail: 'https://img.youtube.com/vi/OIY_9531CDY/maxresdefault.jpg',
    duration: '33:37',
    ageRating: '12+',
    categoryId: 'kaykeflex',
    subcategoryId: 'kaykeflex-um-doido-pelo-mundo',
    category: 'Kaykeflex',
    description: 'Playlist completa dos vídeos de viagens:\nhttps://youtube.com/playlist?list=PLho8mIvnaTfEetrsz75RNXsTxaezTcInu&si=N2IXJ1qp7TAUD4o9\n\nDeixe sua avaliação! :D\n\nINSTAGRAM: http://www.instagram.com/kaikeflex\nEmail para contato:\nkaikeflex.contato@gmail.com',
    videoUrl: 'https://www.youtube.com/watch?v=OIY_9531CDY',
    youtubeId: 'OIY_9531CDY',
},

{
    id: 'yt-mF-kVZdKmi4',
    title: 'Fui pro PARQUE DE DIVERSÃO de 250 ANOS 💀 na ÁUSTRIA',
    externalThumbnail: 'https://img.youtube.com/vi/mF-kVZdKmi4/maxresdefault.jpg',
    duration: '12:57',
    ageRating: '12+',
    categoryId: 'kaykeflex',
    subcategoryId: 'kaykeflex-um-doido-pelo-mundo',
    category: 'Kaykeflex',
    description: 'Playlist completa dos vídeos de viagens:\nhttps://youtube.com/playlist?list=PLho8mIvnaTfEetrsz75RNXsTxaezTcInu&si=N2IXJ1qp7TAUD4o9\n\nDeixe sua avaliação! :D\n\nINSTAGRAM: http://www.instagram.com/kaikeflex\nEmail para contato:\nkaikeflex.contato@gmail.com',
    videoUrl: 'https://www.youtube.com/watch?v=mF-kVZdKmi4',
    youtubeId: 'mF-kVZdKmi4',
},

{
    id: 'yt-LF3oYcPiZ_o',
    title: 'A AVENTURA dos 3 PAÍSES (no mesmo vídeo) 🌎',
    externalThumbnail: 'https://img.youtube.com/vi/LF3oYcPiZ_o/maxresdefault.jpg',
    duration: '16:36',
    ageRating: '12+',
    categoryId: 'kaykeflex',
    subcategoryId: 'kaykeflex-um-doido-pelo-mundo',
    category: 'Kaykeflex',
    description: 'Playlist completa dos vídeos de viagens:\nhttps://youtube.com/playlist?list=PLho8mIvnaTfEetrsz75RNXsTxaezTcInu&si=N2IXJ1qp7TAUD4o9\n\nDeixe sua avaliação! :D\n\nINSTAGRAM: http://www.instagram.com/kaikeflex\nEmail para contato:\nkaikeflex.contato@gmail.com\n\nCreditos musicais:\nGroovyDominoes52 - bee.',
    videoUrl: 'https://www.youtube.com/watch?v=LF3oYcPiZ_o',
    youtubeId: 'LF3oYcPiZ_o',
},

{
    id: 'yt-x9MEZsleLrw',
    title: 'Fui pro PAÍS ESCONDIDO que NINGUÉM CONHECE',
    externalThumbnail: 'https://img.youtube.com/vi/x9MEZsleLrw/maxresdefault.jpg',
    duration: '16:02',
    ageRating: '12+',
    categoryId: 'kaykeflex',
    subcategoryId: 'kaykeflex-um-doido-pelo-mundo',
    category: 'Kaykeflex',
    description: 'Playlist completa dos vídeos de viagens:\nhttps://youtube.com/playlist?list=PLho8mIvnaTfEetrsz75RNXsTxaezTcInu&si=N2IXJ1qp7TAUD4o9\n\nDeixe sua avaliação! :D\n\nINSTAGRAM: http://www.instagram.com/kaikeflex\n\nEmail para contato:\nkaikeflex.contato@gmail.com',
    videoUrl: 'https://www.youtube.com/watch?v=x9MEZsleLrw',
    youtubeId: 'x9MEZsleLrw',
},

{
    id: 'yt-BhYKIJ-Ox7o',
    title: 'ESSE PAÍS TEM os PIORES PONTOS TURÍSTICOS',
    externalThumbnail: 'https://img.youtube.com/vi/BhYKIJ-Ox7o/maxresdefault.jpg',
    duration: '19:50',
    ageRating: '12+',
    categoryId: 'kaykeflex',
    subcategoryId: 'kaykeflex-um-doido-pelo-mundo',
    category: 'Kaykeflex',
    description: 'Playlist completa dos vídeos de viagens:\nhttps://youtube.com/playlist?list=PLho8mIvnaTfEetrsz75RNXsTxaezTcInu&si=N2IXJ1qp7TAUD4o9\n\nDeixe sua avaliação! :D\n\nINSTAGRAM: http://www.instagram.com/kaikeflex\n\nEmail para contato:\nkaikeflex.contato@gmail.com',
    videoUrl: 'https://www.youtube.com/watch?v=BhYKIJ-Ox7o',
    youtubeId: 'BhYKIJ-Ox7o',
},

{
    id: 'yt-nJnfxM-5VZ4',
    title: 'MINHA CHEGADA NO JAPÃO kkkkkkk',
    externalThumbnail: 'https://img.youtube.com/vi/nJnfxM-5VZ4/maxresdefault.jpg',
    duration: '26:49',
    ageRating: '12+',
    categoryId: 'kaykeflex',
    subcategoryId: 'kaykeflex-um-doido-pelo-mundo',
    category: 'Kaykeflex',
    description: 'Deixe sua avaliação! :D\n\nINSTAGRAM: http://www.instagram.com/kaikeflex\n\nEmail para contato:\nkaikeflex.contato@gmail.com',
    videoUrl: 'https://www.youtube.com/watch?v=nJnfxM-5VZ4',
    youtubeId: 'nJnfxM-5VZ4',
},

{
    id: 'yt-IhOKoIFFyEQ',
    title: '1 HORA DE AVENTURAS EM TÓQUIO kkkkkkk',
    externalThumbnail: 'https://img.youtube.com/vi/IhOKoIFFyEQ/maxresdefault.jpg',
    duration: '1:00:27',
    ageRating: '12+',
    categoryId: 'kaykeflex',
    subcategoryId: 'kaykeflex-um-doido-pelo-mundo',
    category: 'Kaykeflex',
    description: '✈️Abra sua conta NOMAD para te ajudar nas viagens:\nLink: https://nomad.onelink.me/wIQT/KAIKE\nCupom: KAIKE\n\nINSTAGRAM: http://www.instagram.com/kaikeflex\n\nEmail para contato:\nkaikeflex.contato@gmail.com\n\n00:00 Intro\n01:10 Shibuya - Bairro mais famoso\n19:46 Akihabara - Bairro dos Otakus\n36:33 Dica de viagem\n39:19 Shinjuku - Bairro esquisito\n44:33 Templo de 1400 anos\n55:18 Tokyo Tower - Rolê noturno',
    videoUrl: 'https://www.youtube.com/watch?v=IhOKoIFFyEQ',
    youtubeId: 'IhOKoIFFyEQ',
},

{
    id: 'yt-aeqBFvo-sVE',
    title: 'Eu dormi no PIOR HOTEL DO JAPÃO (nota 1,7)',
    externalThumbnail: 'https://img.youtube.com/vi/aeqBFvo-sVE/maxresdefault.jpg',
    duration: '29:20',
    ageRating: '12+',
    categoryId: 'kaykeflex',
    subcategoryId: 'kaykeflex-um-doido-pelo-mundo',
    category: 'Kaykeflex',
    description: 'Mais vídeos malucos de viagem:\nhttps://youtube.com/playlist?list=PLho8mIvnaTfEetrsz75RNXsTxaezTcInu&si=2s3zkcTUslgGijkF\n\nINSTAGRAM: http://www.instagram.com/kaikeflex\n\nEmail para contato:\nkaikeflex.contato@gmail.com',
    videoUrl: 'https://www.youtube.com/watch?v=aeqBFvo-sVE',
    youtubeId: 'aeqBFvo-sVE',
},

{
    id: 'yt-HMqPiRRISq8',
    title: '24h PROVANDO COMIDAS DO JAPÃO (passei mal?)',
    externalThumbnail: 'https://img.youtube.com/vi/HMqPiRRISq8/maxresdefault.jpg',
    duration: '52:57',
    ageRating: '12+',
    categoryId: 'kaykeflex',
    subcategoryId: 'kaykeflex-um-doido-pelo-mundo',
    category: 'Kaykeflex',
    description: 'Deixe sua avaliação! :D\n\nINSTAGRAM: http://www.instagram.com/kaikeflex\n\nEmail para contato:\nkaikeflex.contato@gmail.com\n\n00:00 Café da Manhã (Loja de conveniência)\n10:37 Doce tradicional japonês kk\n15:57 Cafeteria nas alturas (andar 350)\n19:54 Almoçando no Japão kkkk\n29:44 Comendo algo esquisito\n33:36 Restaurante dos Robôs (bizarro)\n46:10 Comendo em um beco aleatório',
    videoUrl: 'https://www.youtube.com/watch?v=HMqPiRRISq8',
    youtubeId: 'HMqPiRRISq8',
},

{
    id: 'yt-3MysOnBKWkI',
    title: 'visitei o TOBA DO JAPÃO...',
    externalThumbnail: 'https://img.youtube.com/vi/3MysOnBKWkI/maxresdefault.jpg',
    duration: '53:32',
    ageRating: '12+',
    categoryId: 'kaykeflex',
    subcategoryId: 'kaykeflex-um-doido-pelo-mundo',
    category: 'Kaykeflex',
    description: 'Mais vídeos malucos de viagem:\nhttps://youtube.com/playlist?list=PLho8mIvnaTfEetrsz75RNXsTxaezTcInu&si=2s3zkcTUslgGijkF\n\nINSTAGRAM: http://www.instagram.com/kaikeflex\n\nEmail para contato:\nkaikeflex.contato@gmail.com',
    videoUrl: 'https://www.youtube.com/watch?v=3MysOnBKWkI',
    youtubeId: '3MysOnBKWkI',
},

{
    id: 'yt-HMwDDaAws9o',
    title: 'FUI PRA DISNEY DO JAPÃO (não sabia que existia)',
    externalThumbnail: 'https://img.youtube.com/vi/HMwDDaAws9o/maxresdefault.jpg',
    duration: '29:10',
    ageRating: '12+',
    categoryId: 'kaykeflex',
    subcategoryId: 'kaykeflex-um-doido-pelo-mundo',
    category: 'Kaykeflex',
    description: 'Deixe sua avaliação! :D\n\nINSTAGRAM: http://www.instagram.com/kaikeflex\n\nEmail para contato:\nkaikeflex.contato@gmail.com',
    videoUrl: 'https://www.youtube.com/watch?v=HMwDDaAws9o',
    youtubeId: 'HMwDDaAws9o',
},

{
    id: 'yt-YkGmU4__7Yg',
    title: 'UM DOIDO NO VULCÃO DO JAPÃO (Monte Fuji)',
    externalThumbnail: 'https://img.youtube.com/vi/YkGmU4__7Yg/maxresdefault.jpg',
    duration: '29:21',
    ageRating: '12+',
    categoryId: 'kaykeflex',
    subcategoryId: 'kaykeflex-um-doido-pelo-mundo',
    category: 'Kaykeflex',
    description: 'Deixe sua avaliação! :D\nPlaylist do Japão: https://www.youtube.com/playlist?list=PLho8mIvnaTfHL_f62YARzI7StkOeomvfs\n\nINSTAGRAM: http://www.instagram.com/kaikeflex\n\nEmail para contato:\nkaikeflex.contato@gmail.com',
    videoUrl: 'https://www.youtube.com/watch?v=YkGmU4__7Yg',
    youtubeId: 'YkGmU4__7Yg',
},

{
    id: 'yt-sMPjS7F5jAo',
    title: 'visitei a cidade chamada "KAIKE" no JAPÃO KKKKKKK',
    externalThumbnail: 'https://img.youtube.com/vi/sMPjS7F5jAo/maxresdefault.jpg',
    duration: '16:14',
    ageRating: '12+',
    categoryId: 'kaykeflex',
    subcategoryId: 'kaykeflex-um-doido-pelo-mundo',
    category: 'Kaykeflex',
    description: 'Mais vídeos malucos de viagem:\nhttps://youtube.com/playlist?list=PLho8mIvnaTfEetrsz75RNXsTxaezTcInu&si=2s3zkcTUslgGijkF\n\nINSTAGRAM: http://www.instagram.com/kaikeflex\n\nEmail para contato:\nkaikeflex.contato@gmail.com',
    videoUrl: 'https://www.youtube.com/watch?v=sMPjS7F5jAo',
    youtubeId: 'sMPjS7F5jAo',
},

{
    id: 'yt-Y1G4InDwn_E',
    title: 'A COREIA DO SUL É COISA DE DOIDO KKKKKKK',
    externalThumbnail: 'https://img.youtube.com/vi/Y1G4InDwn_E/maxresdefault.jpg',
    duration: '38:06',
    ageRating: '12+',
    categoryId: 'kaykeflex',
    subcategoryId: 'kaykeflex-um-doido-pelo-mundo',
    category: 'Kaykeflex',
    description: 'Fui pra seul viver aventuras e tentar encontar o jinkuki do BTS...\nDEIXA SUA AVALIAÇÃO AÍ 👍\n\nINSTAGRAM: http://www.instagram.com/kaikeflex\nhttps://www.youtube.com/playlist?list=PLho8mIvnaTfEetrsz75RNXsTxaezTcInu\n\nEmail para contato:\nkaikeflex.contato@gmail.com',
    videoUrl: 'https://www.youtube.com/watch?v=Y1G4InDwn_E',
    youtubeId: 'Y1G4InDwn_E',
},

{
    id: 'yt-njob5E5H7IU',
    title: 'Um doido na MURALHA DA CHINA',
    externalThumbnail: 'https://img.youtube.com/vi/njob5E5H7IU/maxresdefault.jpg',
    duration: '15:31',
    ageRating: '12+',
    categoryId: 'kaykeflex',
    subcategoryId: 'kaykeflex-um-doido-pelo-mundo',
    category: 'Kaykeflex',
    description: 'Mais vídeos malucos de viagem:\nhttps://youtube.com/playlist?list=PLho8mIvnaTfEetrsz75RNXsTxaezTcInu&si=2s3zkcTUslgGijkF\n\nINSTAGRAM: http://www.instagram.com/kaikeflex\n\nEmail para contato:\nkaikeflex.contato@gmail.com',
    videoUrl: 'https://www.youtube.com/watch?v=njob5E5H7IU',
    youtubeId: 'njob5E5H7IU',
},

{
    id: 'yt-xQnpRE84aK8',
    title: 'Ninguém Sabe o Que Tem Nesse Vídeo',
    externalThumbnail: 'https://img.youtube.com/vi/xQnpRE84aK8/maxresdefault.jpg',
    duration: '13:51',
    ageRating: '12+',
    categoryId: 'kaykeflex',
    subcategoryId: 'kaykeflex-um-doido-pelo-mundo',
    category: 'Kaykeflex',
    description: '???\n??\n????\n?\n??????????????????????',
    videoUrl: 'https://www.youtube.com/watch?v=xQnpRE84aK8',
    youtubeId: 'xQnpRE84aK8',
}
];

// Static categories defined in code (not editable by users)
const CATEGORIES: Category[] = [
  { id: 'kaykeflex', name: 'Kaykeflex' },
  { id: 'kaykeflex-semana-do-trote', name: 'Semana do Trote', parentId: 'kaykeflex' },
  { id: 'kaykeflex-kaike-e-julia', name: 'Kaike e Julia', parentId: 'kaykeflex' },
  { id: 'kaykeflex-serie-mais-lixo', name: 'A Série Mais Lixo de Minecraft', parentId: 'kaykeflex' },
  // other top-level examples kept for compatibility
  { id: 'youtube', name: 'YouTube' },
];

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

  const getCoverForCategoryOrSubcategory = (id: string) => {
    const video = mockVideos.find(v => v.categoryId === id || v.subcategoryId === id);
    return video?.externalThumbnail ?? '';
  };

  const handleVideoSelect = (video: Video) => {
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
    setSelectedVideo(videos[0] ?? null);
  };

  const handleVideoEnded = () => {
    if (!selectedSubcategoryId || !selectedVideo) return;

    const playlist = currentPlaylist.length
      ? currentPlaylist
      : mockVideos.filter(v => v.subcategoryId === selectedSubcategoryId);

    const currentIndex = playlist.findIndex(v => v.id === selectedVideo.id);
    if (currentIndex >= 0 && currentIndex < playlist.length - 1) {
      setSelectedVideo(playlist[currentIndex + 1]);
    }
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
                      <FeaturedBanner 
                        video={mockVideos[0]} 
                        onPlay={() => handleVideoSelect(mockVideos[0])}
                        isFavorite={favorites.includes(mockVideos[0]?.id ?? '')}
                        onToggleFavorite={() => toggleFavorite(mockVideos[0]?.id ?? '')}
                      />
                      <div className="px-4 md:px-8">
                        <h2 className="text-2xl font-bold mb-4">Escolha uma categoria</h2>
                      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {topCategories.map(cat => {
                          const cover = getCoverForCategoryOrSubcategory(cat.id);
                          return (
                            <button
                              key={cat.id}
                              onClick={() => handleCategorySelect(cat.id)}
                              className="group rounded-3xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5 text-left shadow-sm hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md transition"
                            >
                              <div className="h-40 rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-700">
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
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{cat.name}</h3>
                                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Escolha essa categoria para ver as séries disponíveis.</p>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                      </div>
                    </>
                  ) : !selectedSubcategoryId ? (
                    <div className="px-4 md:px-8">
                      <button
                        onClick={() => setSelectedCategoryId(null)}
                        className="mb-6 text-sm text-blue-600 hover:underline"
                      >
                        ← Voltar para categorias
                      </button>
                      <h2 className="text-2xl font-bold mb-4">
                        {CATEGORIES.find(c => c.id === selectedCategoryId)?.name}
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
                                <div className="h-40 rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-700">
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
                        <p className="text-gray-600">Nenhuma subcategoria encontrada.</p>
                      )}
                    </div>
                  ) : (
                    <>
                      <div className="px-4 md:px-8 mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                          <button
                            onClick={() => setSelectedSubcategoryId(null)}
                            className="text-sm text-blue-600 hover:underline"
                          >
                            ← Voltar para subcategorias
                          </button>
                          <h2 className="text-2xl font-bold mt-3">{selectedSubcategory?.name}</h2>
                          <p className="text-sm text-gray-600">
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