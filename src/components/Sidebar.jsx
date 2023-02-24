import { useRecoilState, useRecoilValue } from "recoil";
import { songsState, isSidebarOpenState } from "../lib/recoil-atoms";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import SidebarSong from "./SidebarSong";

function Sidebar({ audioRef }) {
  const songs = useRecoilValue(songsState);
  const [isSidebarOpen, setIsSidebarOpen] = useRecoilState(isSidebarOpenState);

  const exit = () => {
    setIsSidebarOpen(false);
  };

  return (
    <aside className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
      <div className="sidebar-top">
        <h2>Collection</h2>
        <h2>
          <FontAwesomeIcon onClick={exit} className="exit" icon={faXmark} />
        </h2>
      </div>
      {songs.map((song) => (
        <SidebarSong key={song.id} song={song} audioRef={audioRef} />
      ))}
    </aside>
  );
}

export default Sidebar;
