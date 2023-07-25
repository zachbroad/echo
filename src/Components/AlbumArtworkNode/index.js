import {useEffect} from "react";

export default function AlbumArtworkNode({track}) {
    const albumArtwork = track.album.images[0].url;

    useEffect(() => {
        console.dir(track);
    });

    return (
        <img
            src={albumArtwork}
            height={125}
            width={125}
            alt={track.name}
        />
    )
}