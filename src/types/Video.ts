
export interface Video {
  id: string;
  title: string;
  thumbnail?: string;
  duration: string;
  ageRating: string;
  // Legacy category name (kept for compatibility)
  category: string;
  // New structured references
  categoryId?: string;
  subcategoryId?: string;
  description: string;
  videoUrl: string;
  youtubeId?: string;
  vimeoId?: string;
  externalThumbnail: string;
}
