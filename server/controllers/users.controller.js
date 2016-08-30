import httpStatus from 'http-status'
import User from '../models/user.model'

export function me(req, res) {
  if (!req.user.id) {
    res.status(httpStatus.Unauthorized).json({
      message: 'UnauthorizedError: private profile',
    })
    return
  }

  User.findById(req.user.id).exec((err, user) => {
    res.status(200).json(user)
  })
}

export function update(req, res, next) {
  User.findById(req.user.id).exec((err, user) => {
    if (err) {
      next(err)
      return
    }

    user.connections = req.body.connections // eslint-disable-line

    user.save((err1, savedUser) => {
      if (err1) {
        next(err1)
        return
      }

      res.json(savedUser)
    })
  })
}

export default { me, update }
