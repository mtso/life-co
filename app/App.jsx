import React from 'react'
import SearchContainer from './containers/SearchContainer'
import InitialState from './store/initialState'

const App = ({ username, location, businesses }) => {
  return (
    <SearchContainer location={location}>
      <SearchResultsContainer businesses={businesses} username={username}/>
    </SearchContainer>
  )
}

export default App
