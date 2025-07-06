import React, { useContext } from "react";
import { assets, songsData } from "../assets/assets";
import { PlayerContext } from "../context/PlayerContext";

const Player = () => {
  const { seekBar, seekBg, play, pause, playStatus, track, time, after, before,seekBgClick, audioRef } =
    useContext(PlayerContext);

  // Local state for volume (0 to 1)
  const [volume, setVolume] = React.useState(1);

  // Update audio element volume when slider changes
  React.useEffect(() => {
    if (audioRef && audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume, audioRef]);

  const handleVolumeChange = (e) => {
    setVolume(Number(e.target.value));
  };

  const handleVolumeUp = () => {
    setVolume((v) => Math.min(1, v + 0.1));
  };
  const handleVolumeDown = () => {
    setVolume((v) => Math.max(0, v - 0.1));
  };

  return (
    <div className="h-[10%] bg-black flex justify-between items-center text-white px-4">
      <div className="hidden lg:flex items-center gap-4">
        <img className="w-12" src={track.image} alt="" />
        <div>
          <p>{track.name}</p>
          <p>{track.desc.slice(0, 16) + "..."}</p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-1 m-auto">
        <div className="flex gap-4">
          <img
            className="w-4 cursor-pointer"
            src={assets.shuffle_icon}
            alt=""
          />
          <img onClick={before} className="w-4 cursor-pointer" src={assets.prev_icon} alt="" />
          {playStatus ? (
            <img
              onClick={pause}
              className="w-4 cursor-pointer"
              src={assets.pause_icon}
              alt=""
            />
          ) : (
            <img
              onClick={play}
              className="w-4 cursor-pointer"
              src={assets.play_icon}
              alt=""
            />
          )}

          <img onClick={after} className="w-4 cursor-pointer" src={assets.next_icon} alt="" />
          <img className="w-4 cursor-pointer" src={assets.loop_icon} alt="" />
        </div>
        <div className="flex items-center gap-5">
          <p>{time.currentTime.minute}:{time.currentTime.second}</p>
          <div
            ref={seekBg} onClick={seekBgClick}
            className="w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer"
          >
            <hr
              ref={seekBar}
              className="h-1 border-none w-0 bg-green-800 rounded-full"
            />
          </div>
          <p>{time.totalTime.minute}:{time.totalTime.second}</p>
        </div>
      </div>
      <div className="hidden lg:flex items-center gap-2 opacity-75">
        <img className="w-4" src={assets.play_icon} alt="" />
        <img className="w-4" src={assets.mic_icon} alt="" />
        <img className="w-4" src={assets.queue_icon} alt="" />
        <img className="w-4" src={assets.speaker_icon} alt="" />
        {/* Volume controls */}
        <button onClick={handleVolumeDown} className="w-6 h-6 flex items-center justify-center text-lg font-bold bg-gray-700 rounded-full mr-1" title="Decrease Volume">-</button>
        <img className="w-4" src={assets.volume_icon} alt="" />
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="w-20 mx-1 accent-green-500"
          title="Volume"
        />
        <button onClick={handleVolumeUp} className="w-6 h-6 flex items-center justify-center text-lg font-bold bg-gray-700 rounded-full ml-1" title="Increase Volume">+</button>
        <img className="w-4" src={assets.mini_player_icon} alt="" />
        <img className="w-4" src={assets.zoom_icon} alt="" />
      </div>
    </div>
  );
};

export default Player;
