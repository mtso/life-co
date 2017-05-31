import React from 'react'
import Link from './Link'

export default ({ image_url, name, url, rating }) => (
  <Link to={url}>
    <div className='search-result-cell'>
      <img src={image_url} style={{height: '80px', display: 'inline-block'}} />
      <div style={{display: 'inline-block', marginLeft: '10px'}}>
        <h2>{name}</h2>
        <p>{rating} stars <button onClick={() => _}>Going
          </button>
        </p>
      </div>
    </div>
  </Link>
)
