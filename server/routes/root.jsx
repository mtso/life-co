import { Router } from 'express'
import { getTerm } from '../utils/searchCache'
import { loadState, renderApp } from '../controllers/app'
import { loadSearchTerm } from '../controllers/cache'
import { attachToken, attachBusinesses } from '../controllers/yelp'

const root = Router()

root.get('/*',
  loadSearchTerm,
  loadState,
  attachToken,
  attachBusinesses,
  renderApp
)

export default root
