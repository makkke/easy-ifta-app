import mongoose from 'mongoose'

const Schema = mongoose.Schema

const ReportSchema = new Schema({
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
  distances: [{
    region: { type: String, required: true },
    amount: { type: Number, required: true },
  }],
  fuelPurchases: [{
    region: { type: String, required: true },
    volume: { type: Number, required: true },
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

ReportSchema.pre('save', function save(next) {
  const currentDate = new Date()
  this.updatedAt = currentDate
  this.createdAt = this.createdAt || currentDate

  next()
})

ReportSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
  },
})

export default mongoose.model('Report', ReportSchema)
