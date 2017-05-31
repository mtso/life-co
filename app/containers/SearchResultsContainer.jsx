import React, { Component } from 'react'
import SearchResultCell from '../components/SearchResultCell'

class SearchResultsContainer extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
      {this.props.searchResults.map((r) => <SearchResultCell {...r} key={r.id} />)}
      </div>
    )
  }
}

export default SearchResultsContainer
