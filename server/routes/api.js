import express from 'express'
import { sequelize } from '../models/index'

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

export default api
