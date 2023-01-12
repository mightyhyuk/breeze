import { useState } from "react";

import Song from "./components/Song";
import Player from "./components/Player";

import "./styles/app.scss";

import getChillhopSongs from "./data/chillhop";

function App() {
  const [songs, setSongs] = useState(getChillhopSongs());
  const [currentSong, setCurrentSong] = useState(songs[0]);

  return (
    <div className="App">
      <Song currentSong={currentSong} />
      <Player currentSong={currentSong} />
    </div>
  );
}

export default App;
