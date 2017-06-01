import express from 'express'
import request from 'superagent'
import { attachToken, attachBusinesses, returnBusinesses, attachBusiness, returnBusiness } from '../controllers/yelp'
import { attachCheckins, validateParams, isNotCheckedIn, isCheckedIn, postCheckIn, cancelCheckIn } from '../controllers/checkin'
import { isAuthenticated } from '../controllers/auth'
import { cacheSearch } from '../controllers/cache'

const api = express.Router()

api.get('/search', cacheSearch, attachToken, attachBusinesses, attachCheckins, returnBusinesses)

api.route('/checkin')
  .post(isAuthenticated, validateParams, isNotCheckedIn, postCheckIn, attachToken, attachBusiness, attachCheckins, returnBusiness)
  .delete(isAuthenticated, validateParams, isCheckedIn, cancelCheckIn, attachToken, attachBusiness, attachCheckins, returnBusiness)

export default api
