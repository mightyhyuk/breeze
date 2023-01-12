function Song({ currentSong }) {
  return (
    <div className="song-container">
      <img src={currentSong.cover} alt="Cover" />
      <h2>{currentSong.title}</h2>
      <h3>{currentSong.artist}</h3>
    </div>
  );
}

export default Song;
