import React, { Component } from 'react'
import SearchResultCell from '../components/SearchResultCell'
import request from 'superagent'
import handleError from '../utils/handleError'

class SearchResultsContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      businesses: this.props.businesses,
    }
    this.handleCheckin = this.handleCheckin.bind(this)
    this.updateBusinesses = this.updateBusinesses.bind(this)
  }
  updateBusinesses(resp) {
    const updated = resp.body
    const newBusinesses = this.state.businesses.map((business) => {
      if (business.id === updated.id) {
        return updated
      }
      return business
    })
    this.setState({
      businesses: newBusinesses,
    })
  }
  handleCheckin(id) {
    return (_) => {
      const isLoggedIn = !!this.props.username
      if (!isLoggedIn) {
        location.href = '/auth/twitter?location=' + this.props.searchTerm
        return
      }
      // we want to get the new business object,
      // not the checkin object
      // if is not checked in
      const selected = this.state.businesses.filter((b) => b.id === id)[0]
      const action = (selected && selected.isCheckedIn)
        ? unCheckin
        : checkin

      action(id)
        .then(this.updateBusinesses)

      // request
      //   .post('/api/checkin')
      //   .send({ business: id })
      //   .then((resp) => {
          
      //     // what we get (checkin obj)
      //     // {
      //     //   business: 'business-name-id',
      //     //   username: 'username',
      //     //   id: num,
      //     //   createdAt,
      //     //   updatedAt,
      //     // }
      //     // what we want (business obj)
      //     // {
      //     //   id: 'business=name-id',
      //     //   ...business props,
      //     //   checkins: num,
      //     //   isCheckedIn: true,
      //     // }
          
      //     const checkin = resp.body
      //     const newBusinesses = this.state.businesses.map((business) => {
      //       // if (b.id === business.id) {}
      //       if (business.id === checkin.business) {
      //         const newBusiness = Object.assign({}, business, {
      //           isCheckedIn: true,
      //           checkins: business.checkins + 1,
      //         })
      //       }
      //     })
      //   })
      //   .catch(handleError)
    }
  }
  render() {
    return (
      <div>
      {this.props.searchResults.map((r) => (
        <SearchResultCell 
          {...r} 
          key={r.id}
          onCheckin={this.props.onCheckin(r.id)}
        />
      ))}
      </div>
    )
  }
}

export default SearchResultsContainer
