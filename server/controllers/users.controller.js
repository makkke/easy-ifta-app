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

export default { me }
