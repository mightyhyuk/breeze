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
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });
  const [isLibOpen, setIsLibOpen] = useState(false);

  // ref
  const audioRef = useRef(null);

  // func
  const updateSongInfo = (e) => {
    setSongInfo({
      currentTime: e.target.currentTime,
      duration: e.target.duration || 0,
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
    <div className="App">
      <Navbar isLibOpen={isLibOpen} setIsLibOpen={setIsLibOpen} />
      <Library
        songs={songs}
        setSongs={setSongs}
        setCurrentSong={setCurrentSong}
        audioRef={audioRef}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        isLibOpen={isLibOpen}
      />
      <Song currentSong={currentSong} />
      <Player
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        songs={songs}
        setSongs={setSongs}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        audioRef={audioRef}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
        updateSongs={updateSongs}
      />
      <audio
        onTimeUpdate={updateSongInfo}
        onLoadedMetadata={updateSongInfo}
        ref={audioRef}
        src={currentSong.audio}
        onEnded={handleEnded}
      ></audio>
    </div>
  );
}

export default App;
