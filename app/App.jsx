import React from 'react'
import SearchContainer from './containers/SearchContainer'
import InitialState from './store/initialState'

const App = ({ state }) => {
  if (typeof window !== 'undefined') {
    window.initialState = new InitialState()
    window.initialState.state = state
  }
  return (
    <SearchContainer />
  )
}

export default App
