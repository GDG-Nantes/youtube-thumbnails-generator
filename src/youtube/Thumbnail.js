import React from "react";

import Speaker from "./Speaker";
import "./Thumbnail.css";

const Thumbnail = ({ session }) => {
  return (
    <div id={`thumbnail`} className={`thumbnail-youtube`}>
      <h1>{session.title}</h1>
      <div className="speakers">
        {session.speakers.map(id => (
          <Speaker key={id} id={id} />
        ))}
      </div>
    </div>
  );
};

export default Thumbnail;
