import React, {useState, useRef, useEffect, createContext, useContext, useInsertionEffect} from 'react';
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

  const [volume, setVolume] = useState(0.1);

  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  const getCurrentSongTitle = () => {
    if (song) {
      return <a className="songname" href={song.external_urls.spotify} target="_blank">{song.name}</a>;
    }

    return <p className="songname">no song</p>;
  }

  const getCurrentSongAlbum = () => {
    if (song) {
      return <a href={song.album.external_urls.spotify} target="_blank">{song.album.name}</a>;
    }

    return "no album";
  }

  const getCurrentSongArtist = () => {
    if (song) {
      return <a href={song.artists[0].external_urls.spotify} target="_blank">{song.artists[0].name}</a>
      return song.artists[0].name;
    } else {
      return "no artist";
    }
  }

  const getAlbumImageSrc = () => {
    return song ? song.album.images[0].url : null;
  }

  return (
    <div className="player-container fixed-bottom">
      <audio loop ref={audioRef} src={song?.preview_url ?? ""}/>

      <div className="player-left">
        <img src={getAlbumImageSrc()}/>
        <div>
          {getCurrentSongTitle()}
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

      <div className="player-right text-center align-self-center">
        <div style={{width: "60%", marginLeft: "auto", marginRight: "1.0rem"}}>
          <small>volume</small>
          <input type="range"
                 className="form-range"
                 value={volume}
                 onChange={e => setVolume(e.target.value)}
                 min={0} max={1}
                 step={0.001}
          />
        </div>
      </div>

    </div>
  );
};

export default Player;
