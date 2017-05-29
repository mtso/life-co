import express from 'express'

const root = express.Router()

root.get('/*', (req, res) => {
  res.send('Hello~ from root /')
})

export default root
