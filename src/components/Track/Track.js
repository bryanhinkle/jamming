import React from 'react';
import './Track.css';

class Track extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isRemoval: props.isRemoval,
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  renderAction() {
    const { isRemoval } = this.state;

    if (isRemoval) {
      return (
        <a role="button" className="Track-action" onClick={this.removeTrack}>
          -
        </a>
      );
    }
    return (
      <a role="button" className="Track-action" onClick={this.addTrack}>
        +
      </a>
    );
  }

  addTrack() {
    const { track, onAdd } = this.props;
    if (this.state.isRemoval) {
      this.setState({
        isRemoval: false,
      });
    } else {
      this.setState({
        isRemoval: true,
      });
    }
    onAdd(track);
  }

  removeTrack() {
    const { track, onRemove } = this.props;
    onRemove(track);
    if (this.state.isRemoval) {
      this.setState({
        isRemoval: false,
      });
    } else {
      this.setState({
        isRemoval: true,
      });
    }
  }

  render() {
    const { track } = this.props;
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{track.name}</h3>
          <p>{`${track.artist} | ${track.album}`}</p>
        </div>
        {this.renderAction()}
      </div>
    );
  }
}

export default Track;
