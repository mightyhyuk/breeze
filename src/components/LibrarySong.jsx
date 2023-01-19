function LibrarySong({
  song,
  setCurrentSong,
  songs,
  setSongs,
  audioRef,
  isPlaying,
  setIsPlaying,
}) {
  const selectSong = async () => {
    await setCurrentSong(song);
    const updatedSongs = songs.map((s) =>
      s.id === song.id ? { ...s, isActive: true } : { ...s, isActive: false }
    );
    setSongs(updatedSongs);

    if (isPlaying) {
      await audioRef.current.play().catch((e) => {
        console.error(e);
        audioRef.current.pause();
        setIsPlaying(false);
      });
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
