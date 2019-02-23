import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import PlayList from '../PlayList/PlayList';
// import TrackList from '../TrackList/TrackList';
import SearchResults from '../SearchResults/SearchResults';

class App extends Component {
  constructor(props) {
    super(props);

    this.searchSpotify = this.searchSpotify.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);

    this.state = {
      searchResults: [
        {
          id: 1,
          name: 'name1',
          artist: 'artist1',
          album: 'album1',
        },
        {
          id: 2,
          name: 'name2',
          artist: 'artist2',
          album: 'album2',
        },
        {
          id: 3,
          name: 'name3',
          artist: 'artist3',
          album: 'album3',
        },
        {
          id: 4,
          name: 'name4',
          artist: 'artist4',
          album: 'album4',
        },
      ],
      playlistName: 'Awesome Playlist',
      playlistTracks: [
        {
          id: 7,
          name: 'song1',
          artist: 'artist1',
          album: 'album1',
        },
        {
          id: 8,
          name: 'song2',
          artist: 'artist2',
          album: 'album2',
        },
        {
          id: 9,
          name: 'song3',
          artist: 'artist3',
          album: 'album3',
        },
        {
          id: 10,
          name: 'song4',
          artist: 'artist4',
          album: 'album4',
        },
      ],
    };
  }

  searchSpotify(song) {
    console.log(song);
  }

  addTrack(track) {
    const { playlistTracks, searchResults } = this.state;
    let newList;
    if (playlistTracks.every(listTrack => listTrack.id !== track.id)) {
      playlistTracks.push(track);
      newList = searchResults.filter(listTrack => listTrack.id !== track.id);
    }
    this.setState({
      playlistTracks,
      searchResults: newList,
    });
    console.log(playlistTracks);
  }

  removeTrack(track) {
    const { searchResults, playlistTracks } = this.state;
    let newList;
    if (searchResults.every(listTrack => listTrack.id !== track.id)) {
      searchResults.push(track);
      newList = playlistTracks.filter(listTrack => listTrack.id !== track.id);
    }
    this.setState({
      playlistTracks: newList,
      searchResults,
    });
    console.log(playlistTracks);
  }

  render() {
    const { searchResults, playlistTracks, playlistName } = this.state;
    return (
      <div className="App">
        <SearchBar searchSpotify={this.searchSpotify} />
        <div className="App-playlist">
          <SearchResults searchResults={searchResults} onAdd={this.addTrack} />
          <PlayList
            tracks={playlistTracks}
            name={playlistName}
            onRemove={this.removeTrack}
          />
          {console.log(playlistTracks)}
        </div>
      </div>
    );
  }
}

export default App;
