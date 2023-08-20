import React, {useState, useRef, useEffect, createContext, useContext, useInsertionEffect} from 'react';
import './Player.scss';
import {toast} from 'react-toastify';

const PlayerContext = createContext();

function PlayerModal({song, show = true}) {
  if (show ==false) {
    return;
  }

  return (
    <div className="player-modal">
      <div className="player-modal__container">
        <h1>Modal</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis culpa cumque deleniti dolor, enim laborum
          molestias nam natus odio perferendis praesentium quae quisquam recusandae repellat rerum sed temporibus?
          Eaque,
          voluptates.
        </p>
      </div>
    </div>
  )
}

export const PlayerProvider = ({children}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [song, setSong] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    if (song) {
      var songName = song.name;
      var artist = song.artists[0].name;
      // toast(<div>Now playing <b>{songName}</b> by <b>{artist}</b>.</div>, {
      //   position: "bottom-left",
      //   autoClose: 5000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "light",
      // });
      setIsPlaying(true);
      audioRef.current.play();
    }
  }, [song]);

  const onPlay = () => {
    setIsPlaying(true);
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
  const DEFAULT_VOLUME_LEVEL = 1.0;
  const [volume, setVolume] = useState(DEFAULT_VOLUME_LEVEL);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  const getCurrentSongTitle = () => {
    if (song) {
      return <a className="song-title" href={song.external_urls.spotify} target="_blank">{song.name}</a>;
    }

    return "no song";
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

  function Play() {
    return (
      <svg onClick={onPlay} id="i-play" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32"
           fill="black"
           stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3">
        <path d="M10 2 L10 30 24 16 Z"/>
      </svg>
    )
  }

  function Pause() {
    return (
      <svg onClick={onPause} id="i-pause" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32"
           fill="none"
           stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3">
        <path d="M23 2 L23 30 M9 2 L9 30"/>
      </svg>
    )
  }


  return (
    <>
      <audio loop ref={audioRef} src={song?.preview_url ?? ""}/>
      {/*<PlayerModal show={false} />*/}
      {song &&
        <div className="player-container fixed-bottom">

          <div className="player-left">
            <img src={getAlbumImageSrc()} onClick={() => setExpanded(!expanded)}/>
            <div className="d-flex flex-column align-content-center">
          <span className="song-title">
            {getCurrentSongTitle()}
          </span>
              <span className="song-artist">{getCurrentSongArtist()}</span>
            </div>
          </div>


          <div className="player-center">
            {song &&
              <div className="player-controls">
                {isPlaying ? <Pause/> : <Play/>}
              </div>
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
      }
    </>
  );
};

export default Player;
