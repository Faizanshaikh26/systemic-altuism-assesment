const songs: Song[] = [
    {
      id: 1,
      title: "1 AM",
      artist: "Civ",
      duration: "Unknown",
      albumCover: "https://i.scdn.co/image/ab67616d00001e0285c5968be0d0d9c545241124",
      songUrl: "/songs/1 AM.mp3",
      bgGradient: "from-gray-700 via-teal-800 to-indigo-900"
    },
    {
      id: 2,
      title: "24 SONGS",
      artist: "fedo DJ, khxznq, nulled.",
      duration: "Unknown",
      albumCover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRA-gOBqHrds_yJLixjwU3CtjU2wBhldfnL2A&s",
      songUrl: "/songs/24 SONGS.mp3",
      bgGradient: "from-green-700 via-emerald-800 to-lime-900"
    },
    {
      id: 3,
      title: "a última dança",
      artist: "Link do Zap, pluglip",
      duration: "Unknown",
      albumCover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkhCb7IEEAGQUUr_AYkTMDtcQ_yNAmhNjD6A&s",
      songUrl: "/songs/a última dança.mp3",
      bgGradient: "from-purple-800 via-pink-700 to-rose-800"
    },
    {
      id: 4,
      title: "Air",
      artist: "YEJI",
      duration: "Unknown",
      albumCover: "https://i.scdn.co/image/ab67616d0000485138d7a50443e2a6043d6da247",
      songUrl: "/songs/Air.mp3",
      bgGradient: "from-indigo-800 via-blue-900 to-purple-900"
    },
    {
      id: 5,
      title: "Aku Dah Lupa",
      artist: "MikkyZia, F4dli",
      duration: "Unknown",
      albumCover: "https://open.spotify.com/track/3wHU5wfyf0uw6TpiE98Jxn",
      songUrl: "/songs/Aku Dah Lupa.mp3",
      bgGradient: "from-fuchsia-800 via-rose-800 to-amber-800"
    },
    {
      id: 6,
      title: "Aldanırım",
      artist: "Sıla Şahin, Samet Kardeşler",
      duration: "3:21",
      albumCover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAfXN9vPReU-Dd36Uc_3cQ2PymQjdF1Dhh3KT1zoV9F_ucUpW_hk_wH_RBOrIQDcEIVKA&usqp=CAU",
      songUrl: "/songs/Aldanırım.mp3",
      bgGradient: "from-emerald-700 via-teal-800 to-green-900"
    },
    {
      id: 7,
      title: "Anxiety",
      artist: "Doechii",
      duration: "Unknown",
      albumCover: "https://i.scdn.co/image/ab67616d00004851ea29212b801087f18319c187",
      songUrl: "/songs/Anxiety.mp3",
      bgGradient: "from-rose-700 via-fuchsia-800 to-pink-900"
    },
    {
      id: 8,
      title: "back to friends",
      artist: "sombr",
      duration: "Unknown",
      albumCover: "https://i.scdn.co/image/ab67616d000048519d24f74c1e2d8a12b1e591ec",
      songUrl: "/songs/back to friends.mp3",
      bgGradient: "from-blue-800 via-cyan-800 to-sky-900"
    },
    {
      id: 9,
      title: "Chest Pain (I Love)",
      artist: "Malcolm Todd",
      duration: "3:00",
      albumCover: "https://i.scdn.co/image/ab67616d000048515661646011ef4469dc2c1a1d",
      songUrl: "/songs/Chest Pain (I Love).mp3",
      bgGradient: "from-zinc-800 via-neutral-900 to-black"
    },
    {
      id: 10,
      title: "ÇIKAR BİRİ KARŞIMA",
      artist: "Poizi, Era7capone, SNOW",
      duration: "2:00",
      albumCover: "https://i.scdn.co/image/ab67616d000048513fc1d20211b99d205d80721d",
      songUrl: "/songs/ÇIKAR BİRİ KARŞIMA.mp3",
      bgGradient: "from-orange-700 via-red-700 to-yellow-800"
    },
    {
      id: 11,
      title: "Dark Thoughts",
      artist: "Lil Tecca",
      duration: "Unknown",
      albumCover: "https://i.scdn.co/image/ab67616d00004851f9a2359739728d2af3284a8e",
      songUrl: "/songs/DarkThoughts.mp3",
      bgGradient: "from-slate-800 via-sky-900 to-gray-900"
    },
    {
      id: 12,
      title: "Dein Mann Freestyle",
      artist: "benno!",
      duration: "2:25",
      albumCover: "https://i.scdn.co/image/ab67616d000048513fc1d20211b99d205d80721d",
      songUrl: "/songs/DeinMannFreestyle.mp3",
      bgGradient: "from-amber-700 via-orange-800 to-yellow-900"
    },
    {
      id: 13,
      title: "EL DÍA DEL AMIGO",
      artist: "CA7RIEL, Paco Amoroso",
      duration: "Unknown",
      albumCover: "https://i.scdn.co/image/ab67616d00004851ea29212b801087f18319c187",
      songUrl: "/songs/ELDÍADELAMIGO.mp3",
      bgGradient: "from-fuchsia-700 via-purple-800 to-violet-900"
    },
    {
      id: 14,
      title: "Emergence",
      artist: "Sleep Token",
      duration: "Unknown",
      albumCover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBtlNnoMlVycbzc15tS1TTo32raH1y-IVbVQ&s",
      songUrl: "/songs/Emergence.mp3",
      bgGradient: "from-violet-800 via-indigo-900 to-purple-900"
    },
    {
      id: 15,
      title: "EVIL J0RDAN",
      artist: "Playboi Carti",
      duration: "Unknown",
      albumCover: "https://i.scdn.co/image/ab67616d000048516b219c8d8462bfe254a20469",
      songUrl: "/songs/EVILJ0RDAN.mp3",
      bgGradient: "from-black via-red-800 to-red-900"
    },
    {
      id: 16,
      title: "Farzet",
      artist: "Sertab Erener",
      duration: "Unknown",
      albumCover: "https://i.scdn.co/image/ab67616d000048512a0b5de0cd14543a434b1175",
      songUrl: "/songs/Farzet.mp3",
      bgGradient: "from-orange-700 via-amber-800 to-yellow-900"
    },
    {
      id: 17,
      title: "Heer",
      artist: "Ali & Shjr, Haider Ali, Ali Raza",
      duration: "Unknown",
      albumCover: "https://i.scdn.co/image/ab67616d00001e02479e980715ebd801bd47f49f",
      songUrl: "/songs/Heer.mp3",
      bgGradient: "from-indigo-900 via-blue-900 to-cyan-800"
    }
  ];
  
  export default songs;
  