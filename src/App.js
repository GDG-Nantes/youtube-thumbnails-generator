import React, { Component } from 'react';
import './App.css';

import sessions from './data/sessions';
import Thumbnail from './Thumbnail';

class App extends Component {
  state = {
    currentId: undefined,
  }

  handleClick = (id) => () => {
    this.setState({ currentId: id })
  }

  handleEscpace = (e) => {
    if(e.keyCode === 27) {
      this.setState({ currentId: undefined })
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

    // type: web, mobile, cloud, discovery, other

    if (currentId) {
      const session = sessions.find(session => session.id === currentId);
      return <Thumbnail session={session} />
    }

    return (
      <div className="App">
        {sessions
          .filter(session => session.type !== '💻 Codelab')
          .map(session => (
            <div onClick={this.handleClick(session.id)}>
              <div>{session.title}</div>
            </div>
          )
        )}
      </div>
    );
  }
}

export default App;
