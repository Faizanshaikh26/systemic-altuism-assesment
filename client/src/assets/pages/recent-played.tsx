import { useEffect, useState } from "react"
import { getRecentlyPlayed } from "../../utils/recentPlayedsong"
import { Song } from "../../utils/types/song"

export default function RecentlyPlayed() {
  const [songs, setSongs] = useState<Song[]>([])

  useEffect(() => {
    const data = getRecentlyPlayed()
    setSongs(data)
  }, [])

  return (
    <div className="p-4 h-full flex flex-col overflow-y-scroll">
      <h2 className="text-xl font-semibold mb-4">Recently Played</h2>
      
      {songs.length === 0 ? (
        <p className="text-gray-400">No songs played yet.</p>
      ) : (
        <ul className="space-y-2">
          {songs.map((song) => (
            <li key={song.id} className="border-b border-gray-700 pb-2">
              <div className="flex items-center gap-4">
                <img
                  src={song.albumCover}
                  alt={song.title}
                  className="w-12 h-12 object-cover rounded"
                />
                <div>
                  <p className="text-white font-medium">{song.title}</p>
                  <p className="text-gray-400 text-sm">{song.artist}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
