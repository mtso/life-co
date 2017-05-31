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
      isLoading: false,
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
    if (this.state.isLoading) {
      return
    }
    this.setState({
      isLoading: true,
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
            isLoading: false,
          })
        })
        .catch(handleError)
    })
  }
  componentDidMount() {
    this.searchbox.focus()
  }
  render() {
    return (
      <div>
        <h1>Life Co.</h1>
        <form onSubmit={this.onSubmit}>
          <input
            type='search'
            placeholder='Location'
            value={this.state.searchTerm}
            onChange={this.onChange}
            ref={(node) => this.searchbox = node}
          />
          <button type='submit'>
            Search
          </button>
        </form>
        <p>Search Results {
          this.state.isLoading && '(Loading...)' ||
          this.state.searchResults && `(${this.state.searchResults.length})`
        }</p>
        <SearchResultsContainer searchResults={this.state.searchResults} />
      </div>
    )
  }
}

export default SearchContainer
