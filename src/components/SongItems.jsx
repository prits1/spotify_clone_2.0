import React, { useContext } from 'react'
import { PlayerContext } from '../context/PlayerContext'
import { PlaylistContext } from '../context/PlaylistContext'


const SongItems = (props) => {
  const { playWithId } = useContext(PlayerContext);
  const { playlists, addSongToPlaylist } = useContext(PlaylistContext) || {};
  const [showDropdown, setShowDropdown] = React.useState(false);

  const handleAddToPlaylist = (playlistId, e) => {
    e.stopPropagation();
    addSongToPlaylist(playlistId, props);
    setShowDropdown(false);
  };

  return (
    <div className='relative max-w-[200px] min-h-[100px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]' onClick={() => playWithId(props.id)}>
      <img className='rounded min-w-[155px] max-h-[189px]' src={props.image} alt="" />
      <p className='font-bold mt-2 mb-1'>{props.name}</p>
      <p className='text-slate-200 text-sm'>{props.desc}</p>
      {playlists && playlists.length > 0 && (
        <div className='absolute top-2 right-2'>
          <button
            className='bg-green-600 text-white px-2 py-1 rounded text-xs hover:bg-green-800'
            onClick={e => { e.stopPropagation(); setShowDropdown((v) => !v); }}
          >
            + Playlist
          </button>
          {showDropdown && (
            <div className='absolute right-0 mt-1 bg-[#181818] border border-gray-700 rounded shadow-lg z-10 min-w-[120px]'>
              {playlists.map(pl => (
                <div
                  key={pl.id}
                  className='px-3 py-2 hover:bg-[#242424] cursor-pointer text-white text-sm'
                  onClick={e => handleAddToPlaylist(pl.id, e)}
                >
                  {pl.name}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SongItems