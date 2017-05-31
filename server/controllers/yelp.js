import request from 'superagent'
import models from '../models'

export const attachToken = (req, res, next) => {
  models.Token
    .getUpdatedToken(Date.now())
    .then((token) => {
      req.token = token
      next()
    })
    .catch((err) => next(err))
}
