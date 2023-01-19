function LibrarySong({
  song,
  setCurrentSong,
  songs,
  setSongs,
  audioRef,
  isPlaying,
  setIsPlaying,
}) {
  const selectSong = () => {
    setCurrentSong(song);
    const updatedSongs = songs.map((s) =>
      s.id === song.id ? { ...s, isActive: true } : { ...s, isActive: false }
    );
    setSongs(updatedSongs);

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
    <article
      onClick={selectSong}
      className={`library-song ${song.isActive ? "selected" : ""}`}
    >
      <img src={song.cover} alt="Cover" />
      <div className="song-desc">
        <h3>{song.title}</h3>
        <h4>{song.artist}</h4>
      </div>
    </article>
  );
}

export default LibrarySong;
