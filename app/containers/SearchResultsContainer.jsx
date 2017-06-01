import React, { Component } from 'react'
import SearchResultCell from '../components/SearchResultCell'
import request from 'superagent'
import store from '../store'
import handleError from '../utils/handleError'

class SearchResultsContainer extends Component {
  constructor(props) {
    super(props)
    this.handleCheckin = this.handleCheckin.bind(this)
  }
  handleCheckin(id) {
    return (e) => {
      e.preventDefault()

      const isLoggedIn = !!store.getState().username
      if (!isLoggedIn) {
        location.href = '/auth/twitter?location=' + this.props.searchTerm
        return
      }

      request
        .post('/api/checkin')
        .send({ business: id })
        .then(({ body }) => {
          if (!body) {
            return console.error('missing body')
          }
          const { success, business } = body
          if (success) {
            store.dispatch({
              type: 'CHECKIN',
              business,
            })
          }
        })
        .catch(handleError)
    }
  }
  render() {
    return (
      <div>
      {this.props.searchResults.map((r) => (
        <SearchResultCell 
          {...r} 
          key={r.id}
          onCheckin={this.handleCheckin(r.id)}
        />
      ))}
      </div>
    )
  }
}

export default SearchResultsContainer
