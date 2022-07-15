import mongoose from 'mongoose'
const FaqSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  User_ID: {
    type: String,
    required: true,
    unique: true,
  },
  question: {
    type: String,
    required: true,
  },
  added_time: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.models.Faq || mongoose.model('Faq', FaqSchema)
