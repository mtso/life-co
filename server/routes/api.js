import express from 'express'
import request from 'superagent'
import { attachToken, searchBusinesses } from '../controllers/yelp'
import { validateParams, isNotCheckedIn, isCheckedIn, postCheckIn, cancelCheckin } from '../controllers/checkin'
import { isAuthenticated } from '../controllers/auth'
import { cacheSearch } from '../controllers/auth'

const api = express.Router()

api.get('/search', cacheSearch, attachToken, searchBusinesses)

api.route('/checkin')
  .use(isAuthenticated)
  .post(validateParams, isNotCheckedIn, postCheckIn)
  .delete(validateParams, isCheckedIn, cancelCheckIn)

export default api
