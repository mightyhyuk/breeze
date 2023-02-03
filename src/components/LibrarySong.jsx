import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  currentSongState,
  songsState,
  isPlayingState,
} from "../lib/recoil-atoms";

function LibrarySong({ song, audioRef }) {
  const setCurrentSong = useSetRecoilState(currentSongState);
  const [songs, setSongs] = useRecoilState(songsState);
  const isPlaying = useRecoilValue(isPlayingState);

  const selectSong = () => {
    setCurrentSong(song);
    const updatedSongs = songs.map((s) =>
      s.id === song.id ? { ...s, isActive: true } : { ...s, isActive: false }
    );
    setSongs(updatedSongs);

    if (isPlaying) {
      setTimeout(() => {
        audioRef.current.play();
      }, 0);
    }
  };

  return (
    <article
      onClick={selectSong}
      className={`library-song ${song.isActive ? "selected" : ""}`}
    >
      <img src={song.cover} alt="Cover" />
      <div className="song-desc">
        <h3>{song.title}</h3>
        <h4>{song.artist}</h4>
      </div>
    </article>
  );
}

export default LibrarySong;
