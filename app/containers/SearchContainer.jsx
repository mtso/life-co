import React, { Component } from 'react'
import { searchBusinesses } from '../utils/apiSearch'
import handleError from '../utils/handleError'
import SearchResultsContainer from './SearchResultsContainer'
import request from 'superagent'
import Search from '../components/Search'
import initialState from '../store/initialState'

class SearchContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchTerm: initialState.state.searchTerm || '',
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
    if (this.state.isLoading || this.state.searchTerm === '') {
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
    if (typeof window !== 'undefined' && window.__PRELOADED_STATE__) {
      const preloadedState = window.__PRELOADED_STATE__
      this.setState({
        searchTerm: preloadedState.searchTerm,
      })
    }
  }
  render() {
    return (
      <Search
        onSubmit={this.onSubmit}
        onChange={this.onChange}
        searchTerm={this.state.searchTerm}
        searchboxRef={(node) => this.searchbox = node}
        searchResults={this.state.searchResults}
        isLoading={this.state.isLoading}
      >
        <SearchResultsContainer
          searchResults={this.state.searchResults}
          searchTerm={this.state.searchTerm}
        />
      </Search>
    )
  }
}

export default SearchContainer
