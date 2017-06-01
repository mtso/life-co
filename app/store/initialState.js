import forOwn from 'lodash'

class InitialState {
  _state = {}
  callbacks = {}
  constructor(initialState) {
    this._state = initialState
  }
  get state() {
    return Object.assign({}, this._state)
  }
  set state(value) {
    console.log(value)
    this._state = Object.assign({}, value)
  }
  subscribe({ id, cb }) {
    callbacks[id] = cb
  }
  dispatch() {
    forOwn(callbacks, (cb, id) => {
      cb(this.state)
    })
  }
}

export default InitialState
