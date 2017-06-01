class InitialState {
  get state() {
    return Object.assign({}, this._state)
  }
  set state(value) {
    this._state = value
  }
}

const initialState = new InitialState()

export default initialState
