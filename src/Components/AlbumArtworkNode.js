import {useEffect} from "react";
import {Tooltip as ReactTooltip} from "react-tooltip";
import {usePlayer} from "./Player";
import './AlbumArtworkNode.scss';

/*
    "album": {
        "album_type": "single",
            "artists": [
            {
                "external_urls": {
                    "spotify": "https://open.spotify.com/artist/3xJ0g1VQ4uwT7memVHGG4g"
                },
                "href": "https://api.spotify.com/v1/artists/3xJ0g1VQ4uwT7memVHGG4g",
                "id": "3xJ0g1VQ4uwT7memVHGG4g",
                "name": "11vx",
                "type": "artist",
                "uri": "spotify:artist:3xJ0g1VQ4uwT7memVHGG4g"
            }
        ],
            "external_urls": {
            "spotify": "https://open.spotify.com/album/6rDChqFP2pJ3or3XySBheF"
        },
        "href": "https://api.spotify.com/v1/albums/6rDChqFP2pJ3or3XySBheF",
            "id": "6rDChqFP2pJ3or3XySBheF",
            "images": [
            {
                "height": 640,
                "url": "https://i.scdn.co/image/ab67616d0000b27388d0db3b4e19cf534e83fdd4",
                "width": 640
            },
            {
                "height": 300,
                "url": "https://i.scdn.co/image/ab67616d00001e0288d0db3b4e19cf534e83fdd4",
                "width": 300
            },
            {
                "height": 64,
                "url": "https://i.scdn.co/image/ab67616d0000485188d0db3b4e19cf534e83fdd4",
                "width": 64
            }
        ],
            "name": "butterfly-s",
            "release_date": "2022-02-18",
            "release_date_precision": "day",
            "total_tracks": 1,
            "type": "album",
            "uri": "spotify:album:6rDChqFP2pJ3or3XySBheF"
    },
    "artists": [
        {
            "external_urls": {
                "spotify": "https://open.spotify.com/artist/3xJ0g1VQ4uwT7memVHGG4g"
            },
            "href": "https://api.spotify.com/v1/artists/3xJ0g1VQ4uwT7memVHGG4g",
            "id": "3xJ0g1VQ4uwT7memVHGG4g",
            "name": "11vx",
            "type": "artist",
            "uri": "spotify:artist:3xJ0g1VQ4uwT7memVHGG4g"
        }
    ],
        "disc_number": 1,
        "duration_ms": 93606,
        "explicit": false,
        "external_ids": {
        "isrc": "SE5BU2236769"
    },
    "external_urls": {
        "spotify": "https://open.spotify.com/track/6rL5acsWfNx1mM3SlfPstu"
    },
    "href": "https://api.spotify.com/v1/tracks/6rL5acsWfNx1mM3SlfPstu",
    "id": "6rL5acsWfNx1mM3SlfPstu",
    "is_local": false,
    "name": "butterfly-s",
    "popularity": 47,
    "preview_url": "https://p.scdn.co/mp3-preview/1bc90355399d38d92190d96a8d4f3f1d19c94646?cid=4660ab61c8c74db9aa4ddd51d70ba784",
    "track_number": 1,
    "type": "track",
    "uri": "spotify:track:6rL5acsWfNx1mM3SlfPstu"
 *
 */
export default function AlbumArtworkNode({track}) {
    const albumArtwork = track.album.images[0].url;
    const {isPlaying, onPlay, onPause, setPlayerSong} = usePlayer();

    function play() {
        setPlayerSong(track);
    }

    return (
        <>
            <div className="album-node" onClick={() => play()} style={{cursor: "pointer"}}>
                    <img
                        src={albumArtwork}
                        // height={150}
                        // width={150}
                        alt={track.name}
                    />
                    <ReactTooltip
                        anchorId={track.id}
                        data-tooltip-id={track.id}
                        place={"bottom"}
                        clickable
                        style={{"--rt-opacity": "1"}}
                    >
                        <b>{track.name}</b> by <i>{track.artists[0].name}</i>
                    </ReactTooltip>
            </div>
        </>
    )
}