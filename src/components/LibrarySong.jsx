function LibrarySong({ song, setCurrentSong }) {
  const selectSong = () => {
    setCurrentSong(song);
  };

  return (
    <div className="library-song" onClick={selectSong}>
      <img src={song.cover} alt="Cover" />
      <div className="song-desc">
        <h3>{song.title}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
}

export default LibrarySong;
