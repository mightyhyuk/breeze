import { useRecoilState, useRecoilValue } from "recoil";
import { songsState, isLibOpenState } from "../lib/recoil-atoms";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import LibrarySong from "./LibrarySong";

function Library({ audioRef }) {
  const songs = useRecoilValue(songsState);
  const [isLibOpen, setIsLibOpen] = useRecoilState(isLibOpenState);

  const exit = () => {
    setIsLibOpen(false);
  };

  return (
    <aside className={`library ${isLibOpen ? "open" : ""}`}>
      <div className="library-bar">
        <h2>Collection</h2>
        <h2>
          <FontAwesomeIcon onClick={exit} className="exit" icon={faXmark} />
        </h2>
      </div>
      {songs.map((song) => (
        <LibrarySong key={song.id} song={song} audioRef={audioRef} />
      ))}
    </aside>
  );
}

export default Library;
