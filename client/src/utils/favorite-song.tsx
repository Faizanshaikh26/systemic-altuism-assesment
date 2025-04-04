const FAVORITE_KEY = "favoriteSongs"

// Add a song to favorites
export const addSongToFavorite = (song: any) => {
  const favorites = JSON.parse(localStorage.getItem(FAVORITE_KEY) || "[]")

  // Avoid duplicates
  const isAlreadyFavorited = favorites.some((fav: any) => fav.id === song.id)
  if (!isAlreadyFavorited) {
    favorites.push(song)
    localStorage.setItem(FAVORITE_KEY, JSON.stringify(favorites))
  }
}

// Remove a song from favorites
export const removeSongFromFavorite = (songId: string) => {
  let favorites = JSON.parse(localStorage.getItem(FAVORITE_KEY) || "[]")
  favorites = favorites.filter((fav: any) => fav.id !== songId)
  localStorage.setItem(FAVORITE_KEY, JSON.stringify(favorites))
}

// Get all favorite songs
export const getFavoriteSongs = (): any[] => {
  return JSON.parse(localStorage.getItem(FAVORITE_KEY) || "[]")
}

// Check if a song is in favorites
export const isFavoriteSong = (songId: string): boolean => {
  const favorites = JSON.parse(localStorage.getItem(FAVORITE_KEY) || "[]")
  return favorites.some((fav: any) => fav.id === songId)
}
