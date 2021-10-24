import React, { Component } from "react";

import site from "../data/site.json";
import "./Speaker.css";

class Speaker extends Component {
  render() {
    const { id } = this.props;
    const speaker = site.speakers.find(speaker => speaker.key === id);
    return (
      <div className="speaker">
        <div
          className="photo"
          style={{ backgroundImage: `url('${speaker.photoUrl}')` }}
          />
        {speaker.name}
      </div>
    );
  }
}

export default Speaker;
