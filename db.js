import mongoose from 'mongoose';
import * as dotenv from 'dotenv'
dotenv.config()

mongoose.connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    dbName: process.env.DB_NAME
  }).then(() => {console.log("Database connection successful!")}).catch(err => console.log(err));


const ItemSchema = new mongoose.Schema({
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

const UserSchema = new mongoose.Schema({
  name: String,
  email: String
})

const Item = new mongoose.model("Item", ItemSchema)
const User = new mongoose.model("User", UserSchema)

export default { Item, User }