import request from 'superagent'
import { Token } from '../models'
import { getEndpoint } from '../utils/yelpApi'
import yelpApi from '../yelpApi.json'

export const attachToken = (req, res, next) =>
  Token
    .getUpdatedToken(Date.now()) // + 600000000000)
    .then((token) => {
      req.token = token
      next()
    })
    .catch((err) => next(err))

export const searchBusinesses = (req, res, next) => 
  request
    .get(yelpApi.endpoint + yelpApi.path.search)
    .set('Authorization', req.token.typedValue)
    .query({ location: req.query.location })
    .end((err, resp) => {
      if (err || resp.body.error) {
        return next(err || resp.body.error)
      }
      res.json(resp.body)
    })
