import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import LibrarySong from "./LibrarySong";

function Library({
  songs,
  setSongs,
  setCurrentSong,
  audioRef,
  isPlaying,
  setIsPlaying,
  isLibOpen,
  setIsLibOpen,
}) {
  const exit = () => {
    setIsLibOpen(false);
  };

  return (
    <aside className={`library ${isLibOpen ? "open" : ""}`}>
      <div className="library-bar">
        <h2>Library</h2>
        <h2>
          <FontAwesomeIcon onClick={exit} className="exit" icon={faXmark} />
        </h2>
      </div>
      {songs.map((song) => (
        <LibrarySong
          key={song.id}
          song={song}
          setCurrentSong={setCurrentSong}
          songs={songs}
          setSongs={setSongs}
          audioRef={audioRef}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
        />
      ))}
    </aside>
  );
}

export default Library;
