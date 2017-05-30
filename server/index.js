import express from 'express'
import middleware from './middleware'
import { api, root } from './routes'

import Sequelize from 'sequelize'
import connString from 'rds-connection-string'

const connString = require('rds-connection-string')

const sequelize = new Sequelize(
  connString({scheme: 'postgres'}) || process.env.DATABASE_URL
)

const app = express()

app.use(middleware)
app.use('/api', api)
app.use('/*', root)

app.use('/', (req, res) => {
  res.json({
    message: 'Hello~ from /test api route.',
  })
})

const port = process.env.PORT || 3750

sequelize
  .sync()
  .then(() => {
    app.listen(port, () => console.log('Listening on', port))
  })
  .catch((err) => console.error(err))
