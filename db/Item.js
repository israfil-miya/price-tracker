// models/User.js

import mongoose from 'mongoose'
const ItemSchema = new mongoose.Schema({
  item_name: {
    type: String,
    
},
  price_wanted: {
    type: Number,
    
},
  curr_price: {
    type: Number,
    default: 0
},
  website: {
    type: String,
    
},
  item_uri: {
    type: String,
    
},
  User_ID: {
    type: String,
    
  },
  added_time: {
    type : Date,
    default: Date.now
  }
})

module.exports = mongoose.models.Item || mongoose.model('Item', ItemSchema)