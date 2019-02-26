import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import PlayList from '../PlayList/PlayList';
import SearchResults from '../SearchResults/SearchResults';
import Spotify from '../../util/Spotify';

class App extends Component {
  constructor(props) {
    super(props);

    this.search = this.search.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);

    this.state = {
      searchResults: [
        {
          id: 1,
          name: 'name1',
          artist: 'artist1',
          album: 'album1',
          uri: 'https://name1',
        },
        {
          id: 2,
          name: 'name2',
          artist: 'artist2',
          album: 'album2',
          uri: 'https://name2',
        },
        {
          id: 3,
          name: 'name3',
          artist: 'artist3',
          album: 'album3',
          uri: 'https://name3',
        },
        {
          id: 4,
          name: 'name4',
          artist: 'artist4',
          album: 'album4',
          uri: 'https://name4',
        },
      ],
      playlistName: 'Awesome Playlist',
      playlistTracks: [
        {
          id: 7,
          name: 'song1',
          artist: 'artist1',
          album: 'album1',
          uri: 'https://song1',
        },
        {
          id: 8,
          name: 'song2',
          artist: 'artist2',
          album: 'album2',
          uri: 'https://song2',
        },
        {
          id: 9,
          name: 'song3',
          artist: 'artist3',
          album: 'album3',
          uri: 'https://song3',
        },
        {
          id: 10,
          name: 'song4',
          artist: 'artist4',
          album: 'album4',
          uri: 'https://song4',
        },
      ],
    };
  }

  search(term) {
    Spotify.getAccessToken();
    // Spotify.search(term);
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

  updatePlaylistName(name) {
    this.setState({
      playlistName: name,
    });
  }

  savePlaylist() {
    const { playlistTracks } = this.state;
    const trackURIs = playlistTracks.map(track => track.uri);
    console.log(trackURIs);
  }

  render() {
    const { searchResults, playlistTracks, playlistName } = this.state;
    return (
      <div className="App">
        <SearchBar onSearch={this.search} />
        <div className="App-playlist">
          <SearchResults searchResults={searchResults} onAdd={this.addTrack} />
          <PlayList
            tracks={playlistTracks}
            name={playlistName}
            onRemove={this.removeTrack}
            onNameChange={this.updatePlaylistName}
            onSave={this.savePlaylist}
          />
          {console.log(playlistTracks)}
          {console.log(this.state.playlistName)}
        </div>
      </div>
    );
  }
}

export default App;
