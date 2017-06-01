import React from 'react'

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
    <h1>Life Co.</h1>
    <form onSubmit={onSubmit}>
      <input
        type='search'
        placeholder={(!!searchTerm) ? '' : 'Location'}
        value={searchTerm}
        onChange={onChange}
        ref={searchboxRef}
      />
      <button type='submit'>
        Search
      </button>
    </form>
    <p>Search Results {
      isLoading && '(Loading...)' ||
      searchResults && `(${searchResults.length})`
    }</p>
    {
      children
    }
  </div>
)

export default Search
