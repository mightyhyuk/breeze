import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faForward,
  faBackward,
  faPause,
} from "@fortawesome/free-solid-svg-icons";

function Player({
  currentSong,
  setCurrentSong,
  songs,
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

  const handleSkip = (direction) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (direction === "backward") {
      if (currentIndex === 0) {
        setCurrentSong(songs[songs.length - 1]);
        return;
      }
      setCurrentSong(songs[currentIndex - 1]);
      return;
    }
    if (direction === "forward") {
      if (currentIndex === songs.length - 1) {
        setCurrentSong(songs[0]);
        return;
      }
      setCurrentSong(songs[currentIndex + 1]);
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
          size="2x"
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
