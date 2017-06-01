const businessReducer = (state = [], action) => {
  switch(action.type) {
    case 'CHECKIN':
      return state.map((business) => {
        if (business.id === action.business.id) {
          return Object.assign({}, business, action.business)
        }
        return business
      })
    default:
      return state
  }
}

const initialState = { 
  username: null,
  searchTerm: '', 
  businesses: [],
}

export const rootReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'CHECKIN':
      return Object.assign({}, state, {
        businesses: businessReducer(state.businesses, action)
      })
    default:
      return state
  }
}
