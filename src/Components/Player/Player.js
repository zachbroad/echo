import React, {createContext, useContext, useEffect, useRef, useState} from 'react';
import styles from './player.module.scss';
import {SpotifyLogoBlack, SpotifyLogoWhite} from "../SpotifyLogo/SpotifyLogo";

const PlayerContext = createContext();


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
    <PlayerContext.Provider value={{song, isPlaying, onPlay, onPause, setPlayerSong, audioRef}}>
      <audio loop ref={audioRef} src={song?.preview_url ?? ""}/>
      {children}
      {/*<Player song={song} isPlaying={isPlaying} onPlay={onPlay} onPause={onPause} audioRef={audioRef}/>*/}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  return useContext(PlayerContext);
};

const Player = () => {
  const DEFAULT_VOLUME_LEVEL = 1.0;
  const [volume, setVolume] = useState(DEFAULT_VOLUME_LEVEL);
  const [expanded, setExpanded] = useState(false);
  const {song, isPlaying, onPlay, onPause, setPlayerSong, audioRef} = usePlayer();

  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  const getCurrentSongTitle = () => {
    if (song) {
      return <a className={styles.song} href={song.external_urls.spotify} target="_blank">{song.name}</a>;
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
      <div className={styles.container}>
        <div className={styles.player}>
          <div className={styles.playerLeft}>
            <div className={"d-flex flex-column"}>
              <img src={getAlbumImageSrc()} onClick={() => setExpanded(!expanded)}/>
            </div>
            <div className="d-flex flex-column align-content-center">
              <span className={styles.song}>
                <SpotifyLogoWhite/>
                {getCurrentSongTitle()}
              </span>
              <span className={styles.artist}>{getCurrentSongArtist()}</span>
              <span className={styles.album}>{getCurrentSongAlbum()}</span>
            </div>
          </div>

          <div className={styles.playerCenter}>
            {song &&
              <div className={styles.controls}>
                {song != null &&
                  <a target={"_blank"} href={song?.artists[0].external_urls.spotify} className={styles.spotifyButton}>
                    OPEN SPOTIFY
                  </a>
                }
                {isPlaying ? <Pause/> : <Play/>}
              </div>
            }
          </div>

          {/*<div style={{position: "absolute", left: 4, top: 2}}>*/}
          {/*</div>*/}

          <div className={styles.playerRight + ` text-center align-self-center`}>
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
      </div>
    </>
  );
};

export default Player;
