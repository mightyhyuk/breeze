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
  songInfo,
  setSongInfo,
}) {
  const playSong = () => {
    isPlaying ? audioRef.current.pause() : audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const handleRangeChange = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({
      ...songInfo,
      currentTime: e.target.value,
    });
  };

  const updateSongs = (updatedSong) => {
    const updatedSongs = songs.map((s) =>
      s.id === updatedSong.id
        ? { ...s, isActive: true }
        : { ...s, isActive: false }
    );
    setSongs(updatedSongs);
  };

  const handleSkip = (direction) => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    const skippedSong = getSkippedSong(songs, direction, currentIndex);
    setCurrentSong(skippedSong);
    updateSongs(skippedSong);

    if (isPlaying) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => audioRef.current.play())
          .catch((err) => {
            console.error(err);
            audioRef.current.pause();
            setIsPlaying(false);
          });
      }
    }
  };

  return (
    <div className="player">
      <div className="time-control">
        <time>{getCleanTime(songInfo.currentTime)}</time>
        <input
          min={0}
          value={songInfo.currentTime}
          max={songInfo.duration}
          type="range"
          onChange={handleRangeChange}
        />
        <time>{getCleanTime(songInfo.duration)}</time>
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
