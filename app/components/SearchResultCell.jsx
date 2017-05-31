import React from 'react'
import Link from './Link'

export default ({ image_url, name, url, rating, onCheckin }) => (
  <div className='search-result-cell'>
    <Link to={url}>
      <img src={image_url} style={{height: '80px', display: 'inline-block'}} />
    </Link>
    <div style={{display: 'inline-block', marginLeft: '10px'}}>
      <Link to={url}>
        <h2>{name}</h2>
      </Link>
      <p>{rating} stars <button onClick={onCheckin}>Going
        </button>
      </p>
    </div>
  </div>
)
