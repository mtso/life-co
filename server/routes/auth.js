import { Router } from 'express'
import passport from 'passport'

const auth = Router()

auth.get('/twitter', passport.authenticate('twitter'))

auth.get('/twitter/callback', 
  passport.authenticate('twitter', {failureRedirect: '/'}),
  (req, res) => res.redirect('/')
)

export default auth
