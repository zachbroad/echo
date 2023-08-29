import {Card} from "react-bootstrap";
import React, {useState} from "react";

function TopArtistsDisplay({artists, defaultLimit = 5, className}) {
  function getLimit() {
    if (expanded) {
      return 20;
    } else {
      return defaultLimit;
    }
  }

  const [expanded, setExpanded] = useState(false);

  return (
    <Card className={className}>
      <Card.Header>
        <Card.Title>Top Artists</Card.Title>
      </Card.Header>
      <Card.Body>
        <div>
          <ol className="m-0 p-0 ms-3">
            {
              artists.slice(0, getLimit()).map(artist => (
                <li className="m-0 p-0 mb-1">
                  <a href={artist.external_urls.spotify} target="_blank" className="d-flex align-items-center">
                    <img src={artist.images[artist.images.length - 1].url} width={16} height={16}/>
                    <span className={"ms-2"}>{artist.name}</span>
                  </a>
                </li>
              ))
            }
          </ol>
          <button onClick={() => setExpanded(!expanded)} size={"sm"} className={"w-100 btn btn-sm mt-2 btn-outline-info"}>{expanded ? "show less" : "show more"}</button>
        </div>
      </Card.Body>
    </Card>
  )
}

export default TopArtistsDisplay;