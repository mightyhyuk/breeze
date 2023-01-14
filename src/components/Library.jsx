import LibrarySong from "./LibrarySong";

function Library({ songs }) {
  return (
    <div className="library">
      <h2>Library</h2>
      {songs.map((song) => (
        <LibrarySong key={song.id} song={song} />
      ))}
    </div>
  );
}

export default Library;
