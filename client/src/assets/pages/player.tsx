"use client";

import { useCallback, useEffect, useState, ChangeEvent } from "react";

import {
  FiVolumeX,
  FiVolume1,
  FiVolume2,
} from "react-icons/fi";
import {
  IoPauseCircle,
  IoPlayCircle,
} from "react-icons/io5";
import {
  RiSkipBackFill,
  RiSkipForwardFill,
} from "react-icons/ri";
import { usePlayer } from "../../context/music-player";
import MoreOptions from "./more-option";
import SongLoader from "../../components/loader";
import { div } from "framer-motion/client";

export default function Player() {
  const {
    currentTrack,
    isPlaying,
    play,
    pause,
    nextTrack,
    previousTrack,
    time,
    audioRef,
    seekBg,
    seek,isLoading
  } = usePlayer();

  const togglePlay = () => {
    isPlaying ? pause() : play();
  };

  const [volume, setVolume] = useState(1);
  const [showVolume, setShowVolume] = useState(false);

  const toggleVolume = () => setShowVolume((prev) => !prev);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [audioRef, volume]);

  const handleVolumeChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setVolume(parseFloat(event.target.value));
    },
    []
  );

  const getVolumeIcon = () => {
    if (volume === 0) return <FiVolumeX size={22} />;
    if (volume < 0.5) return <FiVolume1 size={22} />;
    return <FiVolume2 size={22} />;
  };

  const calculateProgress = () => {
    const current =
      time.currentTime.minute * 60 + time.currentTime.second;
    const total =
      time.totalTime.minute * 60 + time.totalTime.second;
    return total > 0 ? (current / total) * 100 : 0;
  };

  return (
    <div className="w-full p-4 flex flex-col h-full">
      {/* Song Info */}
      <div className="px-5 text-center sm:text-left">
        <h1 className="text-3xl font-bold">
          {currentTrack?.title || "No Song Selected"}
        </h1>
        <p className="text-gray-400">{currentTrack?.artist || ""}</p>
      </div>

      {/* Album Art */}
      <div className="flex-grow flex items-center justify-center mb-8">
        <img
          src={currentTrack?.albumCover || "/placeholder.svg"}
          alt={currentTrack?.title || "Album cover"}
          className="w-full max-w-[400px] max-h-[400px] rounded-md shadow-lg"
        />
      </div>

      {/* Progress Bar */}

      {
        isLoading ? <div className="flex items-center max-w-xl mx-auto">
          <SongLoader/>
        </div> : <div
        className="w-full max-w-[400px] mb-4 mx-auto relative cursor-pointer"
        ref={seekBg}
        onMouseDown={seek}
      >
        <div className="w-full bg-gray-700 h-1 rounded-full overflow-hidden">
          <div
            className="bg-white h-full rounded-full"
            style={{ width: `${calculateProgress()}%` }}
          />
        </div>
      </div>
      }
      

      {/* Controls */}
      <div className="flex flex-wrap justify-center items-center w-full max-w-[400px] mx-auto gap-6">
        <MoreOptions currentTrack={currentTrack} />

        <button
          className="p-2 text-gray-400 hover:text-white"
          onClick={previousTrack}
        >
          <RiSkipBackFill size={24} />
        </button>

        <button
          className="p-0 text-white hover:scale-105 transition-transform"
          onClick={togglePlay}
        >
          {isPlaying ? (
            <IoPauseCircle size={48} />
          ) : (
            <IoPlayCircle size={48} />
          )}
        </button>

        <button
          className="p-2 text-gray-400 hover:text-white"
          onClick={nextTrack}
        >
          <RiSkipForwardFill size={24} />
        </button>

        {/* Volume Control */}
        <div className="flex items-center gap-2">
          <button
            className="p-2 text-gray-400 hover:text-white"
            onClick={toggleVolume}
          >
            {getVolumeIcon()}
          </button>

          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className={`${
              showVolume ? "w-24 md:w-32 lg:w-40" : "w-0"
            } transition-all duration-300 overflow-hidden cursor-pointer accent-white`}
          />
        </div>
      </div>

      {/* Hidden Audio Element */}
      <audio ref={audioRef} />
    </div>
  );
}
