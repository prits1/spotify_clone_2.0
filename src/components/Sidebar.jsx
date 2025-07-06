import React, { useContext, useState } from 'react'
import {assets} from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { PlaylistContext } from '../context/PlaylistContext'

const Sidebar = () => {
  const nav = useNavigate();
  const { playlists, addPlaylist, removePlaylist } = useContext(PlaylistContext);
  const [showModal, setShowModal] = useState(false);
  const [playlistName, setPlaylistName] = useState("");

  const handleCreatePlaylist = (e) => {
    e.preventDefault();
    if (playlistName.trim()) {
      addPlaylist(playlistName.trim());
      setPlaylistName("");
      setShowModal(false);
    }
  };

  return (
    <div className='w-[25%] h-full p-2 flex-col gap-2 text-white hidden lg:flex'>
      <div className='bg-[#121212] h-[15%] rounded flex flex-col justify-around'>
        <div onClick={() => nav('/')} className='flex items-center gap-3 pl-8 cursor-pointer'>
          <img className='w-6' src={assets.home_icon} alt="" />
          <p className='font-bold'>Home</p>
        </div>
        <div
          className='flex items-center gap-3 pl-8 cursor-pointer'
          onClick={() => nav('/search')}
        >
          <img className='w-6' src={assets.search_icon} alt="" />
          <p className='font-bold'>Search</p>
        </div>
      </div>
      <div className='bg-[#121212] h-[85%] rounded'>
        <div className='p-4 flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <img className='w-8' src={assets.stack_icon} alt="" />
            <p className='font-semibold'>Your Library</p>
          </div>
          <div className='flex items-center gap-3'>
            <img className='w-5' src={assets.arrow_icon} alt="" />
            <img
              className='w-5 cursor-pointer'
              src={assets.plus_icon}
              alt="Create Playlist"
              title="Create Playlist"
              onClick={() => setShowModal(true)}
            />
          </div>
        </div>
        {/* Playlists List */}
        <div className='px-4'>
          {playlists.length === 0 && (
            <p className='text-gray-400 text-sm mt-2'>No playlists yet.</p>
          )}
          {playlists.map((pl) => (
            <div key={pl.id} className='flex items-center justify-between py-2 border-b border-[#242424]'>
              <span className='truncate cursor-pointer' onClick={() => nav(`/playlist/${pl.id}`)}>{pl.name}</span>
              <button className='text-red-400 ml-2' title='Delete Playlist' onClick={() => removePlaylist(pl.id)}>✕</button>
            </div>
          ))}
        </div>
        {/* Modal for creating playlist */}
        {showModal && (
          <div className='fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50'>
            <form onSubmit={handleCreatePlaylist} className='bg-[#242424] p-6 rounded shadow-lg flex flex-col gap-3 min-w-[300px]'>
              <h2 className='text-lg font-bold mb-2'>Create Playlist</h2>
              <input
                type='text'
                value={playlistName}
                onChange={e => setPlaylistName(e.target.value)}
                placeholder='Playlist name'
                className='px-3 py-2 rounded bg-[#181818] text-white border border-gray-600 focus:outline-none'
                autoFocus
              />
              <div className='flex gap-2 mt-2'>
                <button type='submit' className='bg-green-500 px-4 py-1 rounded text-black font-semibold'>Create</button>
                <button type='button' className='bg-gray-500 px-4 py-1 rounded text-white' onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        )}
        {/* ...existing code for create playlist and podcasts ... */}
        <div className='p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4'>
          <h1>Create your first Playlist</h1>
          <p className='font-light'>it's easy we will help you</p>
          <button className='px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4' onClick={() => setShowModal(true)}>Create playlist</button>
        </div>
        <div className='p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4 mt-4'>
          <h1>Find some Podcasts to Follow</h1>
          <p className='font-light'>we'll keep you update on new episodes</p>
          <button className='px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4'>Browse Podcasts</button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar