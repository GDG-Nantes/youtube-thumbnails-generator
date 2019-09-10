import React, { Component } from "react";
import "./App.css";

import sites from "./data/site.json";
import Youtube from "./youtube/Thumbnail";
import Feedback from "./feedback/Thumbnail";

class App extends Component {
  state = {
    currentId: undefined,
    type: undefined
  };

  handleClick = (id, type) => () => {
    this.setState({ currentId: id, currentType: type });
  };

  render() {
    const { currentId, currentType } = this.state;

    const url = new URL(window.location.href);
    const id = url.searchParams.get("id");
    const type = url.searchParams.get("type");

    if (id || currentId) {
      const session = sites.sessions.find(
        session => session.key === id || session.key === currentId
      );

      if (session && (type === "youtube" || currentType === "youtube"))
        return <Youtube session={session} />;

      if (session && (type === "feedback" || currentType === "feedback"))
        return <Feedback session={session} />;
    }

    return (
      <div className="App">
        {sites.sessions
          .filter(
            session =>
              !session.tags.includes("lunch") &&
              !session.tags.includes("open") &&
              !session.tags.includes("party") &&
              !session.tags.includes("pause")
          )
          .map(session => (
            <div key={session.key}>
              <div>{session.title}</div>
              <button onClick={this.handleClick(session.key, "youtube")}>Youtube</button>
              <button onClick={this.handleClick(session.key, "feedback")}>Feedback</button>
            </div>
          ))}
      </div>
    );
  }
}

export default App;
