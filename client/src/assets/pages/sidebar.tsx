"use client"

import React, { useState } from "react"
import {
  HomeIcon,
  HeartIcon,
  ClockIcon,
  ListMusicIcon,
  MenuIcon,
  XIcon,
} from "lucide-react"
import { NavLink } from "react-router-dom"
import { motion } from "framer-motion"

interface NavItem {
  label: string
  icon: React.ReactNode
  to: string
}

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems: NavItem[] = [
    { label: "For You", icon: <HomeIcon size={18} />, to: "/" },
    { label: "Top Tracks", icon: <ListMusicIcon size={18} />, to: "/" },
    { label: "Favourites", icon: <HeartIcon size={18} />, to: "/favorite-song" },
    { label: "Recently Played", icon: <ClockIcon size={18} />, to: "/recently-played" },
  ]

  return (
    <>
      {/* Hamburger icon - only on mobile */}
      <div className="md:hidden p-4">
        <MenuIcon
          size={24}
          onClick={() => setIsOpen(true)}
          className="text-white cursor-pointer"
        />
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.div initial={{ opacity: 0, y: "-100%" }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 * -3 }}
        className={`fixed top-0 left-0 z-50 w-full h-full transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0 bg-black " : "-translate-x-full"} md:relative md:translate-x-0 `}
      >
        {/* Close icon for mobile */}
        <div className="md:hidden flex justify-end p-4">
          <XIcon
            size={24}
            onClick={() => setIsOpen(false)}
            className="text-white cursor-pointer"
          />
        </div>

      
        <div className="h-full flex flex-col py-6">
          <div className="px-4 mb-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="black">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                </svg>
              </div>
              <span className="font-bold text-lg">Spotify</span>
            </div>
          </div>

          <nav className="flex-grow">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.label}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-2 text-sm transition ${
                        isActive
                          ? "text-white font-medium"
                          : "text-gray-400 hover:text-white"
                      }`
                    }
                    onClick={() => setIsOpen(false)} 
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-auto px-4">
            <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
              <span className="text-xs font-medium">YP</span>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
}
