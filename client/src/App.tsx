import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import SongList from "./assets/pages/song-list";
import RecentlyPlayed from "./assets/pages/recent-played";
import FavoriteList from "./assets/pages/favorite-song";


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<SongList />} />
          <Route path="recently-played" element={<RecentlyPlayed />} />
          <Route path="favorite-song" element={<FavoriteList />} />
        </Route>
      </Routes>
    </Router>
  );
}
