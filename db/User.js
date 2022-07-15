import mongoose from 'mongoose'
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  currency: {
    type: String,
    default: 'USD',
  },
  monitor_email: {
    type: String,
  },
})

module.exports = mongoose.models.User || mongoose.model('User', UserSchema)
