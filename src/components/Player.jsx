import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faForward,
  faBackward,
  faPause,
} from "@fortawesome/free-solid-svg-icons";

import { getCleanTime } from "../utils/getCleanTime";
import { getSkippedSong } from "../utils/getSkippedSong";

function Player({
  currentSong,
  setCurrentSong,
  songs,
  setSongs,
  isPlaying,
  setIsPlaying,
  audioRef,
  songStatus,
  setSongStatus,
  updateSongs,
}) {
  const playSong = () => {
    isPlaying ? audioRef.current.pause() : audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const handleRangeChange = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongStatus({
      ...songStatus,
      currentTime: e.target.value,
    });
  };

  const handleSkip = async (direction) => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    const skippedSong = getSkippedSong(songs, direction, currentIndex);
    await setCurrentSong(skippedSong);
    updateSongs(skippedSong);

    if (isPlaying) {
      await audioRef.current.play().catch((e) => {
        console.error(e);
        audioRef.current.pause();
        setIsPlaying(false);
      });
    }
  };

  return (
    <div className="player">
      <div className="time-control">
        <time>{getCleanTime(songStatus.currentTime)}</time>
        <div className="track">
          <input
            min={0}
            value={songStatus.currentTime}
            max={songStatus.duration}
            type="range"
            onChange={handleRangeChange}
          />
          <div
            style={{ transform: `translateX(${songStatus.runPercentage}%)` }}
            className="run"
          ></div>
        </div>

        <time>{getCleanTime(songStatus.duration)}</time>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          onClick={() => {
            handleSkip("backward");
          }}
          className="skip-backward"
          size="2x"
          icon={faBackward}
        />
        <FontAwesomeIcon
          onClick={playSong}
          className="play"
          size="3x"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          onClick={() => {
            handleSkip("forward");
          }}
          className="skip-forward"
          size="2x"
          icon={faForward}
        />
      </div>
    </div>
  );
}

export default Player;
