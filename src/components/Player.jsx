import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from "@fortawesome/free-solid-svg-icons";

function Player({ isPlaying, setIsPlaying, audioRef, songInfo, setSongInfo }) {
  const playSong = () => {
    isPlaying ? audioRef.current.pause() : audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const getCleanTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  const handleRangeChange = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({
      ...songInfo,
      currentTime: e.target.value,
    });
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
          className="skip-backward"
          size="2x"
          icon={faAngleLeft}
        />
        <FontAwesomeIcon
          onClick={playSong}
          className="play"
          size="2x"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
        />
      </div>
    </div>
  );
}

export default Player;
