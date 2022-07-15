import dbConnect from '../../db/dbConnect'
dbConnect()
import Feedback from '../../db/Feedback'

export default async function handler(req, res) {
  const data = req.body
  const { method } = req
  switch (method) {
    case 'GET':
      try {
        const feedbacks = await Feedback.find({})
        res.status(200).json(feedbacks)
      } catch (error) {
        res.status(400).json({
          success: false,
          message: 'Ow snap! Something gone wrong.',
          error,
        })
      }
      break
    case 'POST':
      try {
        var resp = await Feedback.findOneAndUpdate(
          {
            User_ID: data.User_ID,
          },
          data,
          {
            new: true,
            upsert: true,
          },
        )

        res.status(200).json({
          success: true,
          resp,
        })
      } catch (error) {
        res.status(400).json({
          success: false,
        })
        console.log(error)
      }
      break
    default:
      res.status(400).json({
        success: false,
        error: true,
      })
      break
  }
}
