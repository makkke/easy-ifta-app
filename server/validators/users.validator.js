import Joi from 'joi'

export default {
  update: {
    body: {
      connections: Joi.array().items(Joi.object({
        app: Joi.string().required(),
        apiKey: Joi.string().required(),
      })),
    },
  },
}
