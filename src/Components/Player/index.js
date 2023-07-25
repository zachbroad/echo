import React, {useState, useRef, useEffect, createContext, useContext} from 'react';

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
    };

    return (
        <PlayerContext.Provider value={{isPlaying, onPlay, onPause, setPlayerSong}}>
            {children}
            {song && <Player song={song} isPlaying={isPlaying} onPlay={onPlay} onPause={onPause} audioRef={audioRef} />}
        </PlayerContext.Provider>
    );
};

export const usePlayer = () => {
    return useContext(PlayerContext);
};

const Player = ({song, isPlaying, onPlay, onPause, audioRef}) => {
    return (
        <div>
            <audio ref={audioRef} src={song} />
            {isPlaying
                ? <button onClick={onPause}>Pause</button>
                : <button onClick={onPlay}>Play</button>
            }
        </div>
    );
};

export default Player;
