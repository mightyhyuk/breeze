import { atom } from "recoil";
import songs from "../data/songs";

export const songsState = atom({
  key: "Songs",
  default: songs,
});

export const currentSongState = atom({
  key: "CurrentSong",
  default: songs[0],
});

export const isPlayingState = atom({
  key: "IsPlaying",
  default: false,
});

export const songStatusState = atom({
  key: "SongStatus",
  default: {
    currentTime: 0,
    duration: 0,
    runPercentage: 0,
  },
});

export const isLibOpenState = atom({
  key: "IsLibOpen",
  default: false,
});
