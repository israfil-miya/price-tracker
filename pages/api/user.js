import dbConnect from '../../db/dbConnect'
dbConnect()
import User from '../../db/User'

export default async (req, res) => {
  const data = req.body
  try {
    var resp = await User.findById(data.User_ID)
    resp.monitor_email = data.monitor_email
    resp.currency = data.currency
    var newData = await resp.save()

    res.status(201).json({
      success: true,
      status: 'success',
      message: 'updated', 
      newData,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      status: 'error',
      message: 'serverError',
    })
    console.log(error)
  }

}