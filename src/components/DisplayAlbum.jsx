import React, { useContext } from 'react'
import Navbar from './Navbar'
import { useParams } from 'react-router-dom'
import { albumsData, assets, songsData } from '../assets/assets';
import { PlayerContext } from '../context/PlayerContext';
import { PlaylistContext } from '../context/PlaylistContext';

const DisplayAlbum = () => {

   const {id} = useParams();
   const albumDatalocal = albumsData[id];
   const { playWithId } = useContext(PlayerContext);
   const { playlists, addSongToPlaylist } = useContext(PlaylistContext) || {};
   const [dropdownIndex, setDropdownIndex] = React.useState(null);
   
  return (
    <>
    <Navbar/>
    <div className='mt-10 flex gap-8 flex-col md:flex-row md:items-end'>
        <img className='w-48 rounded' src={albumDatalocal.image} alt="" />
        <div className='flex flex-col'>
            <p>Playlist</p>
            <h2 className='text-4xl font-bold mb-4 md:text-6xl'>
                {albumDatalocal.name}
            </h2>
            <h4>{albumDatalocal.desc}</h4>
            <p className='mt-2'>
                <img className='inline-block w-5' src={assets.spotify_logo} alt="" />
                <b> Spotify Clone</b> 33,62,251 likes | 
                <b> 50 Songs </b>| about 2hr 35 min
            </p>
        </div>
    </div>
    <div className='grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]'>
        <p><b className='mr-4'>#</b>Title</p>
        <p>Album</p>
        <p className='hidden md:block'>Date Added</p>
        <img className='m-auto w-4' src={assets.clock_icon} alt="" />
    </div>
    <hr />
    {
        songsData.map((item, index) => (
            <div
                key={index}
                className='grid grid-cols-3 sm:grid-cols-4 gap-3 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer relative'
                onClick={() => playWithId(item.id)}
            >
                <p className='tetx-white'>
                    <b className='mr-4 text-[#a7a7a7]'>{index + 1}</b>
                    <img className='inline w-10 mr-5' src={item.image} alt="" />
                    {item.name}
                </p>
                <p className='text-[15px]'>{albumDatalocal.name}</p>
                <p className='text-[15px]'>3 days ago</p>
                <p className='text-[15px] text-center flex items-center justify-center'>
                    {item.duration}
                </p>
                {/* Plus button always visible for testing */}
                <div className='absolute right-2 top-1 flex items-center'>
                  {playlists && playlists.length > 0 && (
                    <div className='relative'>
                      <button
                        className='bg-black bg-opacity-40 text-white px-2 py-1 rounded text-xs hover:bg-opacity-70 border border-gray-600 z-20 transition-colors duration-150'
                        onClick={e => { e.stopPropagation(); setDropdownIndex(index === dropdownIndex ? null : index); }}
                      >
                        +
                      </button>
                      {dropdownIndex === index && (
                        <div className='absolute right-0 mt-1 bg-[#181818] border border-gray-700 rounded shadow-lg z-30 min-w-[120px]'>
                          {playlists.map(pl => (
                            <div
                              key={pl.id}
                              className='px-3 py-2 hover:bg-[#242424] cursor-pointer text-white text-sm'
                              onClick={e => { e.stopPropagation(); addSongToPlaylist(pl.id, item); setDropdownIndex(null); }}
                            >
                              {pl.name}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
            </div>
        ))
    }
    </>
  )
}

export default DisplayAlbum