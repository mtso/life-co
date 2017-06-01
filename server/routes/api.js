import express from 'express'
import request from 'superagent'
import { attachToken, searchBusinesses } from '../controllers/yelp'
import { validateParams, isNotCheckedIn, isCheckedIn, postCheckIn, cancelCheckIn } from '../controllers/checkin'
import { isAuthenticated } from '../controllers/auth'
import { cacheSearch } from '../controllers/auth'

const api = express.Router()

api.get('/search', cacheSearch, attachToken, searchBusinesses)

api.route('/checkin')
  .post(isAuthenticated, validateParams, isNotCheckedIn, postCheckIn)
  .delete(isAuthenticated, validateParams, isCheckedIn, cancelCheckIn)

export default api
