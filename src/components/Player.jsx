import { useRecoilState, useRecoilValue } from "recoil";
import {
  songsState,
  currentSongState,
  isPlayingState,
  songStatusState,
} from "../lib/recoil-atoms";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faForwardStep,
  faBackwardStep,
  faPause,
} from "@fortawesome/free-solid-svg-icons";

import { getCleanTime } from "../utils/getCleanTime";
import { getSkippedSong } from "../utils/getSkippedSong";

function Player({ audioRef, updateSongs }) {
  const songs = useRecoilValue(songsState);
  const [currentSong, setCurrentSong] = useRecoilState(currentSongState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [songStatus, setSongStatus] = useRecoilState(songStatusState);

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

  const handleSkip = (direction) => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    const skippedSong = getSkippedSong(songs, direction, currentIndex);
    setCurrentSong(skippedSong);
    updateSongs(skippedSong);

    if (isPlaying) {
      setTimeout(() => {
        audioRef.current.play();
      }, 0);
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
            style={{
              transform: `translateX(${
                (songStatus.currentTime / songStatus.duration) * 100 || 0
              }%)`,
            }}
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
          icon={faBackwardStep}
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
          icon={faForwardStep}
        />
      </div>
    </div>
  );
}

export default Player;
