function Song({ currentSong, isPlaying }) {
  return (
    <div className="song-container">
      <img
        src={currentSong.cover}
        alt="Cover"
        className={isPlaying ? "rotated" : ""}
      />
      <h2>{currentSong.title}</h2>
      <h3>{currentSong.artist}</h3>
    </div>
  );
}

export default Song;
