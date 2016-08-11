import httpStatus from 'http-status'
import passport from 'passport'

import User from '../models/user.model'

export function signup(req, res) {
  const user = new User({
    name: req.body.name,
    company: req.body.company,
    email: req.body.email,
  })

  user.setPassword(req.body.password)

  user.save().then(
    () => {
      const token = user.generateJwt()
      res.json({ token })
    },
    (err) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err)
  )
}

export function login(req, res) {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      res.status(httpStatus.NOT_FOUND).json(err)
      return
    }

    if (!user) {
      res.status(httpStatus.UNAUTHORIZED).json(info)
      return
    }

    const token = user.generateJwt()
    res.status(httpStatus.OK).json({
      token,
    })
  })(req, res)
}

export default { signup, login }
