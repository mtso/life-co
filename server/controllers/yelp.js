import request from 'superagent'
import { Token } from '../models'

export const attachToken = (req, res, next) => {
  Token
    .getUpdatedToken(Date.now())
    .then((token) => {
      req.token = token
      next()
    })
    .catch((err) => next(err))
}
