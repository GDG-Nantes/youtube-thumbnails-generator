import React from "react";

import Speaker from "./Speaker";
import "./Thumbnail.css";
import { getCategory } from "../utils";

const Thumbnail = ({ session }) => {
  const classname = getCategory(session.tags[0]);
  return (
    <div id={`thumbnail-${session.key}`} className={`thumbnail ${classname}`}>
      <div className="info-youtube">
        <h1>{session.title}</h1>
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
