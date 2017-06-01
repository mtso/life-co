import { getTerm, setTerm } from '../utils/searchCache'

export const isAuthenticated = (req, res, next) => {
  if (!req.user) {
    return res.json({
      error: 'not authenticated',
    })
  }
  next()
}

export const cacheSearch = (req, res, next) => {
  if (req.query.search) {
    setTerm(req.sessionID, req.query.search)
  }
  next()
}
