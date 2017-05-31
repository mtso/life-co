
export const searchAction = (term) => {
  return {
    type: 'SEARCH',
    term,
  }
}

export const checkinAction = (businessId) => {
  return {
    type: 'CHECKIN',
    businessId,
  }
}
