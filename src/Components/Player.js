import React, {useState, useRef, useEffect, createContext, useContext} from 'react';
import './Player.scss';
import {toast} from 'react-toastify';

const PlayerContext = createContext();

export const PlayerProvider = ({children}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [song, setSong] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    if (song) {
      console.dir(song);
      var songName = song.name;
      var artist = song.artists[0].name;
      toast(<div>Now playing <b>{songName}</b> by <b>{artist}</b>.</div>, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setIsPlaying(true);
      setIsPlaying(true);
      audioRef.current.play();
    }
  }, [song]);

  const onPlay = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const onPause = () => {
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const setPlayerSong = (newSong) => {
    setSong(newSong);
    setIsPlaying(true);
  };

  return (
    <PlayerContext.Provider value={{isPlaying, onPlay, onPause, setPlayerSong}}>
      {children}
      <Player song={song} isPlaying={isPlaying} onPlay={onPlay} onPause={onPause} audioRef={audioRef}/>
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  return useContext(PlayerContext);
};

const Player = ({song, isPlaying, onPlay, onPause, audioRef}) => {

  const getCurrentSongTitle = () => {
    return song ? song.name : "no song";
  }

  const getCurrentSongArtist = () => {
    return song ? song.artists[0].name : "no artist";
  }

  const getAlbumImageSrc = () => {
    return song ? song.album.images[0].url : null;
  }

  return (
    <div className="player-container fixed-bottom">
      {song && (
        <audio ref={audioRef} src={song.preview_url ?? ""}/>
      )}

      <div className="player-left">
        <img src={getAlbumImageSrc()}/>
        <div>
          {/*<p><b>Now playing:</b> {getCurrentSongTitle()}</p>*/}
          <p><b>{getCurrentSongTitle()}</b></p>
          <p>{getCurrentSongArtist()}</p>
        </div>
      </div>


      <div className="player-center">
        {song &&
          <>
            {isPlaying ? <button onClick={onPause}>Pause</button>
              : <button onClick={onPlay}>Play</button>
            }
          </>
        }
      </div>

      <div className="player-right">
      </div>

    </div>
  );
};

export default Player;
