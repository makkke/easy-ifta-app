import crypto from 'crypto'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'

import config from '../config'

const Schema = mongoose.Schema

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  hash: String,
  salt: String,

  connections: [{
    app: String,
    apiKey: String,
  }],
})

UserSchema.methods.setPassword = function setPassword(password) {
  this.salt = crypto.randomBytes(16).toString('hex')
  this.hash = crypto.pbkdf2Sync(password, this.salt, 100000, 512, 'sha512').toString('hex')
}

UserSchema.methods.checkPassword = function checkPassword(password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 100000, 512, 'sha512').toString('hex')
  return this.hash === hash
}

UserSchema.methods.generateJwt = function generateJwt() {
  const expiry = new Date()
  expiry.setDate(expiry.getDate() + 7)

  return jwt.sign({
    id: this._id,
    name: this.name,
    email: this.email,
    exp: parseInt(expiry.getTime() / 1000, 10),
  }, config.jwt.secret)
}

UserSchema.set('toJSON', {
  transform: (doc, ret) => {
    /* eslint-disable no-param-reassign,no-underscore-dangle */
    ret.id = ret._id
    delete ret._id
    delete ret.__v
    delete ret.hash
    delete ret.salt
  },
})

export default mongoose.model('User', UserSchema)
