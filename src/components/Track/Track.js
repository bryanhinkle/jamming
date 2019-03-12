import React from 'react';
import './Track.css';

class Track extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isRemoval: props.isRemoval,
    };

    this.handleTrack = this.handleTrack.bind(this);
  }

  handleTrack() {
    const { track, onAdd, onRemove, isRemoval } = this.props;

    if (isRemoval) {
      onRemove('remove', track);
    } else {
      onAdd('add', track);
    }
  }

  renderAction() {
    const { isRemoval } = this.state;
    return (
      <a role="button" className="Track-action" onClick={this.handleTrack}>
        {isRemoval ? '-' : '+'}
      </a>
    );
  }
  //

  render() {
    const { track } = this.props;
    return (
      <div className="Track">
        <div className="Track-information">
        <audio controls src={track.preview} preload="true" type="audio/mpeg"></audio>
          <h3>{track.name}</h3>
          <p>{`${track.artist} | ${track.album}`}</p>
        </div>
        {this.renderAction()}
      </div>
    );
  }
}

export default Track;
