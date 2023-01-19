import LibrarySong from "./LibrarySong";

function Library({
  songs,
  setSongs,
  setCurrentSong,
  audioRef,
  isPlaying,
  setIsPlaying,
  isLibOpen,
}) {
  return (
    <aside className={`library ${isLibOpen ? "open" : ""}`}>
      <h2>Library</h2>
      {songs.map((song) => (
        <LibrarySong
          key={song.id}
          song={song}
          setCurrentSong={setCurrentSong}
          songs={songs}
          setSongs={setSongs}
          audioRef={audioRef}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
        />
      ))}
    </aside>
  );
}

export default Library;
