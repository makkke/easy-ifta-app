import mongoose from 'mongoose'

const Schema = mongoose.Schema
const reportSchema = new Schema({
  period: {
    quarter: { type: Number, required: true },
    year: { type: Number, required: true },
  },
  user: {
    firstName: { type: String, default: '' },
    lastName: { type: String, default: '' },
    title: { type: String, default: '' },
    phoneNumber: { type: String, default: '' },
  },
  company: {
    name: { type: String, default: '' },
    country: { type: String, default: '' },
    address: { type: String, default: '' },
    city: { type: String, default: '' },
    province: { type: String, default: '' },
    postalCode: { type: String, default: '' },
    identificationNumber: { type: String, default: '' },
    referenceNumber: { type: String, default: '' },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

reportSchema.pre('save', function save(next) {
  const currentDate = new Date()
  this.updatedAt = currentDate
  if (!this.createdAt) this.createdAt = currentDate

  next()
})

reportSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
  },
})

export default mongoose.model('Report', reportSchema)
