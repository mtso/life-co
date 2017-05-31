import React, { Component } from 'react'
import { searchBusinesses } from '../utils/apiSearch'
import handleError from '../utils/handleError'
import SearchResultsContainer from './SearchResultsContainer'
import request from 'superagent'

class SearchContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchTerm: '',
      isSubmitting: false,
      searchResults: [],
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }
  onChange(e) {
    e.preventDefault()
    this.setState({
      searchTerm: e.target.value,
    })
  }
  onSubmit(e) {
    e.preventDefault()
    if (this.state.isSubmitting) {
      return
    }
    this.setState({
      isSubmitting: true,
    }, () => {
      searchBusinesses(this.state.searchTerm)
        .then((resp) => {
          const searchResults = resp.body.businesses.map((b) => {
            return {
              name: b.name,
              rating: b.rating,
              image_url: b.image_url,
              id: b.id,
              url: b.url,
            }
          })
          this.setState({
            searchResults,
            isSubmitting: false,
          })
        })
        .catch(handleError)
    })
  }
  render() {
    return (
      <div>
        <h1>Life Co.</h1>
          <input
            type='search'
            placeholder='Location'
            value={this.state.searchTerm}
            onChange={this.onChange}
          />
          <button onClick={this.onSubmit}>
            Search
          </button>
        <p>Search Results</p>
        <SearchResultsContainer searchResults={this.state.searchResults} />
      </div>
    )
  }
}

export default SearchContainer
