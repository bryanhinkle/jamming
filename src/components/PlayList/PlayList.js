import React from 'react';
import './PlayList.css';
import TrackList from '../TrackList/TrackList';

class PlayList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { tracks, name, onRemove } = this.props;
    return (
      <div className="Playlist">
        <input defaultValue="New Playlist" />
        <TrackList tracks={tracks} onRemove={onRemove} isRemoval />
        <a className="Playlist-save">SAVE TO SPOTIFY</a>
      </div>
    );
  }
}

export default PlayList;
