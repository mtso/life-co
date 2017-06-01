import React from 'react'
import SearchBox from './SearchBox'

const Search = ({
  isLoading, 
  searchResults, 
  searchboxRef, 
  searchTerm, 
  onChange, 
  onSubmit, 
  children
}) => (
  <div>
    <div className='nav'>
      <div className='nav-left'>
        <h1 className='logotype nav-item'>Life Co.</h1>
        <SearchBox
          { ...{
            onSubmit,
            onChange,
            searchTerm,
            searchboxRef,
          }}
        />
      </div>
    </div>
    <div className='search-results section'>
      <p className='search-results-info'>Search Results {
        isLoading && '(Loading...)' ||
        searchResults && `(${searchResults.length})`
      }</p>
      {
        children
      }
    </div>
  </div>
)

export default Search
