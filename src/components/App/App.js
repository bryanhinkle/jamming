import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import PlayList from '../PlayList/PlayList';
import SearchResults from '../SearchResults/SearchResults';
import Spotify from '../../util/Spotify';
import Storage from '../../util/Storage';

class App extends Component {
  constructor(props) {
    super(props);

    this.search = this.search.bind(this);
    this.handleTrack = this.handleTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);

    this.state = {
      searchResults: [],
      playlistName: 'Awesome Playlist',
      playlistTracks: [],
      accessToken: '',
      tokenExpire: '',
    };
  }
  componentDidMount() {
    const { accessToken, tokenExpire } = this.state;
    const getTime = new Date();
    const currentTime = Number([getTime.getHours(), getTime.getMinutes(), getTime.getSeconds()].join(''));
    let data;
    
    if(accessToken === '' || currentTime > tokenExpire ) {
      data = Spotify.getAccessToken();
    }
    
    this.setState({
      accessToken: data[0],
      tokenExpire: Storage.setExpire(data[1]).toString()
    });
    //ls.set('accessToken', accessToken);
    console.log(currentTime);
  }



  search(term) {
    const { accessToken } = this.state;
    
    Spotify.search(term, accessToken).then(tracks => {
      console.log(tracks);
      this.setState({
        searchResults: tracks,
      });
    });
  }

  handleTrack(action, track) {
    const { playlistTracks, searchResults } = this.state;
    if (action === 'add' && playlistTracks.every(listTrack => listTrack.id !== track.id)) {
      playlistTracks.push(track);
      this.setState({
        playlistTracks,
        searchResults: searchResults.filter(listTrack => listTrack.id !== track.id),
      });
    }
    if (action === 'remove' && searchResults.every(listTrack => listTrack.id !== track.id)) {
      searchResults.push(track);
      this.setState({
        searchResults,
        playlistTracks: playlistTracks.filter(listTrack => listTrack.id !== track.id),
      });
    }
  }

  updatePlaylistName(name) {
    this.setState({
      playlistName: name,
    });
  }

  savePlaylist() {
    const { playlistName, playlistTracks } = this.state;
    Spotify.savePlaylist(playlistName, playlistTracks).then(response => {
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: []
      })
    });
      
  }

  render() {
    const { searchResults, playlistTracks, playlistName, accessToken, tokenExpire} = this.state;
    const getTime = new Date();
    const currentTime = Number([getTime.getHours(), getTime.getMinutes(), getTime.getSeconds()].join(''));
    console.log(currentTime, tokenExpire);
    return (
      <div className="App">
        <SearchBar onSearch={this.search} />
        <div className="App-playlist">
          <SearchResults searchResults={searchResults} onAdd={this.handleTrack} />
          <PlayList
            tracks={playlistTracks}
            name={playlistName}
            onRemove={this.handleTrack}
            onNameChange={this.updatePlaylistName}
            onSave={this.savePlaylist}
          />
        </div>
      </div>
    );
  }
}

export default App;
