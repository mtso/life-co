import React from 'react'
import SearchContainer from './containers/SearchContainer'
import initialState from './store/initialState'

const App = ({ state }) => {
  initialState.state = state
  return (
    <SearchContainer />
  )
}

export default App
