export const getSkippedSong = (songs, direction, currentIndex) => {
  if (direction === "backward") {
    if (currentIndex === 0) {
      return songs[songs.length - 1];
    }
    return songs[currentIndex - 1];
  }
  if (direction === "forward") {
    if (currentIndex === songs.length - 1) {
      return songs[0];
    }
    return songs[currentIndex + 1];
  }
};
