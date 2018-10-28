import React from 'react';

import Speaker from './Speaker'
import './Thumbnail.css';

const Thumbnail = ({ session }) => {
  return (
    <div className={`thumbnail ${session.category}`}>
      <h1>{session.title}</h1>
      <div className="speakers">
        {session.speakers.map(id => <Speaker id={id} />)}
      </div>
    </div>
  );
};

export default Thumbnail;