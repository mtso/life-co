import express from 'express'

const api = express.Router()

api.get('/test', (req, res) => {
  res.json({
    message: 'Hello~ from /test api route.',
  })
})

export default api
