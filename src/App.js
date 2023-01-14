import { useState } from "react";

import Song from "./components/Song";
import Player from "./components/Player";
import Library from "./components/Library";

import "./styles/app.scss";

import getChillhopSongs from "./data/chillhop";

function App() {
  const [songs, setSongs] = useState(getChillhopSongs());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="App">
      <Library songs={songs} />
      <Song currentSong={currentSong} />
      <Player
        currentSong={currentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />
    </div>
  );
}

export default App;
