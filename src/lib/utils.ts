import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

const youtubeThumbnailFallbacks = [
  "maxresdefault.jpg",
  "sddefault.jpg",
  "hqdefault.jpg",
  "mqdefault.jpg",
  "default.jpg",
]

export function getFallbackThumbnailUrl(url: string) {
  const index = youtubeThumbnailFallbacks.findIndex((fallback) =>
    url.endsWith(fallback),
  )

  if (index === -1 || index === youtubeThumbnailFallbacks.length - 1) {
    return url
  }

  return url.replace(youtubeThumbnailFallbacks[index], youtubeThumbnailFallbacks[index + 1])
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
