import { Song } from "../utils/types/song"

const RECENTLY_PLAYED_KEY = "recentlyPlayed"

// Add a song to recently played list
export const addToRecentlyPlayed = (song: Song): void => {
  let list: Song[] = JSON.parse(sessionStorage.getItem(RECENTLY_PLAYED_KEY) || "[]")

  // Remove duplicate if already in the list
  list = list.filter((item: Song) => item.id !== song.id)

  // Add new song at the beginning
  list.unshift(song)

  // Limit to 10 items
  if (list.length > 10) {
    list = list.slice(0, 10)
  }

  sessionStorage.setItem(RECENTLY_PLAYED_KEY, JSON.stringify(list))
}

// Get the list of recently played songs
export const getRecentlyPlayed = (): Song[] => {
  return JSON.parse(sessionStorage.getItem(RECENTLY_PLAYED_KEY) || "[]") as Song[]
}
