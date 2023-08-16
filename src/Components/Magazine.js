import {useEffect, useState} from "react";
import {Carousel} from "react-bootstrap";
import he from 'he';

function Magazine({magazineData}) {

  return (
    <Carousel variant="dark" data-bs-theme={"dark"}>
      {
        magazineData.filter((i) => i != "").map(line => {
          return (
            <Carousel.Item text={"test"} style={{height: "350px"}}>
              {
                <Carousel.Caption>
                  <p dangerouslySetInnerHTML={{__html: he.decode(line)}}></p>
                </Carousel.Caption>
              }
            </Carousel.Item>
          )
        })
      }
    </Carousel>
  )

}

export default Magazine;