import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { AiFillHeart } from "react-icons/ai";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { playingTrackState, playState } from "../atoms/playerAtom";
import { ImHeadphones } from "react-icons/im";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";

function Song({ track, chooseTrack , spotifyApi}) {
  const [hasLiked, setHasLiked] = useState(false);
  const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  const playSong = () => {
      setCurrentTrackId(track.id)
      setIsPlaying(true)
      spotifyApi.play({
          uris: [track.uri],
      })
  }



  return (
    <div className="flex items-center justify-between space-x-20 cursor-default hover:bg-white/10 py-2 px-4 rounded-lg group transition ease-out" onClick={playSong}>
      <div className="flex items-center">
        <img
          src={track.album.images[0].url}
          alt=""
          className="rounded-xl h-12 w-12 object-cover mr-3"
        />
        <div>
          <h4 className="text-white text-sm font-semibold truncate w-[450px]">
            {track.name}
          </h4>
          <p className="text-[rgb(179,179,179)] text-[13px] font-semibold group-hover:text-white">
            {track.artists[0].name}
          </p>
        </div>
      </div>

      <div className="md:ml-auto flex items-center space-x-2.5">
        <div className="text-white flex space-x-1 text-sm font-semibold">
          <ImHeadphones className="text-lg" />
          <h4 className="font-sans">{track.popularity}</h4>
        </div>
        <div className="flex items-center rounded-full border-2 border-[#262626] w-[85px] h-10 relative cursor-pointer group-hover:border-white/40">
          <AiFillHeart
            className={`text-xl ml-3 icon ${
              hasLiked ? "text-[#1ED760]" : "text-[#868686]"
            }`}
            onClick={() => setHasLiked(!hasLiked)}
          />
          
        </div>
      </div>
    </div>
  );
}

export default Song;