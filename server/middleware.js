import bodyParser from 'body-parser'
import session from 'express-session'

const middleware = [
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  }),
  bodyParser.json(),
  bodyParser.urlencoded({extended: true}),
]

export default middleware
