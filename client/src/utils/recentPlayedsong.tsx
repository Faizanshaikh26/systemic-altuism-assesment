

export const addToRecentlyPlayed = (song: any) => {
    const key = "recentlyPlayed"
    let list = JSON.parse(sessionStorage.getItem(key) || "[]")
  
    
    list = list.filter((item: any) => item.id !== song.id)
  
  
    list.unshift(song)
  
  
    if (list.length > 10) {
      list = list.slice(0, 10)
    }
  
    sessionStorage.setItem(key, JSON.stringify(list))
  }
  
  export const getRecentlyPlayed = () => {
    const key = "recentlyPlayed"
    return JSON.parse(sessionStorage.getItem(key) || "[]")
  }
  