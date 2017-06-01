import React from 'react'
import Link from './Link'
import AsyncButton from './AsyncButton'

export default ({ image_url, name, url, rating, onCheckin, isCheckedIn, checkins }) => (
  <div className='search-result-cell'>
    <Link to={url}>
      <img
        src={image_url}
        className='image is-128x128 thumbnail'
      />
      <AsyncButton onClick={onCheckin}>
        {isCheckedIn ? '√ ' : 'x'} Going
      </AsyncButton>
    </Link>
    <div
      className='search-result-content'
    >
      <Link to={url}>
        <h2>{name}</h2>
      </Link>
      <p>{rating} stars. {checkins} checkins. 
      </p>
    </div>
  </div>
)
