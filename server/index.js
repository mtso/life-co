import express from 'express'
import middleware from './middleware'
import { api, root } from './routes'
import models from './models'

const app = express()
const port = process.env.PORT || 3750

app.use(middleware)
app.use('/api', api)
app.use('/*', root)

models.sequelize
  .sync()
  .then(() => app.listen(
    port,
    () => console.log('listening on', port)
  ))
  .catch((err) => console.error(err))
