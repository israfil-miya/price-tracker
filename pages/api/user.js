import dbConnect from '../../db/dbConnect'
dbConnect()
import User from '../../db/User'

export default async (req, res) => {
  const data = req.body
  try {
    var resp = await User.findByIdAndUpdate(data.User_ID, data)

    res.status(201).json({
      success: true,
      status: 'success',
      message: 'updated',
      resp,
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
