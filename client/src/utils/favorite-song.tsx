import { Song } from "../utils/types/song"

const FAVORITE_KEY = "favoriteSongs"

// Add a song to favorites
export const addSongToFavorite = (song: Song): void => {
  const favorites: Song[] = JSON.parse(localStorage.getItem(FAVORITE_KEY) || "[]")

  const isAlreadyFavorited = favorites.some((fav: Song) => fav.id === song.id)
  if (!isAlreadyFavorited) {
    favorites.push(song)
    localStorage.setItem(FAVORITE_KEY, JSON.stringify(favorites))
  }
}

// Remove a song from favorites
export const removeSongFromFavorite = (songId: string): void => {
  let favorites: Song[] = JSON.parse(localStorage.getItem(FAVORITE_KEY) || "[]")
  favorites = favorites.filter((fav: Song) => fav.id !== songId)
  localStorage.setItem(FAVORITE_KEY, JSON.stringify(favorites))
}

// Get all favorite songs
export const getFavoriteSongs = (): Song[] => {
  return JSON.parse(localStorage.getItem(FAVORITE_KEY) || "[]") as Song[]
}

// Check if a song is in favorites
export const isFavoriteSong = (songId: string): boolean => {
  const favorites: Song[] = JSON.parse(localStorage.getItem(FAVORITE_KEY) || "[]")
  return favorites.some((fav: Song) => fav.id === songId)
}
