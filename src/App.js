import React, { Component } from 'react';
import './App.css';

import sessions from './data/sessions';
import Thumbnail from './Thumbnail';

class App extends Component {
  state = {
    currentId: undefined,
  }

  handleClick = (id) => () => {
    this.setState({ currentId: id });
  }

  handleEscpace = (e) => {
    if(e.keyCode === 27) {
      window.location = window.location.origin;
      this.setState({ currentId: undefined });
    }
  }

  componentDidMount(){
    document.addEventListener("keydown", this.handleEscpace, false);
  }

  componentWillUnmount(){
    document.removeEventListener("keydown", this.handleEscpace, false);
  }

  render() {
    const { currentId } = this.state;
    const sessionsArray = Object.values(sessions);

    const url = new URL(window.location.href);
    const id = url.searchParams.get("id");

    if (id || currentId) {
      const session = sessions[id || currentId];
      if (session) return <Thumbnail session={session} />
    }

    return (
      <div className="App">
        {sessionsArray
          .filter(session => session.type !== '💻 Codelab')
          .map(session => (
            <div key={session.id} onClick={this.handleClick(session.id)}>
              <div>{session.title}</div>
            </div>
          )
        )}
      </div>
    );
  }
}

export default App;
