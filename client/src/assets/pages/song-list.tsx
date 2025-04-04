"use client"

import { useState } from "react"
import { BiSearch } from "react-icons/bi"
import songs from "../../utils/songdata"
import { usePlayer } from "../../context/music-player"
import { motion } from "framer-motion"

export default function SongList() {
  const [searchQuery, setSearchQuery] = useState("")
  const { playWithId, currentTrack, isPlaying } = usePlayer()

  const filteredSongs = songs.filter(
    (song) =>
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <motion.div
      initial={{ opacity: 0, x: "100%" }}
      whileInView={{ opacity: 1, x: 0 }}
      className="h-full w-full flex flex-col overflow-x-hidden px-4 sm:px-6"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4 text-white">For You</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search Song, Artist"
            className="w-full bg-gray-800/50 rounded-md py-2 pl-10 pr-4 text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-700"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <BiSearch className="absolute left-3 top-2.5 text-gray-500" size={18} />
        </div>
      </div>

      <div className="flex-grow overflow-y-auto space-y-2 custom-scrollbar pb-4">
        {filteredSongs.map((song, index) => (
          <motion.div
            key={song.id}
            onClick={() => playWithId(song.id)}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.03 }}
            viewport={{ once: true }}
            className={`flex items-center p-2 rounded-md hover:bg-gray-800/50 cursor-pointer transition ${
              currentTrack?.id === song.id ? "bg-gray-800/80" : ""
            }`}
          >
            <img
              src={song.albumCover || "/placeholder.svg"}
              alt={`${song.title} cover`}
              className="w-11 h-11 rounded-full mr-3 shrink-0"
            />
            <div className="flex-grow min-w-0">
              <p
                className={`text-sm truncate ${
                  currentTrack?.id === song.id ? "text-white" : "text-gray-300"
                }`}
              >
                {song.title}
              </p>
              <p className="text-xs text-gray-500 truncate">{song.artist}</p>
            </div>

            {currentTrack?.id === song.id && isPlaying && (
              <img
                src="/videos/playinggif.gif"
                alt="Playing"
                className="w-6 h-6 mr-2 rounded-sm"
              />
            )}

            <span className="text-xs text-gray-500 whitespace-nowrap ml-2">{song.duration}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
