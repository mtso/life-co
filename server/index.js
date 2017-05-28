import { default as app } from './config/express'

const port = process.env.PORT || 3750

app.listen(port, () => console.log('Listening on', port))
