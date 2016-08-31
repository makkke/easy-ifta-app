import Joi from 'joi'

export default {
  create: {
    body: {
      period: Joi.object({
        year: Joi.number().required(),
        quarter: Joi.number().valid([1, 2, 3, 4]).required(),
      }).required(),
    },
  },

  update: {
    body: {
      fuelPurchases: Joi.array().items(Joi.object({
        region: Joi.string().required(),
        volume: Joi.number().required(),
      })),
      distances: Joi.array().items(Joi.object({
        region: Joi.string().required(),
        amount: Joi.number().required(),
      })),
    },
  },
}
