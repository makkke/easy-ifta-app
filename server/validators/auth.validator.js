import Joi from 'joi'

export default {
  signup: {
    body: {
      name: Joi.string().required(),
      company: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  },

  login: {
    body: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  },
}
