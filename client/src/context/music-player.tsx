import React, {
    createContext,
    useContext,
    useEffect,
    useState,
    useRef,
    useCallback,
    useMemo,
    ReactNode,
  } from "react";
  import songs from "../utils/songdata";
import { addToRecentlyPlayed } from "../utils/recentPlayedsong";
import {Song} from '../utils/types/song'
  
  

  
  interface PlayerContextType {
    albumData: Song[];
    currentTrack: Song | null;
    isPlaying: boolean;
    isLoading: boolean;
    setCurrentTrack: (track: Song) => void;
    play: () => void;
    pause: () => void;
    nextTrack: () => void;
    previousTrack: () => void;
    audioRef: React.RefObject<HTMLAudioElement>;
    currentTime: number;
    setCurrentTime: React.Dispatch<React.SetStateAction<number>>;
    time: {
      currentTime: { second: number; minute: number };
      totalTime: { second: number; minute: number };
    };
    seek: (event: React.MouseEvent<HTMLDivElement>) => void;
    handleMouseDown: () => void;
    seekBar: React.RefObject<HTMLDivElement>;
    seekBg: React.RefObject<HTMLDivElement>;
    seekRing: React.RefObject<HTMLDivElement>;
    playWithId: (songId:string | number) => void;
  }
  
  
  export const PlayerContext = createContext<PlayerContextType | undefined>(undefined);
  

  export const usePlayer = (): PlayerContextType => {
    const context = useContext(PlayerContext);
    if (!context) {
      throw new Error("usePlayer must be used within a PlayerContextProvider");
    }
    return context;
  };
  

  interface PlayerProviderProps {
    children: ReactNode;
  }
  
  export const PlayerContextProvider: React.FC<PlayerProviderProps> = ({ children }) => {
    const seekBg = useRef<HTMLDivElement>(null);
    const seekBar = useRef<HTMLDivElement>(null);
    const seekRing = useRef<HTMLDivElement>(null);
    const audioRef = useRef<HTMLAudioElement>(null!);


  
    const [albumData, setAlbumData] = useState<Song[]>([]);
    const [currentTrack, setCurrentTrack] = useState<Song | null>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [time, setTime] = useState({
      currentTime: { second: 0, minute: 0 },
      totalTime: { second: 0, minute: 0 },
    });
  
    const fetchAlbumData = useCallback(() => {
      setIsLoading(true);
      setAlbumData(songs);
      if (songs.length > 0) {
        setCurrentTrack(songs[0]);
  
      }
      setIsLoading(false);
    }, []);
  
    useEffect(() => {
      fetchAlbumData();
    }, [fetchAlbumData]);
  
    const play = useCallback(() => {
        if (audioRef.current && currentTrack) {
          const playPromise = audioRef.current.play();
          addToRecentlyPlayed(currentTrack); 
      
          if (playPromise !== undefined) {
            playPromise
              .then(() => setIsPlaying(true))
              .catch((error) => console.error("Error while starting playback:", error));
          }
        }
      }, [currentTrack]);
      
  
    const pause = useCallback(() => {
      if (audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }, []);
  
    const loadTrack = useCallback(() => {
      if (audioRef.current && currentTrack) {
        setIsLoading(true);
        audioRef.current.src = currentTrack.songUrl;
        audioRef.current.load();
        audioRef.current.oncanplaythrough = () => {
          setIsLoading(false);
          play();
        };
      }
    }, [currentTrack, play]);
  
    const nextTrack = useCallback(() => {
      if (currentTrack && albumData.length > 0) {
        const currentIndex = albumData.findIndex((song) => song.id === currentTrack.id);
        if (currentIndex < albumData.length - 1) {
          setCurrentTrack(albumData[currentIndex + 1]);
        } else {
          setCurrentTrack(albumData[0]); 
        }
        if (audioRef.current) audioRef.current.currentTime = 0;
        loadTrack();
      }
    }, [currentTrack, albumData, loadTrack]);
  
    const previousTrack = useCallback(() => {
      if (currentTrack && albumData.length > 0) {
        const currentIndex = albumData.findIndex((song) => song.id === currentTrack.id);
        if (currentIndex > 0) {
          setCurrentTrack(albumData[currentIndex - 1]);
        } else {
          setCurrentTrack(albumData[albumData.length - 1]); 
        }
        if (audioRef.current) audioRef.current.currentTime = 0;
        loadTrack();
      }
    }, [currentTrack, albumData, loadTrack]);
  
    useEffect(() => {
      if (currentTrack) {
        loadTrack();
      }
    }, [currentTrack, loadTrack]);
  
    const seek = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
      if (audioRef.current && seekBg.current) {
        const seekBgRect = seekBg.current.getBoundingClientRect();
        const offsetX = event.clientX - seekBgRect.left;
        const newTime = (offsetX / seekBgRect.width) * audioRef.current.duration;
        audioRef.current.currentTime = newTime;
      }
    }, []);
  
    useEffect(() => {
      const updateSeekBarWidth = () => {
        if (audioRef.current && audioRef.current.duration) {
          const { currentTime, duration } = audioRef.current;
          const percentage = (currentTime / duration) * 100;
          if (seekBar.current) seekBar.current.style.width = `${percentage}%`;
          if (seekRing.current) seekRing.current.style.left = `${percentage}%`;
  
          setTime({
            currentTime: {
              second: Math.floor(currentTime % 60),
              minute: Math.floor(currentTime / 60),
            },
            totalTime: {
              second: Math.floor(duration % 60),
              minute: Math.floor(duration / 60),
            },
          });
        }
      };
  
      if (audioRef.current) {
        audioRef.current.ontimeupdate = updateSeekBarWidth;
        audioRef.current.addEventListener("ended", nextTrack);
      }
  
      return () => {
        if (audioRef.current) {
          audioRef.current.ontimeupdate = null;
          audioRef.current.removeEventListener("ended", nextTrack);
        }
      };
    }, [nextTrack]);
  
    const playWithId = useCallback((songId: string) => {
      const song = albumData.find((song:Song) => song.id === songId);
      if (song) {
        setCurrentTrack(song);
        if (audioRef.current) {
          audioRef.current.currentTime = 0;
          audioRef.current.load();
          audioRef.current.addEventListener("canplaythrough", play, { once: true });
        }
      }
    }, [albumData, play]);
  
    const contextValue = useMemo(
      () => ({
        albumData,
        currentTrack,
        isPlaying,
        isLoading,
        setCurrentTrack,
        play,
        pause,
        nextTrack,
        previousTrack,
        audioRef,
        currentTime,
        setCurrentTime,
        time,
        seek,
        handleMouseDown: () => {}, 
        seekBar,
        seekBg,
        seekRing,
        playWithId,
      }),
      [albumData, currentTrack, isPlaying, isLoading, play, pause, nextTrack, previousTrack, currentTime, time, seek, playWithId]
    );
  
    return <PlayerContext.Provider value={contextValue}>{children}</PlayerContext.Provider>;
  };
  