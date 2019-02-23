import React, { Component } from 'react';
import './SearchBar.css';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleSong = this.handleSong.bind(this);

    this.state = {
      searchTerm: '',
    };
  }

  handleSong(e) {
    this.setState({
      searchTerm: e.target.value,
    });
    // console.log(this.state.song);
  }

  handleClick(e) {
    const { searchSpotify } = this.props;
    searchSpotify(this.state.searchTerm);
    e.preventDefault();
  }

  render() {
    return (
      <div className="SearchBar">
        <input onChange={this.handleSong} placeholder="Enter A Song Title" />
        <a role="button" onClick={this.handleClick}>
          SEARCH
        </a>
      </div>
    );
  }
}

export default SearchBar;
