import Music from "./components/Music";
import Player from "./components/Player";

import "./styles/app.scss";

import data from "./data/chillhop";

function App() {
  return (
    <div className="App">
      <Music />
      <Player />
    </div>
  );
}

export default App;
