class InitialState {
  get state() {
    return Object.assign({}, this._state)
  }
  set state(value) {
    console.log(value)
    this._state = Object.assign({}, value)
  }
}

export default InitialState
