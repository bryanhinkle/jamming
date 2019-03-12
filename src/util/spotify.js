const clientId = '84857fb8239247bcbd7e976523eff228';
const apiUrl = `https://api.spotify.com/`;
const authorizeUrl = 'https://accounts.spotify.com/authorize';
const searchUrl = `${apiUrl}v1/search?type=track&q=`;
const responseType = 'token';
const redirectUri = 'http://localhost:3000';
const state = Math.floor(Math.random() * 12345);
const scope = 'playlist-modify-public';

const tokenUrl = `${authorizeUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=${responseType}&state=${state}`;

const Spotify = {
  token: '',
  expires: '',
  userId: '',
  playlistId: '',
  getAccessToken() {
    if (this.token) {
      return [this.token, this.expires];
    }
    if (window.location.href.match(/access_token=([^&]*)/) && window.location.href.match(/expires_in=([^&]*)/)[1]) {
      this.token = window.location.href.match(/access_token=([^&]*)/)[1];
      this.expires = window.location.href.match(/expires_in=([^&]*)/)[1];
      window.setTimeout(function() { this.token = '' }, this.expires * 1000);
      window.history.pushState('Access Token', null, '/');

      return [this.token, this.expires];
    } else {
      window.location.href = tokenUrl;
    }
  },
  search(term, accessToken) {
    return fetch(`${searchUrl}${term}`, {
      
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
    }).then((response) => {
      return response.json();
    }).then((jsonResponse) => {
      console.log(jsonResponse);
      if(jsonResponse.tracks) {
        console.log(jsonResponse.tracks)
        return jsonResponse.tracks.items.map((track) => {
          return {
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            URI: track.uri,
            preview: track.external_urls.spotify
          }
        });
      } else {
        return [];
      }
    })
  },
  savePlaylist(playlistName, playlistTracks) {
    const headers = {
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    }
    if(!playlistName && !playlistTracks) { return; }
    
    //Get user id
    return fetch(`${apiUrl}/v1/me`, {
      headers: headers,
    }).then((response) => {
      return response.json();
    }).then((jsonResponse) => {
      return jsonResponse.id;
    }).then((id) => {
      this.userId = id;
      //Create playlist
      return fetch(`${apiUrl}v1/users/${this.userId}/playlists`, 
      {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({name: playlistName}),
      });
    }).then((response) => {
      return response.json();
    }).then((jsonResponse) => {
      return jsonResponse.id;
    }).then((id) => {
      //add playlist to Spotify
      const uris = playlistTracks.map(track => track.URI);
      this.playlistId = id;
      return fetch(`${apiUrl}v1/users/${this.userId}/playlists/${this.playlistId}/tracks`, {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({
          uris: uris
        }),
      });
    });
  },
};

export default Spotify;
