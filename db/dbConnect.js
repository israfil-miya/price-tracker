import mongoose from 'mongoose'

const dbConnect = () => {
  try {
    if (mongoose.connections[0].readyState) {
      // console.log('Already connected.')
      return
    }

    mongoose.set('strictQuery', false)
    mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 10,
    })
    console.log('Connected to Mongo Successfully!')
  } catch (error) {
    console.log(error)
  }
}

export default dbConnect
