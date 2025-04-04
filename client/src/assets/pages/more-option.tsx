import { useState, useRef, useEffect } from "react"
import { BiDotsHorizontalRounded } from "react-icons/bi"
import { addSongToFavorite } from "../../utils/favorite-song"


function MoreOptions({ currentTrack }: { currentTrack: any }) {
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const handleOutsideClick = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick)
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick)
    }
  }, [])




  const handleAddToFav = () => {
    if (currentTrack) {
      addSongToFavorite(currentTrack)
      setOpen(false)
    }
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        className="p-2 text-gray-400 hover:text-white"
        onClick={() => setOpen((prev) => !prev)}
      >
        <BiDotsHorizontalRounded size={24} />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-2 w-40 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-50">
          <button
            onClick={handleAddToFav}
            className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700 rounded-md"
          >
            ❤️ Add to Favorites
          </button>
        </div>
      )}
    </div>
  )
}

export default MoreOptions
