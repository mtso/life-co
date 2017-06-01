import { rootReducer as reducer } from '../reducers'

const createStore = (initialState) => {

  return {
    
  }
}
class Store {
  constructor(reducer, initialState = {}) {
    this.state = reducer(initialState, {})
    this.callbacks = []
  }

  getState() {
    return Object.assign({}, this.state)
  }

  setState(newState) {
    this.state = Object.assign({}, this.state, newState)
  }

  dispatch(action) {
    this.setState(reducer(this.state, action))
    this.callbacks.forEach((cb) => cb(this.getState()))
  }

  addListener(cb) {
    this.callbacks.push(cb)
  }
}

const store = new Store(reducer, (typeof window === 'undefined')
  ? {}
  : window.__PRELOADED_STATE__)

export default store
