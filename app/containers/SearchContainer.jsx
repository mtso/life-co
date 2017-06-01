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
    this.onCheckin = this.onCheckin.bind(this)
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
          this.setState({
            searchResults: resp.body,
            isLoading: false,
          })
        })
        .catch(handleError)
    })
  }
  onCheckin(id) {
    return () => {
      const isLoggedIn = !!window.__PRELOADED_STATE__.username
      if (!isLoggedIn) {
        location.href = '/auth/twitter?location=' + this.state.searchTerm
        return
      }

      request
        .post('/api/checkin')
        .send({ business: id })
        .then(({ body }) => {
          if (!body) {
            return console.error('missing body')
          }
          console.log(body)
          const newBusinesses = this.state.searchResults.map((old) => {
            if (old.id === body.business) {
              return body
            }
            return old
          })

          this.setState({
            searchResults: newBusinesses,
          })
        })
        .catch(handleError)
    }
  }
  componentDidMount() {
    this.searchbox.focus()
    if (typeof window !== 'undefined' && window.__PRELOADED_STATE__) {
      const preloadedState = window.__PRELOADED_STATE__
      this.setState({
        searchTerm: preloadedState.searchTerm,
        searchResults: preloadedState.businesses,
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
        {
          children
        }
        <SearchResultsContainer
          searchResults={this.state.searchResults}
          searchTerm={this.state.searchTerm}
          onCheckin={this.onCheckin}
        />
      </Search>
    )
  }
}

export default SearchContainer
