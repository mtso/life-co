import express from 'express'
import request from 'superagent'
import { attachToken, searchBusinesses } from '../controllers/yelp'

const api = express.Router()

api.get('/test', (req, res) => {
  res.json({
    message: 'Hello~ from /test api route.',
  })
})

api.get('/time', (req, res, next) => {
  const now = new Date
  res.json({ now })
})

api.get('/search', attachToken, searchBusinesses)

export default api
