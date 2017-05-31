import React from 'react'

const Search = ({ isLoading, searchResults, searchbox, searchTerm, onChange, onSubmit, children }) => (
  <div>
    <h1>Life Co.</h1>
    <form onSubmit={onSubmit}>
      <input
        type='search'
        placeholder='Location'
        value={searchTerm}
        onChange={onChange}
        ref={(node) => searchbox = node}
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
