import React, { Component } from "react";

import site from "../data/site.json";
import "./Speaker.css";

class Speaker extends Component {
  render() {
    const { id } = this.props;
    const speaker = site.speakers.find(speaker => speaker.key === id);
    return (
      <div className="speaker">
        {speaker.name}
        <div
          className="photo"
          style={{ backgroundImage: `url('https://devfest.gdgnantes.com${speaker.photoURL}')` }}
        />
      </div>
    );
  }
}

export default Speaker;
