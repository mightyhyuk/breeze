import { useRecoilValue } from "recoil";
import { currentSongState, isPlayingState } from "../lib/recoil-atoms";

function Song() {
  const currentSong = useRecoilValue(currentSongState);
  const isPlaying = useRecoilValue(isPlayingState);

  return (
    <div className="song-container">
      <img
        src={currentSong.coverImg}
        alt="Cover"
        className={isPlaying ? "rotated" : ""}
      />
      <h2>{currentSong.title}</h2>
      <h3>{currentSong.artist}</h3>
    </div>
  );
}

export default Song;
