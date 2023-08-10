import React, {useEffect, useState} from "react";
import AlbumArtworkNode from "./AlbumArtworkNode";
import './TrackGrid.scss';


export default function TrackGrid({tracks}) {
    return (
        <div>
            {tracks ? (
                <div className="track-grid" style={{}}>
                    {tracks.map((track, index) => {
                        if (track.track != null) {
                            return (
                                <AlbumArtworkNode track={track.track}/>
                            );
                        } else {
                            return (
                                <AlbumArtworkNode track={track}/>
                            );
                        }
                    })}
                </div>
            ) : (
                <p>Loading tracks...</p>
            )}
        </div>

    )
}