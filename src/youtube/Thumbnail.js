import React from "react";

import Speaker from "./Speaker";
import "./Thumbnail.css";

function mapIndexToImage(index) {
  return ((index + 1) % 3) + 1;
}

const Thumbnail = ({ index, session }) => {
  return (
    <div id="thumbnail" className={`thumbnail-youtube thumbnail-youtube-${mapIndexToImage(index)}`}>
      <h1>{session.title}</h1>
      <div>
        <div className="speakers">
          {session.speakers.map(id => (
            <Speaker key={id} id={id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Thumbnail;
