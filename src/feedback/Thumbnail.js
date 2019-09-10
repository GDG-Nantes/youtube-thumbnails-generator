import React from "react";

import { getScheduleInfo } from "../utils";
import Title from "./Title";
import "./Thumbnail.css";

const Thumbnail = ({ session }) => {
  const info = getScheduleInfo(session.key);
  return (
    <div id={`thumbnail-${session.key}`} className="thumbnail feedback">
      <Title title={session.title} {...info} />
    </div>
  );
};

export default Thumbnail;
