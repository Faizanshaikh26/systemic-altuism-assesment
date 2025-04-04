import { useEffect, useState } from "react"
import { AiFillHeart } from "react-icons/ai"
import { getFavoriteSongs, removeSongFromFavorite } from "../../utils/favorite-song"
import { Song } from "../../utils/types/song"

export default function FavoriteList() {
  const [favoriteSongs, setFavoriteSongs] = useState<Song[]>([])

  // Fetch favorites from localStorage
  const getFavoritesongs = () => {
    const favorites = getFavoriteSongs()
    setFavoriteSongs(favorites)
  }

  useEffect(() => {
    getFavoritesongs()
  }, [])

  const handleRemove = (id: string) => {
    removeSongFromFavorite(id)
    getFavoritesongs()
  }

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-2xl font-bold mb-4">Your Favorites</h2>

      {favoriteSongs.length === 0 ? (
        <p className="text-gray-500 text-sm">No favorite songs yet.</p>
      ) : (
        <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar">
          {favoriteSongs.map((song) => (
            <div
              key={song.id}
              className="flex items-center p-2 mb-2 rounded-md hover:bg-gray-800/50 cursor-pointer bg-gray-800/30"
            >
              <img
                src={song.albumCover}
                alt={song.title}
                className="w-11 h-11 rounded-full mr-3"
              />
              <div className="flex-grow">
                <p className="text-sm text-white">{song.title}</p>
                <p className="text-xs text-gray-500">{song.artist}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">{song.duration}</span>
                <AiFillHeart
                  size={18}
                  className="text-red-500 cursor-pointer"
                  onClick={() => handleRemove(song.id)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
