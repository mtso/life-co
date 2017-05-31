import React, { Component } from 'react'
import SearchResultCell from '../components/SearchResultCell'
import request from 'superagent'

class SearchResultsContainer extends Component {
  constructor(props) {
    super(props)
    this.handleCheckin = this.handleCheckin.bind(this)
  }
  handleCheckin(id) {
    return (e) => {
      e.preventDefault()
      const isLoggedIn = false
      if (!isLoggedIn) {
        // need to save search result somehow!
        location.href = '/auth/twitter'
        return
      }
      // request
      //   .post('/api/checkin')
      //   .send({ business: id })
      //   .then(_)
    }
  }
  render() {
    return (
      <div>
      {this.props.searchResults.map(
        (r) => <SearchResultCell 
                 {...r} 
                 key={r.id}
                 onCheckin={this.handleCheckin(r.id)}
               />
      )}
      </div>
    )
  }
}

export default SearchResultsContainer
