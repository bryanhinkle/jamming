import React from 'react';
import './PlayList.css';
import TrackList from '../TrackList/TrackList';

class PlayList extends React.Component {
  constructor(props) {
    super(props);

    this.handleNameChange = this.handleNameChange.bind(this);
  }
  handleNameChange(e) {
    this.props.onNameChange(e.target.value);
    e.preventDefault();
  }

  render() {
    const { tracks, name, onRemove, onSave } = this.props;
    return (
      <div className="Playlist">
        <input value={name} onChange={this.handleNameChange} />
        <TrackList tracks={tracks} onRemove={onRemove} isRemoval={true}/>
        <a className="Playlist-save" onClick={onSave}>SAVE TO SPOTIFY</a>
      </div>
    );
  }
}

export default PlayList;
