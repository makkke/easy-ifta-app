import mongoose, { Schema } from 'mongoose'

const TaxReturnSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },

  period: {
    quarter: { type: Number, required: true },
    year: { type: Number, required: true },
  },
  // user: {
  //   firstName: { type: String, default: '' },
  //   lastName: { type: String, default: '' },
  //   title: { type: String, default: '' },
  //   phoneNumber: { type: String, default: '' },
  // },
  // company: {
  //   name: { type: String, default: '' },
  //   country: { type: String, default: '' },
  //   address: { type: String, default: '' },
  //   city: { type: String, default: '' },
  //   province: { type: String, default: '' },
  //   postalCode: { type: String, default: '' },
  //   identificationNumber: { type: String, default: '' },
  //   referenceNumber: { type: String, default: '' },
  // },
  distances: [{
    region: { type: String, required: true },
    amount: { type: Number, required: true },
  }],
  fuelPurchases: [{
    region: { type: String, required: true },
    volume: { type: Number, required: true },
  }],
})

TaxReturnSchema.set('toJSON', {
  transform: (doc, ret) => {
    /* eslint-disable no-param-reassign,no-underscore-dangle */
    ret.id = ret._id
    delete ret._id
    delete ret.__v
    delete ret.user
  },
})

export default mongoose.model('TaxReturn', TaxReturnSchema)
