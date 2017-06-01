import { rootReducer as reducer } from '../reducers'

class Store {
  constructor(reducer, initialState = {}) {
    this.state = reducer(initialState, {})
  }

  getState() {
    return Object.assign({}, this.state)
  }

  setState(newState) {
    this.state = Object.assign({}, this.state, newState)
  }

  dispatch(action, callback) {
    this.setState(reducer(this.state, action))
    callback && callback(this.getState())
  }
}

const store = new Store(reducer, (typeof window === 'undefined')
  ? {}
  : window.__PRELOADED_STATE__)

export default store
