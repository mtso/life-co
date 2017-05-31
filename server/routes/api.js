import express from 'express'
import { attachToken } from '../controllers/yelp'

const api = express.Router()

api.get('/test', (req, res) => {
  res.json({
    message: 'Hello~ from /test api route.',
  })
})

api.get('/time', (req, res, next) => {
  sequelize
    .query('SELECT NOW() as right_now')
    .then((rows) => {
      const now = rows[0][0].right_now
      res.json({ now })
    })
    .catch((err) => next(err))
})

api.search('/search', attachToken, (req, res, next) => {
  request
    .get('https://api.yelp.com/v3/businesses/search')
    .set('Authorization', req.token.typedValue)
    .query({ location: req.params.location })
    .end((err, resp) => {
      if (err || resp.body.error) {
        return next(err || resp.body.error)
      }
      res.json(res.body)
    })
})

export default api
