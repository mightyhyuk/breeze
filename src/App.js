import { useState, useRef } from "react";

import Song from "./components/Song";
import Player from "./components/Player";
import Library from "./components/Library";
import Navbar from "./components/Navbar";

import "./styles/app.scss";

import getChillhopSongs from "./data/chillhop";

import { getSkippedSong } from "./utils/getSkippedSong";

function App() {
  // state
  const [songs, setSongs] = useState(getChillhopSongs());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songStatus, setSongStatus] = useState({
    currentTime: 0,
    duration: 0,
    runPercentage: 0,
  });
  const [isLibOpen, setIsLibOpen] = useState(false);

  // ref
  const audioRef = useRef(null);

  // func
  const updateSongStatus = (e) => {
    setSongStatus({
      currentTime: e.target.currentTime,
      duration: e.target.duration || 0,
      runPercentage: (e.target.currentTime / e.target.duration) * 100 || 0,
    });
  };

  const updateSongs = (updatedSong) => {
    const updatedSongs = songs.map((s) =>
      s.id === updatedSong.id
        ? { ...s, isActive: true }
        : { ...s, isActive: false }
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
    <div className={`App ${isLibOpen ? "lib-open" : ""}`}>
      <Navbar isLibOpen={isLibOpen} setIsLibOpen={setIsLibOpen} />
      <Library
        songs={songs}
        setSongs={setSongs}
        setCurrentSong={setCurrentSong}
        audioRef={audioRef}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        isLibOpen={isLibOpen}
        setIsLibOpen={setIsLibOpen}
      />
      <Song currentSong={currentSong} isPlaying={isPlaying} />
      <Player
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        songs={songs}
        setSongs={setSongs}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        audioRef={audioRef}
        songStatus={songStatus}
        setSongStatus={setSongStatus}
        updateSongs={updateSongs}
      />
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
