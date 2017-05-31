import React from 'react'
import Link from './Link'

export default ({ image_url, name, url, rating }) => (
  <Link to={url}>
    <div className='search-result-cell'>
      <img src={image_url} style={{height: '80px'}} />
      <h2>{name}</h2>
      <p>{rating} stars</p>
    </div>
  </Link>
)
