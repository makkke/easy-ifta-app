import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'

import User from './models/user.model'

passport.use(new LocalStrategy(
  { usernameField: 'email' },
  (username, password, done) => {
    User.findOne({ email: username }, (err, user) => {
      if (err) { return done(err) }

      if (!user) {
        return done(null, false, { message: 'User not found' })
      }

      if (!user.checkPassword(password)) {
        return done(null, false, { message: 'Password is incorrect' })
      }

      return done(null, user)
    })
  }
))
