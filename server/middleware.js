import path from 'path'
import bodyParser from 'body-parser'
import session from 'express-session'
import express from 'express'
import logger from 'morgan'

const middleware = [
  logger(),
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  }),
  bodyParser.json(),
  bodyParser.urlencoded({extended: true}),
  express.static(path.resolve(__dirname, '..', 'dist')),
]

export default middleware
