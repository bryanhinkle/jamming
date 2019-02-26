import React, { Component } from 'react';
import './SearchBar.css';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleSearch = this.handleSearch.bind(this);

    this.state = {
      searchTerm: '',
    };
  }

  handleSearch(e) {
    this.setState({
      searchTerm: e.target.value,
    });
  }

  handleClick(e) {
    const { onSearch } = this.props;
    onSearch(this.state.searchTerm);
    e.preventDefault();
  }

  render() {
    return (
      <div className="SearchBar">
        <input onChange={this.handleSearch} placeholder="Enter A Song Title" />
        <a role="button" onClick={this.handleClick}>
          SEARCH
        </a>
      </div>
    );
  }
}

export default SearchBar;
