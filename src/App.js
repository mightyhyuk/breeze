import { useRef } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  songsState,
  currentSongState,
  songStatusState,
  isSidebarOpenState,
} from "./lib/recoil-atoms";

import Song from "./components/Song";
import Player from "./components/Player";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import "./styles/app.scss";

import { getSkippedSong } from "./utils/getSkippedSong";

function App() {
  // recoil states
  const [songs, setSongs] = useRecoilState(songsState);
  const [currentSong, setCurrentSong] = useRecoilState(currentSongState);
  const setSongStatus = useSetRecoilState(songStatusState);
  const isSidebarOpen = useRecoilValue(isSidebarOpenState);

  // refs
  const audioRef = useRef(null);

  // funcs
  const updateSongStatus = (e) => {
    setSongStatus({
      currentTime: e.target.currentTime,
      duration: e.target.duration || 0,
    });
  };

  const updateSongs = (updatedSong) => {
    const updatedSongs = songs.map((song) =>
      song.id === updatedSong.id
        ? { ...song, isActive: true }
        : { ...song, isActive: false }
    );
    setSongs(updatedSongs);
  };

  const handleEnded = () => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    const skippedSong = getSkippedSong(songs, "forward", currentIndex);
    setCurrentSong(skippedSong);
    updateSongs(skippedSong);

    setTimeout(() => {
      audioRef.current.play();
    }, 0);
  };

  return (
    <div className={`App ${isSidebarOpen ? "sidebar-open" : ""}`}>
      <Navbar />
      <Sidebar audioRef={audioRef} />
      <Song />
      <Player audioRef={audioRef} updateSongs={updateSongs} />
      <audio
        onTimeUpdate={updateSongStatus}
        onLoadedMetadata={updateSongStatus}
        ref={audioRef}
        src={currentSong.audio}
        onEnded={handleEnded}
      ></audio>
    </div>
  );
}

export default App;
