
const userReducer = (state = {username: null}, action) => {
  switch(action.type) {
    case SET_USER:
      return Object.assign({}, state, {
        username: action.username,
      })
    case LOG_OUT:
    default:
      return state
  }
}
