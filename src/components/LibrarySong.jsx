function LibrarySong({
  song,
  setCurrentSong,
  audioRef,
  isPlaying,
  setIsPlaying,
}) {
  const selectSong = () => {
    setCurrentSong(song);
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
