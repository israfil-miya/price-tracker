import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const connectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  dbName: process.env.DB_NAME,
  poolSize: 10,
}

let connection

const connectToDatabase = async () => {
  try {
    connection = await mongoose.createConnection(
      process.env.MONGO_URI,
      connectionOptions,
    )

    connection.on('connected', () => {
      console.log('DATABASE CONNECTION SUCCESSFUL !!!\n')
    })

    connection.on('error', (err) => {
      console.error('DATABASE CONNECTION ERROR:', err)
    })

    const itemSchema = new mongoose.Schema({
      item_name: String,
      price_wanted: Number,
      curr_price: Number,
      website: String,
      item_uri: String,
      User_ID: String,
      added_time: {
        type: Date,
        default: Date.now,
      },
    })

    const userSchema = new mongoose.Schema({
      name: String,
      email: String,
      currency: String,
      monitor_email: String,
    })

    const Item = connection.model('Item', itemSchema)
    const User = connection.model('User', userSchema)

    return {
      Item,
      User,
    }
  } catch (error) {
    console.error('DATABASE CONNECTION ERROR:', error)
    throw new Error('Failed to connect to the database.')
  }
}

export default connectToDatabase
