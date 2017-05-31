import express from 'express'
import { attachToken } from '../controllers/yelp'

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

api.get('/search', attachToken, (req, res, next) => {
  console.log(req.token.typedValue)
  request
    .get('https://api.yelp.com/v3/businesses/search')
    .set('Authorization', req.token.typedValue)
    .query({ location: req.query.location })
    .end((err, resp) => {
      if (err || resp.body.error) {
        return next(err || resp.body.error)
      }
      res.json(resp.body)
    })
})

export default api
