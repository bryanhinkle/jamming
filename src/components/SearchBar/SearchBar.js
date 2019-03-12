import React, { Component } from 'react';
import './SearchBar.css';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleSubmit(e) {
    const { onSearch } = this.props;
    e.preventDefault();
    onSearch(this.state.searchTerm);
    document.getElementById('searchText').value = '';
    // this.refs.searchText.value = '';
  }

  render() {
    return (
      <div className="SearchBar">
        <form onSubmit={this.handleSubmit}>
          <input
            id="searchText"
            onChange={this.handleSearch}
            placeholder="Enter A Song Title"
          />
          <br />
          <button type="submit" onClick={this.handleSubmit}>
            SEARCH
          </button>
        </form>
      </div>
    );
  }
}

export default SearchBar;
