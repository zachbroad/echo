import React, {useState, useRef, useEffect, createContext, useContext} from 'react';
import './Player.scss';

const PlayerContext = createContext();

export const PlayerProvider = ({children}) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [song, setSong] = useState(null);
    const audioRef = useRef(null);

    useEffect(() => {
        if (song) {
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

    const getCurrentSongTitle = () => {
        return song ? song.name : "no song";
    }

    const getCurrentSongArtist = () => {
        return song ? song.name : "no song";
    }

    return (
        <div className="player-container fixed-bottom">
            <p><b>Now playing:</b> {getCurrentSongTitle()}</p>
            {song &&
                (
                    <audio ref={audioRef} src={song.preview_url ?? ""}/>
                )
            }

            {song &&
                <>
                    {isPlaying ? <button onClick={onPause}>Pause</button>
                        : <button onClick={onPlay}>Play</button>
                    }
                </>
            }
        </div>
    );
};

export default Player;
