import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { PlaylistContext } from "../context/PlaylistContext";
import SongItems from "./SongItems";

const Playlist = () => {
  const { playlists, removeSongFromPlaylist } = useContext(PlaylistContext);
  const { id } = useParams();
  const playlist = playlists.find((p) => String(p.id) === String(id));

  if (!playlist) {
    return <div className="text-white p-6">Playlist not found.</div>;
  }

  return (
    <div className="w-full h-full p-6 text-white">
      <h1 className="text-3xl font-bold mb-4">{playlist.name}</h1>
      <h2 className="text-xl mb-2">Songs</h2>
      <div className="flex flex-col gap-2">
        {playlist.songs.length === 0 ? (
          <p className="text-gray-400">No songs in this playlist.</p>
        ) : (
          playlist.songs.map((song) => (
            <div key={song.id} className="flex items-center gap-2 bg-[#181818] rounded p-2">
              <SongItems {...song} />
              <button
                className="ml-2 text-red-400 px-2 py-1 rounded hover:bg-red-900"
                onClick={() => removeSongFromPlaylist(playlist.id, song.id)}
                title="Remove from playlist"
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Playlist;
