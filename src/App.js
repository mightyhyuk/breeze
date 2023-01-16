import { useState, useRef } from "react";

import Song from "./components/Song";
import Player from "./components/Player";
import Library from "./components/Library";
import Navbar from "./components/Navbar";

import "./styles/app.scss";

import getChillhopSongs from "./data/chillhop";

function App() {
  const [songs, setSongs] = useState(getChillhopSongs());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });
  const [isLibOpen, setIsLibOpen] = useState(false);

  const audioRef = useRef(null);

  const updateSongInfo = (e) => {
    setSongInfo({
      currentTime: e.target.currentTime,
      duration: e.target.duration || 0,
    });
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
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        audioRef={audioRef}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
      />
      <audio
        onTimeUpdate={updateSongInfo}
        onLoadedMetadata={updateSongInfo}
        ref={audioRef}
        src={currentSong.audio}
      ></audio>
    </div>
  );
}

export default App;
