import LibrarySong from "./LibrarySong";

function Library({ songs, setCurrentSong, audioRef, isPlaying, setIsPlaying }) {
  return (
    <div className="library">
      <h2>Library</h2>
      {songs.map((song) => (
        <LibrarySong
          key={song.id}
          song={song}
          setCurrentSong={setCurrentSong}
          audioRef={audioRef}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
        />
      ))}
    </div>
  );
}

export default Library;
