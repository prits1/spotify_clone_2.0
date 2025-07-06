import React from "react";
import Navbar from "./Navbar";
import { albumsData, songsData } from "../assets/assets";
import AlbumItems from "./AlbumItems";
import SongItems from "./SongItems";


import { useState } from "react";

const DisplayHome = () => {
  const [search, setSearch] = useState("");

  // Filter albums and songs based on search
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
    <>
      <Navbar onSearch={(e) => setSearch(e.target.value)} searchValue={search} />
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Your Top Playlist</h1>
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
        <h1 className="my-5 font-bold text-2xl">Recently Played</h1>
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
    </>
  );
};

export default DisplayHome;
