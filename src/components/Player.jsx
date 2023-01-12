import { useState, useRef } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";

function Player({ currentSong, isPlaying, setIsPlaying }) {
  const [songInfo, setSongInfo] = useState({
    currentTime: null,
    duration: null,
  });
  const audioRef = useRef(null);

  const playSong = () => {
    isPlaying ? audioRef.current.pause() : audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const updateSongInfo = (e) => {
    setSongInfo({
      currentTime: e.target.currentTime,
      duration: e.target.duration,
    });
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
        <p>{getCleanTime(songInfo.currentTime)}</p>
        <input
          min={0}
          value={songInfo.currentTime}
          max={songInfo.duration}
          type="range"
          onChange={handleRangeChange}
        />
        <p>{getCleanTime(songInfo.duration)}</p>
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
          icon={faPlay}
        />
        <FontAwesomeIcon
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
        />
      </div>
      <audio
        onTimeUpdate={updateSongInfo}
        onLoadedMetadata={updateSongInfo}
        ref={audioRef}
        src={currentSong.audio}
      ></audio>
    </div>
  );
}

export default Player;
