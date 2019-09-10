import React, { Component } from "react";

import "./Title.css";

class Title extends Component {
  render() {
    const { day, hour, room, title } = this.props;
    return (
      <div className="title">
        <div className="info">{`${room} - ${hour} - ${day}`}</div>
        <div>{title}</div>
      </div>
    );
  }
}

export default Title;
