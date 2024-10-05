import React, { Component } from "react";
import "./App.css";

import sites from "./data/site.json";
import Youtube from "./youtube/Thumbnail";

class App extends Component {
  state = {
    currentId: undefined,
    currentType: undefined,
    currentIndex: undefined,
  };

  handleClick = (id, type, index) => () => {
    this.setState({ currentId: id, currentType: type, currentIndex: index });
  };

  render() {
    const { currentId, currentType, currentIndex } = this.state;

    const url = new URL(window.location.href);
    const id = url.searchParams.get("id");
    const type = url.searchParams.get("type");
    const index = url.searchParams.get("index");

    if (id || currentId) {
      const session = sites.sessions.find(
        session => session.key === id || (session.key && session.key === currentId)
      );

      if (session && (type === "youtube" || currentType === "youtube"))
        return <Youtube index={index || currentIndex} session={session} />;
    }

    return (
      <div className="App">
        <p>{sites.sessions.length} sessions</p>
        {sites.sessions
          .map((session, index) => (
            <div key={session.key}>
              <div>{session.title}</div>
              <button onClick={this.handleClick(session.key, "youtube", index)}>Youtube</button>
            </div>
          ))}
      </div>
    );
  }
}

export default App;
