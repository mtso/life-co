import React, { Component } from 'react'
import { searchBusinesses } from '../utils/apiSearch'
import handleError from '../utils/handleError'
import SearchResultsContainer from './SearchResultsContainer'
import request from 'superagent'
import Search from '../components/Search'

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
        <SearchResultsContainer searchResults={this.state.searchResults} />
      </Search>
    )
  }
}

export default SearchContainer
