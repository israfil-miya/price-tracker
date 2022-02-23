// models/User.js

import mongoose from 'mongoose'
const FeedbackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
},
  User_ID: {
    type: String,
    required: true,
    unique: true
  },
  message: {
    type: String,
    required: true
  },
  image: {
    type: String,
  },
  added_time: {
    type : Date,
    default: Date.now
  }
})

module.exports = mongoose.models.Feedback || mongoose.model('Feedback', FeedbackSchema)