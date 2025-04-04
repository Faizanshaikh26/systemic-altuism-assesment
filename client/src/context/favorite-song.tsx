"use client"

import { createContext, useContext, useEffect, useState } from "react"
import {
  addSongToFavorite,
  getFavoriteSongs,
  removeSongFromFavorite,
  isFavoriteSong,
} from "../utils/favorite-song"
import { Song } from "../utils/types/song"

type FavoriteContextType = {
  favorites: Song[]
  addToFavorite: (song: Song) => void
  removeFromFavorite: (songId: string | number) => void
  isFavorite: (songId: string | number) => boolean
}

// ✅ Create context
const FavoriteContext = createContext<FavoriteContextType | null>(null)

// ✅ Provider
export const FavoriteProvider = ({ children }: { children: React.ReactNode }) => {
  const [favorites, setFavorites] = useState<Song[]>([])

  useEffect(() => {
    const stored = getFavoriteSongs()
    setFavorites(stored)
  }, [])

  const addToFavorite = (song: Song) => {
    addSongToFavorite(song)
    setFavorites(getFavoriteSongs())
  }

  const removeFromFavorite = (songId: string | number) => {
    removeSongFromFavorite(String(songId))
    setFavorites(getFavoriteSongs())
  }

  const isFavorite = (songId: string | number) => {
    return isFavoriteSong(String(songId))
  }

  return (
    <FavoriteContext.Provider
      value={{ favorites, addToFavorite, removeFromFavorite, isFavorite }}
    >
      {children}
    </FavoriteContext.Provider>
  )
}

// ✅ Hook to use the context
export const useFavorite = () => {
  const context = useContext(FavoriteContext)
  if (!context) {
    throw new Error("useFavorite must be used within a FavoriteProvider")
  }
  return context
}
