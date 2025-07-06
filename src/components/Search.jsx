import React, { useState } from "react";
import { albumsData, songsData } from "../assets/assets";
import AlbumItems from "./AlbumItems";
import SongItems from "./SongItems";

const Search = () => {
  const [search, setSearch] = useState("");

  const filteredAlbums = albumsData.filter(
    (album) =>
      album.name.toLowerCase().includes(search.toLowerCase()) ||
      album.desc.toLowerCase().includes(search.toLowerCase())
  );
  const filteredSongs = songsData.filter(
    (song) =>
      song.name.toLowerCase().includes(search.toLowerCase()) ||
      song.desc.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full h-full p-6 text-white">
      <input
        type="text"
        placeholder="Search songs or albums..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="px-3 py-2 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 text-black text-[15px] w-full mb-6"
        style={{ background: "white" }}
      />
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Albums</h1>
        <div className="flex overflow-auto">
          {filteredAlbums.length > 0 ? (
            filteredAlbums.map((item, index) => (
              <AlbumItems
                key={index}
                name={item.name}
                desc={item.desc}
                id={item.id}
                image={item.image}
              />
            ))
          ) : (
            <p className="text-gray-400">No albums found.</p>
          )}
        </div>
      </div>
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Songs</h1>
        <div className="flex overflow-auto">
          {filteredSongs.length > 0 ? (
            filteredSongs.map((item, index) => (
              <SongItems
                key={index}
                name={item.name}
                desc={item.desc}
                id={item.id}
                image={item.image}
              />
            ))
          ) : (
            <p className="text-gray-400">No songs found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
