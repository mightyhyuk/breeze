import LibrarySong from "./LibrarySong";

function Library({ songs, setCurrentSong }) {
  return (
    <div className="library">
      <h2>Library</h2>
      {songs.map((song) => (
        <LibrarySong
          key={song.id}
          id={song.id}
          songs={songs}
          song={song}
          setCurrentSong={setCurrentSong}
        />
      ))}
    </div>
  );
}

export default Library;
