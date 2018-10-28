import React, { Component } from 'react';
import speakers from './data/speakers';

import './Speaker.css'

class Speaker extends Component {
  render() {
    const { id } = this.props;
    const speaker = speakers[id];
    return (
      <div className="speaker">
        <div className="photo" style={{ backgroundImage: `url('https://devfest.gdgnantes.com/${speaker.photoUrl}')` }} />
        {speaker.name}
      </div>
    );
  }
}

export default Speaker;