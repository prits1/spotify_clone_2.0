import React, { createContext, useState, useEffect } from "react";

export const PlaylistContext = createContext();

const PlaylistContextProvider = ({ children }) => {
  // Load playlists from localStorage or start with empty array
  const [playlists, setPlaylists] = useState(() => {
    const saved = localStorage.getItem("playlists");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("playlists", JSON.stringify(playlists));
  }, [playlists]);

  // Add a new playlist
  const addPlaylist = (name) => {
    setPlaylists((prev) => [
      ...prev,
      { id: Date.now(), name, songs: [] }
    ]);
  };

  // Remove a playlist
  const removePlaylist = (id) => {
    setPlaylists((prev) => prev.filter((p) => p.id !== id));
  };

  // Add song to playlist
  const addSongToPlaylist = (playlistId, song) => {
    setPlaylists((prev) =>
      prev.map((p) =>
        p.id === playlistId && !p.songs.find((s) => s.id === song.id)
          ? { ...p, songs: [...p.songs, song] }
          : p
      )
    );
  };

  // Remove song from playlist
  const removeSongFromPlaylist = (playlistId, songId) => {
    setPlaylists((prev) =>
      prev.map((p) =>
        p.id === playlistId
          ? { ...p, songs: p.songs.filter((s) => s.id !== songId) }
          : p
      )
    );
  };

  return (
    <PlaylistContext.Provider
      value={{ playlists, addPlaylist, removePlaylist, addSongToPlaylist, removeSongFromPlaylist }}
    >
      {children}
    </PlaylistContext.Provider>
  );
};

export default PlaylistContextProvider;
