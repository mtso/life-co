import React from 'react'
import Link from './Link'
import AsyncButton from './AsyncButton'

export default ({ image_url, name, url, rating, onCheckin, isCheckedIn, checkins }) => (
  <div className='search-result-cell'>
    <Link to={url}>
      <img src={image_url} style={{height: '80px', display: 'inline-block'}} />
    </Link>
    <div style={{display: 'inline-block', marginLeft: '10px'}}>
      <Link to={url}>
        <h2>{name}</h2>
      </Link>
      <p>{rating} stars. {checkins} checkins. <AsyncButton onClick={onCheckin}>
        {isCheckedIn ? '√ ' : 'x'} Going
      </AsyncButton>
      </p>
    </div>
  </div>
)
