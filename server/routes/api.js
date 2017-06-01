import express from 'express'
import request from 'superagent'
import { attachToken, attachBusinesses, returnBusinesses } from '../controllers/yelp'
import { attachCheckins, validateParams, isNotCheckedIn, isCheckedIn, postCheckIn, cancelCheckIn } from '../controllers/checkin'
import { isAuthenticated } from '../controllers/auth'
import { cacheSearch } from '../controllers/cache'

const api = express.Router()

api.get('/search', cacheSearch, attachToken, attachBusinesses, attachCheckins, returnBusinesses)

api.route('/checkin')
  .post(isAuthenticated, validateParams, isNotCheckedIn, postCheckIn)
  .delete(isAuthenticated, validateParams, isCheckedIn, cancelCheckIn)

export default api
