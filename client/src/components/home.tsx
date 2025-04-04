import { LuListMusic } from "react-icons/lu";
import Player from "../assets/pages/player";
import { Sidebar } from "../assets/pages/sidebar";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { Outlet } from "react-router-dom";
import { usePlayer } from "../context/music-player";

export default function Home() {
  const [showMobileSongList, setShowMobileSongList] = useState(false);
  const { currentTrack } = usePlayer();

  const bgGradient = currentTrack?.bgGradient || "from-gray-900 via-black to-gray-900";
  const toggleHamburger = () => {
    setShowMobileSongList(!showMobileSongList);
  };

  return (
    <div className={`flex h-screen bg-gradient-to-r ${bgGradient} transition-all duration-500  text-white relative`}>

        

      <div
        className="absolute right-4 top-4 sm:hidden z-50 cursor-pointer"
        onClick={toggleHamburger}
      >
        {showMobileSongList ? <IoClose size={28} /> : <LuListMusic size={28} />}
      </div>

      {/* Sidebar */}
      <div className="w-[15%] border-r border-gray-800">
        <Sidebar />
      </div>

      {/* Mobile Slide-in Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full bg-black z-40 transition-transform duration-300 ease-in-out sm:hidden ${
          showMobileSongList ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 h-full">
          <Outlet />
        </div>
      </div>

      {/* Desktop SongList / RecentlyPlayed */}
      <div className="hidden sm:block w-[35%] p-2 ">
        <Outlet />
      </div>

      {/* Music Player Section */}
      <div className="w-full sm:w-[50%] p-2 sm:py-8 flex flex-col items-center justify-center">
        <Player />
      </div>
    </div>
  );
}
