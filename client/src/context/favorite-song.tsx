"use client"

import { createContext, useContext, useEffect, useState } from "react"
import {
  addSongToFavorite,
  getFavoriteSongs,
  removeSongFromFavorite,
  isFavoriteSong,
} from "../utils/favorite-song"

type Song = {
  id: string
  title: string
  artist: string
  albumCover?: string
  duration?: string
}

type FavoriteContextType = {
  favorites: Song[]
  addToFavorite: (song: Song) => void
  removeFromFavorite: (songId: string) => void
  isFavorite: (songId: string) => boolean
}

const FavoriteContext = createContext<FavoriteContextType | null>(null)

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

  const removeFromFavorite = (songId: string) => {
    removeSongFromFavorite(songId)
    setFavorites(getFavoriteSongs())
  }

  const isFavorite = (songId: string) => {
    return isFavoriteSong(songId)
  }

  return (
    <FavoriteContext.Provider value={{ favorites, addToFavorite, removeFromFavorite, isFavorite }}>
      {children}
    </FavoriteContext.Provider>
  )
}

export const useFavorite = () => {
  const context = useContext(FavoriteContext)
  if (!context) throw new Error("useFavorite must be used within FavoriteProvider")
  return context
}
