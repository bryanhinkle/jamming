const clientId = '84857fb8239247bcbd7e976523eff228';
const clientSecret = 'a469681c9d524132b0615214634e6b91';
const authorizeUrl = 'https://accounts.spotify.com/authorize';
const searchUrl = `https://api.spotify.com/v1/search?type=track&q=`
const responseType = 'token';
const redirectUri = 'http://localhost:3000/';
const state = Math.floor(Math.random() * 12345);
const scope = 'playlist-modify-public';

const tokenUrl = `${authorizeUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=${responseType}&state=${state}`;

const Spotify = {
  token: '',
  expires: '',
  getAccessToken() {
    if (this.token) {
      return;
    }
    if(this.token === '' && window.location.href.match(/access_token=([^&]*)/) === 'null') {
      window.location.href = tokenUrl;
    } else {
      this.token = window.location.href.match(/access_token=([^&]*)/)[1];
      this.expires = window.location.href.match(/expires_in=([^&]*)/)[1];
      window.setTimeout(() => this.token = '', Number(this.expires * 1000));
    }
  },
  search(term) {
    console.log(this.token);
    return fetch(`${searchUrl}${term}`, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    }).then(response => {
      console.log(response);
      return response.json();
    }).then(jsonResponse => {
      console.log(jsonResponse);
    })
  },
};

export default Spotify;
